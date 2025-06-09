import { Industry } from "../RevStore/ReservationTypes";

// 수수료 타입
export type benefitType = {
  id: number;
  benefitType: number;
};

// 라이더 데이터 타입(Api 응답 타입)
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
export type RiderInfoList = RiderData[];

// 라이더 데이터 타입(Api 요청 타입)
export type RiderInfoData = {
  name: string;
    birth: string;
    phone: string;
    email: string;
    zipcode: string;
    address: string;
    detailAddress: string;
    significant: string;
    industry: number[];
    benefit: number;
};

// 라이더 스토어 타입
export type RiderInfoStore = {
  riderData: RiderInfoData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setFormData: (data: Partial<RiderInfoStore["riderData"]>) => void;
};