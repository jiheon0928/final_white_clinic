import { RiderData } from "../RiderStore/RiderTypes";

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
  visitTime: Date | string; // API 응답에서 string일 수도 있음
  price: number;
  customerName: string;
  address: string;
  detailAddress: string;
  zipcode: string;
  customerPhone: string;
  customerRequest: string;
  memo: string;
  industry: Industry;
  rider: RiderData | null;
  status: Status;
};

export type ReservationList = Reservation[];

export type InputField = {
  title: string;
  name: string;
  placeholder: string;
  value: string;
  type: string;
};
export type InputFields = InputField[];

export type ReservationItem = {
  label: string;
  value: string | number;
  isHighlighted?: boolean;
};

export type ReservationSection = {
  title: string;
  items: ReservationItem[];
};

export type CustomerSection = {
  title: string;
  items: ReservationItem[];
};
