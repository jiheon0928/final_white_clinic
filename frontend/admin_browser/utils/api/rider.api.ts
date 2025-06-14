import api from "./api";
import { RiderData } from "@/types/RiderStore/RiderTypes";

export const getRiders = async (): Promise<RiderData[]> => {
  try {
    const response = await api.get("/user");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching riders:", error);
    throw error;
  }
};

export const getRiderById = async (id: number): Promise<RiderData> => {
  try {
    const response = await api.get(`/user/id/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching riders:", error);
    throw error;
  }
};

export const getRiderByApproval = async (
  approval: boolean
): Promise<RiderData[]> => {
  try {
    const response = await api.get(`/user/approval?approval=${approval}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching riders:", error);
    throw error;
  }
};

export const approveRider = async (id: number): Promise<RiderData> => {
  try {
    const response = await api.patch(`/user/approval/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error approving rider:", error);
    throw error;
  }
};

export const updateRider = async (
  id: number,
  data: RiderData
) => {
  try {
    const response = await api.patch(`/user/correction/${id}`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating rider:", error);
    throw error;
  }
};
