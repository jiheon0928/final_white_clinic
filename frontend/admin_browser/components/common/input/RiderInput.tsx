"use client";
import Input from "@/components/common/input/Input";
import useRiderStore from "@/store/rider/RiderStore";
import { useApiStore } from "@/store/Api";
import { RiderData } from "@/data/RiderData";

export const RiderInput = ({ id }: { id: number }) => {
  const { handleChange } = useRiderStore();
  const { riders } = useApiStore();
  const rider = riders.find((rider) => rider.id === Number(id));

  return (
    <div className="flex flex-col gap-4">
      {rider &&
        RiderData(rider).map((field) => (
          <Input
            key={field.name}
            title={field.title}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            onChange={handleChange}
            value={field.value}
          />
        ))}
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-semibold">특이사항</label>
        <textarea
          name="significant"
          placeholder="기사님 특이사항 또는 추가 정보를 입력해주세요"
          value={rider?.significant || ""}
          rows={4}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
