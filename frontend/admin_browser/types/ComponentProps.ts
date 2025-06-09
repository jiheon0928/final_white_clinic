export type ButtonProps = {
  title: string;
  onClick?: (e: React.FormEvent | React.MouseEvent) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
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
  value: string;
};

export type BenefitProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  className?: string;
  value: number;
};

export type ManagerProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  title: string;
};

export type Item = {
  name: string;
  title: string;
  id: number;
};
