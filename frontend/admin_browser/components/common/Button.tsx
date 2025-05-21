import { ButtonProps } from "@/types/ComponentProps";
import classNames from "classnames";

const Button = ({ title, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "text-white px-4 py-2 rounded-md cursor-pointer ",
        className
      )}
    >
      {title}
    </button>
  );
};

export default Button;
