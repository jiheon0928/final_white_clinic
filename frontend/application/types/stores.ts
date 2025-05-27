export type IndustryType = "에어컨" | "세탁기";

export type IndustryState = {
  industry: IndustryType[];
  toggle: (label: IndustryType, checked: boolean) => void;
  setSelected: (list: IndustryType[]) => void;
  resetIndustry: () => void;
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

export type EditRiderState = {
  rider: {
    name: string;
    phone: string;
    email: string;
    birth: string;
    zipcode: string;
    address: string;
    detailAddress: string;
    significant: string;
    industry: IndustryType[];
    benefit: number;
    approval: boolean;
  };
  setRiderField: <K extends keyof EditRiderState["rider"]>(
    key: K,
    value: EditRiderState["rider"][K]
  ) => void;
  setRider: (data: Partial<EditRiderState["rider"]>) => void;
  resetRider: () => void;
};
