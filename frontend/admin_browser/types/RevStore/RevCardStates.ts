export const formatTime = (d: Date): string =>
  `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(
    2,
    "0"
  )}`;

export const formatDate = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

export const combineDateAndTime = (dateStr: string, timeStr: string): Date => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hours, minutes] = timeStr.split(":").map(Number);

  const date = new Date();
  date.setFullYear(year);
  date.setMonth(month - 1);
  date.setDate(day);
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
};

export type ReservationFormData = {
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
};

export type RevCardStates = {
  selectedItems: number[]; // 체크박스 토글용 아이디 배열
  manager: string; // 담당 기사 이름
  currentStatus: string; // 예약 상태(예: "대기", "진행", "완료")
  formData: Partial<ReservationFormData>;

  // 액션들
  handleCheckboxChange: (value: number) => void;
  setManager: (name: string) => void;
  setStatus: (status: string) => void;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  setFormData: (data: Partial<ReservationFormData>) => void;
  handleSubmit: (e: React.FormEvent) => void;
};
