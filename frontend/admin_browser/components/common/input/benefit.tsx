import { BenefitProps } from "@/types/ComponentProps";
import classNames from "classnames";

const Benefit = ({
  type,
  name,
  onChange,
  className,
  title,
  value,
}: BenefitProps) => {
  return (
    <div className="flex flex-col gap-2 max-w-xs">
      <label htmlFor="benefit" className="text-gray-700 font-semibold">
        {title}
      </label>
      <input
        type={type}
        name={name}
        step={1}
        value={value}
        onChange={onChange}
        className={classNames(
          "border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ",
          className
        )}
      />
    </div>
  );
};

export default Benefit;
