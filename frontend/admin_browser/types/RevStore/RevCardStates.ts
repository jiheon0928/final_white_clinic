export type RevCardStates = {
  selectedItems: string[];
  manager: string;
  currentStatus: "진행" | "완료" | "대기";
  setStatus: (status: "진행" | "완료" | "대기") => void;
  formData: {
    name: string;
    phone: string;
    address: string;
    item: string;
    washer: boolean;
    dryer: boolean;
    date: string;
    time: string;
    message: string;
    price: number;
  };
  handleCheckboxChange: (value: string) => void;
  setManager: (value: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
