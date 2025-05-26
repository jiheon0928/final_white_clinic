export type Reservation = {
  id: number;
  item: string;
  customer: string;
  visitTime: string;
  date: string;
  phone: string;
  address: string;
  price: string;
  request: string;
  memo: string;
  status: string;
};

export type ReservationList = Reservation[];
