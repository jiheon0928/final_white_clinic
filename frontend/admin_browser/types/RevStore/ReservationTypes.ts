export type Reservation = {
  id: number;
  item: string;
  customer: string;
  visitTime: string;
  date: string;
  phone: string;
  address: string;
  detailAddress: string;
  zipcode: string;
  price: string;
  request: string;
  memo: string;
  status: string;
  manager: string;
  industryId?: number;
};

export type ReservationList = Reservation[];
