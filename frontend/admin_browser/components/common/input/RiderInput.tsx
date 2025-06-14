"use client";
import Input from "@/components/common/input/Input";
import useRiderStore from "@/store/rider/RiderStore";
import { RidersData } from "@/data/RiderData";
import { RiderData } from "@/types/RiderStore/RiderTypes";

export const RiderInput = () => {
  const { handleChange, riderData } = useRiderStore();
  const riderDataForDisplay: Partial<RiderData> = {
    name: riderData.name,
    phone: riderData.phone,
    email: riderData.email,
    zipcode: riderData.zipcode,
    address: riderData.address,
    detailAddress: riderData.detailAddress,
    significant: riderData.significant,
  };

  return (
    <div className="flex flex-col gap-4">
      {RidersData(riderDataForDisplay as RiderData).map((field) => (
          <Input
            key={field.name}
            title={field.title}
            type="text"
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
          value={riderData.significant}
          rows={4}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
