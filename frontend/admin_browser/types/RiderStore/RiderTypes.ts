export type Rider = {
  id: number;
  name: string;
  birth: string; // string (ISO date string) 형식 유지
  loginId: string;
  password: string;
  phone: string;
  address: string;
  detailAddress: string;
  zipcode: string;
  email: string;
  significant: string;
  approval: boolean;
  benefit: benefitType;
  industry?: number[]; // 백엔드에서 내려오지 않는 경우 optional 처리
};

export type benefitType = {
  id: number;
  benefitType: number; // 예: 0.4
};

export type RiderInfoList = Rider[];
