export type RiderInfoStore = {
  formData: {
    name: string;
    birth: string;
    loginId: string;
    password: string;
    phone: string;
    address: string;
    detailAddress: string;
    zipcode: string;
    email: string;
    significant: string;
    approval: boolean;
    industry?: boolean;
    benefit: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit?: (e: React.FormEvent) => void;
};
