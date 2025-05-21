export type ButtonProps = {
  title: string;
  onClick: () => void;
  className?: string;
};

export type InputProps = {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export type ItemInputProps = {
  type: string;
  name: string;
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  className?: string;
};

export type DateProps = {
  type: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  title: string;
};

export type BenefitProps = {
  type: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  title: string;
  step: number;
};

export type ManagerProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  title: string;
};
