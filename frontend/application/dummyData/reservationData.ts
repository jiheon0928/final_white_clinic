type ReservationBase = {
  id: number;
  item: string;
  visitTime: string;
  price: number;
  customer: string;
  address: string;
  detailAddress: string;
  zipcode: string;
  phone: string;
  request: string;
  memo: string;
  industryId: (typeof industryData)[number]["id"];
};

type WaitingReservation = ReservationBase & {
  statusId: 1;
  riderId?: undefined;
};

type ActiveReservation = ReservationBase & {
  statusId: 2 | 3;
  riderId: (typeof riderData)[number]["id"];
};

export type reservationDummyType = WaitingReservation | ActiveReservation;

export const statusData: { id: number; status: "대기" | "진행" | "완료" }[] = [
  { id: 1, status: "대기" },
  { id: 2, status: "진행" },
  { id: 3, status: "완료" },
];

export const industryData: { id: number; industry: "세탁기" | "에어컨" }[] = [
  { id: 1, industry: "세탁기" },
  { id: 2, industry: "에어컨" },
];

export const riderData: {
  id: number;
  rider:
    | "박준태"
    | "김민수"
    | "이영희"
    | "최재현"
    | "정다운"
    | "한상우"
    | "송미란"
    | "박서연"
    | "강현우";
}[] = [
  { id: 1, rider: "박준태" },
  { id: 2, rider: "김민수" },
  { id: 3, rider: "이영희" },
];

export const reservationDummy: reservationDummyType[] = [
  {
    id: 1,
    item: "세탁기 물빼기",
    visitTime: "2025-05-27T01:23:45.678Z",
    price: 30000,
    customer: "박준태",
    address: "인천 송도",
    detailAddress: "송도동 160번지",
    zipcode: "12345",
    phone: "010-3214-9876",
    request: "빠른 방문 부탁드립니다",
    memo: "부품 교체 필요",
    statusId: 1,
    industryId: 1,
  },
  {
    id: 2,
    item: "에어컨 청소",
    visitTime: "2025-05-28T14:30:00.000Z",
    price: 50000,
    customer: "김민수",
    address: "서울 강남구",
    detailAddress: "역삼동 123-45",
    zipcode: "06123",
    phone: "010-1234-5678",
    request: "오후 2시 이후 방문 가능합니다",
    memo: "필터 교체 예정",
    statusId: 2,
    industryId: 2,
    riderId: 2,
  },
  {
    id: 3,
    item: "세탁기 수리",
    visitTime: "2025-05-29T09:00:00.000Z",
    price: 45000,
    customer: "이영희",
    address: "서울 마포구",
    detailAddress: "합정동 45-67",
    zipcode: "04123",
    phone: "010-9876-5432",
    request: "소음이 심해요",
    memo: "모터 점검 필요",
    statusId: 3,
    industryId: 1,
    riderId: 3,
  },
  {
    id: 4,
    item: "에어컨 설치",
    visitTime: "2025-05-30T10:15:00.000Z",
    price: 80000,
    customer: "최재현",
    address: "경기도 성남시",
    detailAddress: "분당구 정자동 789-12",
    zipcode: "13494",
    phone: "010-4567-8901",
    request: "벽걸이 에어컨입니다",
    memo: "설치 자재 준비",
    statusId: 1,
    industryId: 2,
  },
  {
    id: 5,
    item: "세탁기 분해 청소",
    visitTime: "2025-05-31T13:45:00.000Z",
    price: 60000,
    customer: "정다운",
    address: "인천 부평구",
    detailAddress: "부평동 234-56",
    zipcode: "21353",
    phone: "010-2345-6789",
    request: "곰팡이 제거 부탁드려요",
    memo: "특수 세제 필요",
    statusId: 2,
    industryId: 1,
    riderId: 1,
  },
  {
    id: 6,
    item: "에어컨 가스 주입",
    visitTime: "2025-06-01T11:30:00.000Z",
    price: 40000,
    customer: "한상우",
    address: "서울 서초구",
    detailAddress: "서초동 345-67",
    zipcode: "06789",
    phone: "010-8901-2345",
    request: "냉방이 약해요",
    memo: "가스량 체크 필요",
    statusId: 3,
    industryId: 2,
    riderId: 2,
  },
  {
    id: 7,
    item: "세탁기 호스 교체",
    visitTime: "2025-06-02T15:20:00.000Z",
    price: 35000,
    customer: "송미란",
    address: "경기도 부천시",
    detailAddress: "중동 456-78",
    zipcode: "14713",
    phone: "010-5678-9012",
    request: "호스가 낡았어요",
    memo: "호스 길이 체크",
    statusId: 1,
    industryId: 1,
  },
  {
    id: 8,
    item: "에어컨 필터 교체",
    visitTime: "2025-06-03T16:40:00.000Z",
    price: 25000,
    customer: "임성민",
    address: "서울 송파구",
    detailAddress: "잠실동 567-89",
    zipcode: "05500",
    phone: "010-3456-7890",
    request: "알레르기가 있어서 꼼꼼히 해주세요",
    memo: "헤파필터로 교체",
    statusId: 2,
    industryId: 2,
    riderId: 3,
  },
  {
    id: 9,
    item: "세탁기 설치",
    visitTime: "2025-06-04T10:00:00.000Z",
    price: 70000,
    customer: "박서연",
    address: "인천 연수구",
    detailAddress: "연수동 678-90",
    zipcode: "21904",
    phone: "010-7890-1234",
    request: "수도 연결 포함해주세요",
    memo: "신규 설치",
    statusId: 3,
    industryId: 1,
    riderId: 1,
  },
  {
    id: 10,
    item: "에어컨 이전 설치",
    visitTime: "2025-06-05T14:00:00.000Z",
    price: 90000,
    customer: "강현우",
    address: "서울 영등포구",
    detailAddress: "여의도동 789-01",
    zipcode: "07320",
    phone: "010-6789-0123",
    request: "안전하게 이전 부탁드립니다",
    memo: "스탠드형 에어컨",
    statusId: 1,
    industryId: 2,
  },
];
