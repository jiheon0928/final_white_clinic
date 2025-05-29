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

export type RevCardStates = {
  selectedItems: string[];
  manager: string;
  currentStatus: string;
  formData: {
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
    industryIds: number;
  };
  handleCheckboxChange: (value: string) => void;
  setManager: (value: string) => void;
  setStatus: (status: string) => void;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | { target: { name: string; value: string } }
  ) => void;
  setFormData: (data: Partial<RevCardStates["formData"]>) => void;
};
