import { showError, showSuccess } from "@/utils/toast";
import { AxiosResponse } from "axios";
import api from ".";

type SignupData = {
  name: string;
  age: number;
  loginId: string;
  password: string;
  phone: string;
  address: string;
  email: string;
};

export const signup = async (
  data: SignupData
): Promise<AxiosResponse<{ data: string }>> => {
  try {
    const response = await api.post("/api/auth/register", data);
    showSuccess("회원가입 성공!");
    return response;
  } catch (err) {
    showError("회원가입 실패 입력값을 확인하세요");
    throw err;
  }
};
