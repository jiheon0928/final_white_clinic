export type AddressModalProps = {
  visible: boolean;
  onClose: () => void;
};

export type AddressState = {
  zipcode: string;
  address: string;
  detailAddress: string;
};
