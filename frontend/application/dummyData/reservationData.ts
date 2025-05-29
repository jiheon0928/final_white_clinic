import ridersData from "./ridersData";

type Status = {
  id: number;
  status: "대기" | "진행" | "완료";
};

type Industry = {
  id: number;
  industry: "세탁기" | "에어컨";
};

type ReservationBase = {
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
  rider: (typeof ridersData)[number] | null;
  status: Status;
};

export type reservationType = ReservationBase;

// export const reservationDummy: reservationType[] = [
//   {
//     id: 1,
//     item: "세탁기 점검",
//     visitTime: "2024-02-01T10:00:00.000Z",
//     price: 50000,
//     customer: "홍길동",
//     address: "서울 강남구",
//     detailAddress: "역삼동 123-45",
//     zipcode: "06123",
//     phone: "010-1234-5678",
//     request: "세탁기에서 이상한 소리가 납니다",
//     memo: "부품 교체 필요할 수 있음",
//     statusId: 1,
//     industryId: 1,
//   },
//   {
//     id: 2,
//     item: "에어컨 청소",
//     visitTime: "2024-02-01T14:00:00.000Z",
//     price: 80000,
//     customer: "김철수",
//     address: "서울 서초구",
//     detailAddress: "서초동 456-78",
//     zipcode: "06789",
//     phone: "010-2345-6789",
//     request: "필터 청소 부탁드립니다",
//     memo: "특수 청소도구 필요",
//     statusId: 2,
//     industryId: 2,
//     riderId: 1,
//   },
//   {
//     id: 3,
//     item: "세탁기 설치",
//     visitTime: "2024-02-02T09:00:00.000Z",
//     price: 70000,
//     customer: "이영희",
//     address: "서울 송파구",
//     detailAddress: "잠실동 789-10",
//     zipcode: "05500",
//     phone: "010-3456-7890",
//     request: "수도 연결도 함께 해주세요",
//     memo: "신규 설치 건",
//     statusId: 3,
//     industryId: 1,
//     riderId: 2,
//   },
//   {
//     id: 4,
//     item: "에어컨 수리",
//     visitTime: "2024-02-02T13:00:00.000Z",
//     price: 60000,
//     customer: "박민수",
//     address: "서울 마포구",
//     detailAddress: "합정동 101-23",
//     zipcode: "04123",
//     phone: "010-4567-8901",
//     request: "실외기에서 소음이 심합니다",
//     memo: "실외기 점검 필요",
//     statusId: 1,
//     industryId: 2,
//   },
//   {
//     id: 5,
//     item: "세탁기 분해 청소",
//     visitTime: "2024-02-03T10:00:00.000Z",
//     price: 90000,
//     customer: "정동원",
//     address: "서울 영등포구",
//     detailAddress: "여의도동 234-56",
//     zipcode: "07320",
//     phone: "010-5678-9012",
//     request: "세탁조 청소 부탁드립니다",
//     memo: "곰팡이 제거 필요",
//     statusId: 2,
//     industryId: 1,
//     riderId: 3,
//   },
//   {
//     id: 6,
//     item: "에어컨 설치",
//     visitTime: "2024-02-03T15:00:00.000Z",
//     price: 100000,
//     customer: "강지원",
//     address: "서울 동작구",
//     detailAddress: "상도동 345-67",
//     zipcode: "06901",
//     phone: "010-6789-0123",
//     request: "벽걸이 에어컨 설치 원합니다",
//     memo: "설치 자재 준비 필요",
//     statusId: 1,
//     industryId: 2,
//   },
//   {
//     id: 7,
//     item: "세탁기 수리",
//     visitTime: "2024-02-04T11:00:00.000Z",
//     price: 75000,
//     customer: "조민재",
//     address: "서울 성동구",
//     detailAddress: "성수동 567-89",
//     zipcode: "04799",
//     phone: "010-7890-1234",
//     request: "세탁기 배수가 안됩니다",
//     memo: "배수구 점검 필요",
//     statusId: 2,
//     industryId: 1,
//     riderId: 4,
//   },
//   {
//     id: 8,
//     item: "에어컨 점검",
//     visitTime: "2024-02-04T14:00:00.000Z",
//     price: 55000,
//     customer: "윤서연",
//     address: "서울 광진구",
//     detailAddress: "자양동 678-90",
//     zipcode: "05001",
//     phone: "010-8901-2345",
//     request: "에어컨 성능이 떨어진 것 같아요",
//     memo: "가스 충전 필요할 수 있음",
//     statusId: 3,
//     industryId: 2,
//     riderId: 5,
//   },
//   {
//     id: 9,
//     item: "세탁기 청소",
//     visitTime: "2024-02-05T10:00:00.000Z",
//     price: 85000,
//     customer: "임현우",
//     address: "서울 용산구",
//     detailAddress: "이태원동 789-12",
//     zipcode: "04350",
//     phone: "010-9012-3456",
//     request: "세탁조 악취가 심합니다",
//     memo: "살균 세척 필요",
//     statusId: 1,
//     industryId: 1,
//   },
//   {
//     id: 10,
//     item: "에어컨 분해 청소",
//     visitTime: "2024-02-05T15:00:00.000Z",
//     price: 95000,
//     customer: "한도윤",
//     address: "서울 중구",
//     detailAddress: "을지로 890-23",
//     zipcode: "04523",
//     phone: "010-0123-4567",
//     request: "에어컨 내부 청소 원합니다",
//     memo: "필터 교체 추천",
//     statusId: 2,
//     industryId: 2,
//     riderId: 1,
//   },
// ];
