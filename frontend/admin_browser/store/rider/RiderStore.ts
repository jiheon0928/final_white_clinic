import { create } from "zustand";

interface RiderStore {
  formData: {
    name: string;
    phone: string;
    email: string;
    address: string;
    notes: string;
    washer: boolean;
    dryer: boolean;
    birthDate: string;
    benefit: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit?: (e: React.FormEvent) => void;
}

const useRiderStore = create<RiderStore>((set) => ({
  formData: {
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
    washer: false,
    dryer: false,
    birthDate: "",
    benefit: "",
  },
  handleChange: (e) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    set((state) => ({
      formData: {
        ...state.formData,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  },
  handleSubmit: (e) => {
    e.preventDefault();
    // TODO: API 연동
    console.log("Form submitted");
  },
}));

export default useRiderStore;
