import { ButtonProps } from "@/types/types";

const Button = ({ title, onClick, className = "" }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {title}
    </button>
  );
};

export default Button;
