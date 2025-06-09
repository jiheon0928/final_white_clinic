import { RiderData } from "../RiderStore/RiderTypes";

// 예약 상태
export type Status = {
  id: number;
  status: "대기" | "진행" | "완료";
};

// 물건 종류
export type Industry = {
  id: number;
  industry: "세탁기" | "에어컨" | "건조기";
};

// 예약품 항목
export type ReservationItem = {
  label: string;
  value: string | number;
  isHighlighted?: boolean;
};

// 예약 섹션
export type ReservationSection = {
  title: string;
  items: ReservationItem[];
};

// 고객 섹션
export type CustomerSection = {
  title: string;
  items: ReservationItem[];
};

// 입력 필드
export type InputField = {
  title: string;
  name: string;
  placeholder: string;
  value: string;
  type: string;
};
export type InputFields = InputField[];

// 예약 정보(API 응답 타입)
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

// 예약 폼 데이터(API 요청 타입)
export type ReservationFormData = {
  reservationName: string;
  customerName: string;
  customerPhone: string;
  customerRequest: string;
  zipcode: string;
  address: string;
  detailAddress: string;
  visitTime: Date | string;
  memo: string;
  price: number;
  industry: number;
};

// 예약 스토어 타입
export type ReservationStoreType = {
  selectedItems: number[]; // 체크박스 토글용 아이디 배열
  manager: string; // 담당 기사 이름
  currentStatus: "대기" | "진행" | "완료"; // 예약 상태(예: "대기", "진행", "완료")
  reservationData: ReservationFormData;

  // 액션들
  handleCheckboxChange: (value: number) => void;
  setStatus: (status: "대기" | "진행" | "완료") => void;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  setFormData: (data: ReservationFormData) => void;
  handleSubmit: (e: React.FormEvent) => void;
};