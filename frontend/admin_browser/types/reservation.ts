export interface ReservationFormData {
  name: string;
  phone: string;
  address: string;
  item: string;
  date: string;
  price: number;
  manager?: string;
}

export interface Rider {
  id: number;
  name: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface ReservationResponse {
  id: number;
  name: string;
  phone: string;
  address: string;
  item: string;
  date: string;
  price: number;
  manager?: string;
  createdAt: string;
  updatedAt: string;
}
