import { ItemInputProps } from "@/types/ComponentProps";
import classNames from "classnames";

const ItemInput = ({
  type,
  name,
  onChange,
  checked,
  className,
  title,
}: ItemInputProps) => {
  return (
    <div
      className={classNames(
        "flex gap-4 text-gray-600 font-semibold",
        className
      )}
    >
      <label className="flex items-center space-x-2">
        <input
          type={type}
          name={name}
          className={classNames(
            "form-checkbox h-5 w-5 text-blue-500 ",
            className
          )}
          onChange={onChange}
          checked={checked}
        />
        <span>{title}</span>
      </label>
    </div>
  );
};

export default ItemInput;
