export type Benefit = {
  id: number;
  benefitType: number;
};

export type Rider = {
  id: number;
  name: string;
  birth: string;
  loginId: string;
  password: string;
  phone: string;
  address: string;
  detailAddress: string;
  zipcode: string;
  email: string;
  significant: string;
  approval: boolean;
  benefit: Benefit;
  status: string;
};

export type RiderInfoList = Rider[];
