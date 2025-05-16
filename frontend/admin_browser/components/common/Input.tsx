import { InputProps } from "@/types/types";

const Input = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  className = "",
}: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};

export default Input;
