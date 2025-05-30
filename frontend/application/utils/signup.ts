import { SignupState } from "@/types/stores/zustandStore.types";
import api from "./api";

export const signup = async (data: SignupState["user"]) => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};
