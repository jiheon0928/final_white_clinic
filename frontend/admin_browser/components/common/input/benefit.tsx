import { BenefitProps } from "@/types/ComponentProps";
import classNames from "classnames";

const Benefit = ({
  onChange,
  className,
  value,
}: BenefitProps) => {
  const options = [0.4, 0.5, 0.6];

  return (
    <div className="flex flex-col gap-2 max-w-xs">
      <label htmlFor="benefit" className="text-gray-700 font-semibold">
        수수료
      </label>
      <select
        name="benefit"
        value={value}
        onChange={onChange}
        className={classNames(
          "border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
          className
        )}
      >
        <option value="">수수료 선택</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {(option * 100).toFixed(0)}%
          </option>
        ))}
      </select>
    </div>
  );
};

export default Benefit;
