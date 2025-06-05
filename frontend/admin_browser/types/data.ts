export type Status = {
  id: number;
  status: "대기" | "진행" | "완료";
};

export type Industry = {
  id: number;
  industry: "세탁기" | "에어컨" | "건조기";
};

export type reservationType = {
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

export type RiderData = {
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
  industry?: Industry[]; // 백엔드에서 내려오지 않는 경우 optional 처리
};

export type benefitType = {
  id: number;
  benefitType: number; // 예: 0.4
};
