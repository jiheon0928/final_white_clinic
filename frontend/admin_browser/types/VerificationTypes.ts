export type Verification = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  benefit: number;
  status: string[];
};

export type VerificationList = Verification[];
