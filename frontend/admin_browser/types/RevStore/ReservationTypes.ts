export type Reservation = {
  id: number;
  item: string;
  name: string;
  time: string;
  date: string;
  phone: string;
  address: string;
  price: string;
  manager: string;
  completed: boolean;
  status: string;
};

export type ReservationList = Reservation[];
