import { ButtonProps } from "@/types/ComponentProps";
import classNames from "classnames";

const ButtonType = {
  button: "button",
  submit: "submit",
  reset: "reset",
} as const;

interface ExtendedButtonProps extends ButtonProps {
  type?: (typeof ButtonType)[keyof typeof ButtonType];
}

const Button = ({
  title,
  onClick,
  className,
  type = ButtonType.button,
}: ExtendedButtonProps) => {
  return (
    <button
      type={type}
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
