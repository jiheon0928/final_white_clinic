import { ManagerProps } from "@/types/ComponentProps";
import classNames from "classnames";

const Managers = ({ value, onChange, className, title }: ManagerProps) => {
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
        <option value="1">장효환</option>
        <option value="2">이광녕</option>
      </select>
    </div>
  );
};

export default Managers;
