import axios from "axios";
import { tokenUtils } from "@/utils/tokenUtils";
import { LoginResponse } from "../types/apiTypes";
import { getIsRefreshing, setIsRefreshing, processQueue, addToQueue } from "./queue";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});


// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// refreshAccessToken 함수 참조를 위한 임시 변수
let refreshTokenFunction: () => Promise<string | null>;

export const setRefreshTokenFunction = (fn: () => Promise<string | null>) => {
  refreshTokenFunction = fn;
};


// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 처리(토큰 만료)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (getIsRefreshing()) {
        console.log("토큰 갱신 중, 대기열에 추가");
        return new Promise((resolve, reject) => {
          addToQueue(resolve, reject);
        })
        .then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      setIsRefreshing(true);

      // 주입된 refreshTokenFuction 사용
      const newToken = await refreshTokenFunction();
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export { api };
