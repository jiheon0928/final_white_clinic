import { ManagerProps } from "@/types/ComponentProps";
import classNames from "classnames";
import { riderList } from "@/data/data";

const Managers = ({ value, onChange, className, title }: ManagerProps) => {
  const riders = riderList();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="manager" className="text-gray-700 font-semibold">
        {title}
      </label>
      <select
        value={value}
        onChange={onChange}
        className={classNames(
          "border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 ",
          className
        )}
      >
        <option value="">기사님 선택</option>
        {riders.map((rider) => (
          <option key={rider.id} value={rider.id}>
            {rider.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Managers;
