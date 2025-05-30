import api from "./api";

export const getRiders = async () => {
  try {
    const response = await api.get("/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching riders:", error);
    throw error;
  }
};

export const getRiderById = async (id: number) => {
  try {
    const response = await api.get(`/user/id/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching riders:", error);
    throw error;
  }
};

export const getRiderByApproval = async (approval: boolean) => {
  try {
    const response = await api.get(`/user/approval?approval=${approval}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching riders:", error);
    throw error;
  }
};
