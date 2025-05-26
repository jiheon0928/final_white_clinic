export type RiderInfoStore = {
  formData: {
    name: string;
    phone: string;
    email: string;
    address: string;
    notes: string;
    industry: boolean;
    birthDate: string;
    benefit: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit?: (e: React.FormEvent) => void;
};
