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
  industryId: number;
  status: string;
  manager: string;
};

export type ReservationList = Reservation[];
