import axios from "axios";
import { useAuthStore } from "@/store/user/authStore";
import { getIsRefreshing, setIsRefreshing, processQueue, addToQueue } from "./queue";
import { resolve } from "path";
import { rejects } from "assert";
import { useAuth } from "@/features/user/auth/useAuth";

/**
 * 기본 Axios 인스턴스 설정
 * 
 * axios.create(): 기본 API 설정
 * baseURL 지정" API 요청 시 모든 요청을 http://localhost:8080/api를 기준으로 보냄
 * withCredentials: true → 쿠키 기반 인증을 지원하기 위해 설정
 */
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});


/**
 * 요청 인터셉터
 * 
 * 모든 API 요청을 보내기 전에 실행됨
 * useAuthStore.getState().auth.accessToken에서 저장된 토큰을 가져와 요청 헤더에 추가
 * Bearer ${token} 형식으로 Authorization 헤더를 설정하여 인증 요청을 보냄
 * 만약 토큰이 없으면 인증 헤더 없이 요청
 */
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().auth.accessToken;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


/**
 * Refresh Token 함수를 저장하는 변수
 * 
 * refreshTokenFunction은 토큰 갱신을 위한 함수를 저장하는 변수
 * null로 초기화 → 이후 setRefreshTokenFunction을 통해 할당됨
 */
let refreshTokenFunction: (() => Promise<string | null>) | null = null;

/**
 * Refresh Token 함수 주입
 * 
 * 외부에서 setRefreshTokenFunction()을 호출하면 refreshTokenFunction에 토큰 갱신 함수를 주입할 수 있음
 * refreshTokenFunction()은 실행 시 새로운 액세스 토큰을 반환하는 함수
 */ 
export const setRefreshTokenFunction = (fn: () => Promise<string | null>) => {
  refreshTokenFunction = fn;
};


/**
 * 응답 인터셉터
 * 
 * API 응답을 받을 때 실행됨
 * 에러가 발생했을 때 추가 처리를 할 수 있도록 구현됨
 */ 
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    /**
     * 401 Unauthorized 처리 (토큰 만료 시)
     * 
     * 401(Unauthorized) 에러 발생 시, 토큰이 만료되었을 가능성이 있음
     * _retry 플래그를 추가하여 무한 루프 방지
     */
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 만약 refreshTokenFunction이 설정되지 않았다면, 로그를 남기고 에러를 반환
      if (!refreshTokenFunction) {
        console.error("refreshTokenFunction이 설정되지 않았습니다.");
        return Promise.reject(error);
      }

      /**
       *  토큰 갱신 중인 경우, 대기열에 추가
       * 
       * 이미 토큰을 갱신 중이라면 요청을 큐에 추가
       * 대기 중인 요청들은 새 토큰이 발급되면 실행됨
       */ 
      if (getIsRefreshing()) {
        console.log("토큰 갱신 중, 대기열에 추가");
        return new Promise((resolve, rejects) => {
          addToQueue(resolve, rejects);
        })

        .then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch(err => Promise.reject(err));
      }

      // 직접 토큰 갱신을 시도
      originalRequest._retry = true;
      setIsRefreshing(true);

      /**
       * refreshTokenFunction()을 호출하여 새로운 토큰을 가져옴
       * 새로운 토큰이 있다면 useAuthStore의 setAuth를 사용하여 상태를 업데이트
       * originalRequest.headers.Authorization에 새 토큰을 설정하고 요청을 다시 보냄
       */
      try {
        const newToken = await refreshTokenFunction();
        if (newToken) {
          const currentUsername = useAuthStore.getState().auth.username ?? "";
          useAuthStore.getState().setAuth({ accessToken: newToken, username: currentUsername });
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      // 갱신 실패 처리
      } catch (refreshError) {
        console.error("토큰 갱신 실패", refreshError);
      } finally {
        setIsRefreshing(false);
        processQueue(null);
      }
    }
    return Promise.reject(error);
  }
);

export { api };
