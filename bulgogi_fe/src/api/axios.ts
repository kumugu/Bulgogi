import axios from "axios";
import { LoginResponse } from "@/types/api";
import { tokenUtils } from "@/utils/tokenUtils";

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


// API 인터셉터 - 토큰 갱신 관리
let isRefreshing = false;
let failedQueue: { resolve: Function; reject: Function }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};


const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const response = await api.post<LoginResponse>("/users/refresh-token", {});
    const { accessToken } = response.data;

    if (!accessToken) {
      throw new Error("토큰 갱신 실패");
    }

    tokenUtils.setToken(accessToken);
    processQueue(null, accessToken);

    return accessToken;
  } catch (error) {
    processQueue(error, null);
    tokenUtils.removeToken();
    window.dispatchEvent(new CustomEvent("auth:tokenExpired")); 
    return null;
  } finally {
    isRefreshing = false;
  }
};


// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 처리(토큰 만료)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        console.log("토큰 갱신 중, 대기열에 추가");
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
        .then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const newToken = await refreshAccessToken();
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
export { refreshAccessToken };
