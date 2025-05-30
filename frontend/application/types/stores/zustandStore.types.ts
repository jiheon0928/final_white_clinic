export type IndustryType = "에어컨" | "세탁기" | "건조기";
export type IndustryState = {
  industry: IndustryType[];
  industryOptions: string[];
  industryId: number;
  selectedIndustry: string | null;
  setIndustry: (industry: IndustryType[]) => void;
  setSelectedIndustry: (selected: string) => void;
  toggle: (label: IndustryType, checked: boolean) => void;
  setSelected: (list: IndustryType[]) => void;
  resetIndustry: () => void;
};

export type DateState = {
  date: string;
  setDate: (d: Date) => void;
  setDateFromDate: (selected: Date) => void;
  resetDate: () => void;
};

export type TimeState = {
  time: string;
  setTime: (time: Date) => void;
  resetTime: () => void;
};

export type RiderState = {
  rider: {
    name: string;
    birth: string;
    phone: string;
    email: string;
    zipcode: string;
    address: string;
    detailAddress: string;
    significant: string;
    industry: number[];
    benefit: number;
  };
  benefitType: number[];
  searchRiderValue: string;
  setRiderField: <K extends keyof RiderState["rider"]>(
    key: K,
    value: RiderState["rider"][K]
  ) => void;
  setRider: (data: Partial<RiderState["rider"]>) => void;
  setSearchRiderValue: (value: string) => void;
  resetRider: () => void;
};

export type AddressState = {
  zipcode: string;
  address: string;
  detailAddress: string;

  setAddress: <K extends keyof AddressState>(
    key: K,
    value: AddressState[K]
  ) => void;

  resetAddress: () => void;
};

export type AuthState = {
  isAuthenticated: boolean;
  name: string;
  accessToken?: string;
  setAuth: (name: string, accessToken: string) => void;
  setAuthOff: () => void;
};

export type ReservationState = {
  reservation: {
    reservationName: string;
    customerName: string;
    customerPhone: string;
    customerRequest: string;
    zipcode: string;
    address: string;
    detailAddress: string;
    visitTime: Date | string;
    memo: string;
    price: number;
    industryId: number;
  };
  status: "대기" | "진행" | "완료";
  searchValue: string;
  setStatus: (status: "대기" | "진행" | "완료") => void;
  setSearchValue: (searchValue: string) => void;
  setReservationField: (
    field: keyof ReservationState["reservation"],
    value: string | Date | number
  ) => void;
  setReservation: (reservation: ReservationState["reservation"]) => void;
  resetReservation: () => void;
};
export type SignupState = {
  user: {
    loginId: string;
    password: string;
    name: string;
    birth: string;
    phone: string;
    email: string;
    zipcode: string;
    address: string;
    detailAddress: string;
    industry: number[];
  };
  setUserField: <K extends keyof SignupState["user"]>(
    key: K,
    value: SignupState["user"][K]
  ) => void;
  resetUser: () => void;
};
