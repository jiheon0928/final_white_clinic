import { Rider } from "../RiderStore/RiderTypes";

export type Status = {
  id: number;
  status: "대기" | "진행" | "완료";
};

export type Industry = {
  id: number;
  industry: "세탁기" | "에어컨" | "건조기";
};

export type Reservation = {
  id: number;
  reservationName: string;
  customerName: string;
  customerPhone: string;
  customerRequest: string;
  zipcode: string;
  address: string;
  detailAddress: string;
  visitTime: string;
  memo: string;
  price: number;
  industry: Industry;
  rider: Rider | null;
  status: Status;
  manager: string;
};

export type ReservationList = Reservation[];
