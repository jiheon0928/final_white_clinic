// types/list.ts

// 배정된 기사 정보 타입
export interface Driver {
  id: number;

  name: string; // 기사 이름 (필요한 필드 추가 가능)

  // 기타 기사 관련 필드 추가
}

// 작업 상태 정보 타입 (예: 대기, 진행 중, 완료)
export interface Status {
  id: number;

  statusName: string; // 상태 이름

  // 기타 상태 관련 필드 추가
}

// 작업 분야 정보 타입 (예: 에어컨, 세탁기 등)
export interface Field {
  id: number;

  fieldName: string; // 분야 이름

  // 기타 필드 관련 정보 추가
}

// 리스트(예약 작업 정보) 전체 타입
export interface WorkList {
  id: number; // 작업 ID

  worklist: string; // 작업 제목 또는 이름

  registrationTime: string; // 등록 시간 (ISO 문자열)

  reservation: string; // 예약 날짜 및 시간

  price: number; // 금액

  customer: string; // 고객 이름

  address: string; // 주소

  contact: string; // 연락처

  request?: string; // 고객 요청 사항 (선택값)

  driverId: number; // 기사 ID (FK)

  driver: Driver; // 기사 객체 정보

  compliteStateId: number; // 상태 ID (FK)

  compliteState: Status; // 상태 객체 정보

  fieldId: number; // 분야 ID (FK)

  field: Field; // 분야 객체 정보
}

export interface Login {
  loginId: string;
  password: string;
}
