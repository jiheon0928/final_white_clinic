import { AxiosResponse } from "axios";

import { showError } from "@/utils/toast";
import api from ".";

// 로그인
export const login = async (
  loginId: string,
  password: string
): Promise<AxiosResponse<{ data: string }>> => {
  try {
    const response = await api.post("/api/auth/login", { loginId, password });
    return response;
  } catch (err) {
    showError("로그인 실패");
    throw err;
  }
};
