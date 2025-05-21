import { InputProps } from "@/types/ComponentProps";
import classNames from "classnames";

type HtmlForType = {
  [key: string]: string;
};

const htmlFor: HtmlForType = {
  name: "name",
  phone: "phone",
  address: "address",
  item: "item",
  washer: "washer",
  dryer: "dryer",
  date: "date",
  time: "time",
  message: "message",
  price: "price",
};

interface ExtendedInputProps extends InputProps {
  title?: string;
}

const Input = ({
  type,
  name,
  placeholder,
  onChange,
  className,
  title,
}: ExtendedInputProps) => {
  return (
    <div className="flex flex-col gap-2 ">
      {title && (
        <label
          className={classNames(
            "text-gray-700 font-semibold border-none",
            className
          )}
          htmlFor={htmlFor[name]}
        >
          {title}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className={classNames(
          "w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ",
          className
        )}
      />
    </div>
  );
};

export default Input;
