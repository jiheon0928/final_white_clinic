"use client";
import Input from "@/components/common/input/Input";
import useRiderStore from "@/store/rider/RiderStore";

export const RiderInput = () => {
  const { formData, handleChange } = useRiderStore();

  return (
    <div className="flex flex-col gap-4">
      <Input
        title="기사이름"
        type="text"
        name="name"
        placeholder="기사님 이름 작성해주세요"
        onChange={handleChange}
        value={formData.name}
      />
      <Input
        title="전화번호"
        type="text"
        name="phone"
        placeholder="기사님 전화번호 작성해주세요"
        onChange={handleChange}
        value={formData.phone}
      />
      <Input
        title="이메일"
        type="email"
        name="email"
        placeholder="기사님 이메일 작성해주세요"
        onChange={handleChange}
        value={formData.email}
      />
      <Input
        title="거주 지역"
        type="text"
        name="address"
        placeholder="기사님 거주 지역을 작성해주세요"
        onChange={handleChange}
        value={formData.address}
      />
      <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-semibold">특이사항</label>
        <textarea
          name="notes"
          placeholder="기사님 특이사항 또는 추가 정보를 입력해주세요"
          value={formData.notes}
          rows={4}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
