"use client";
import { ManagerProps } from "@/types/ComponentProps";
import classNames from "classnames";
import { useApiStore } from "@/store/Api";
import { useState, useEffect } from "react";

const Managers = ({ value, onChange, className, title }: ManagerProps) => {
  const { getRiderNames } = useApiStore();
  const [riderNames, setRiderNames] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    const fetchRiderNames = async () => {
      try {
        const data = await getRiderNames();
        setRiderNames(data);
      } catch (error) {
        console.error("기사 이름 목록을 가져오는데 실패했습니다:", error);
      }
    };

    fetchRiderNames();
  }, [getRiderNames]);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="manager" className="text-gray-700 font-semibold">
        {title}
      </label>
      <select
        value={value}
        onChange={onChange}
        className={classNames(
          "border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600",
          className
        )}
      >
        <option value="">기사님 선택</option>
        {riderNames.map((rider) => (
          <option key={rider.id} value={rider.id}>
            {rider.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Managers;
