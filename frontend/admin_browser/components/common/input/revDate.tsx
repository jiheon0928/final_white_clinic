import { DateProps } from "@/types/types";
import classNames from "classnames";

const RevDate = ({ type, name, onChange, className, title }: DateProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className={classNames(
          "text-gray-700 font-semibold border-none ",
          className
        )}
      >
        {title}
      </label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        className={classNames(
          "w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black",
          className
        )}
      />
    </div>
  );
};

export default RevDate;
