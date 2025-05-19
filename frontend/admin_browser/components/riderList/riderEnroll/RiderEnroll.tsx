"use client";
import Button from "@/components/common/Button";
import Input from "@/components/common/input/Input";
import ItemInput from "@/components/common/input/itemInput";
import RevDate from "@/components/common/input/revDate";
import Benefit from "@/components/common/input/benefit";
import useRiderEnrollStore from "@/store/rider/RiderEnroll";

export const RiderEnroll = () => {
  const { formData, handleChange, handleSubmit } = useRiderEnrollStore();

  return (
    <div
      id="enroll"
      className="flex flex-col gap-4 bg-white p-8 rounded-lg text-black shadow-lg max-w-2xl mx-auto"
    >
      <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        기사 등록
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          title="이름"
          type="text"
          name="name"
          placeholder="이름"
          onChange={handleChange}
          value={formData.name}
        />
        <Input
          title="전화번호"
          type="text"
          name="phone"
          placeholder="전화번호"
          onChange={handleChange}
          value={formData.phone}
        />
        <Input
          title="이메일"
          type="email"
          name="email"
          placeholder="이메일"
          onChange={handleChange}
          value={formData.email}
        />
        <Input
          title="거주 지역"
          type="text"
          name="address"
          placeholder="거주 지역"
          onChange={handleChange}
          value={formData.address}
        />
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">특이사항</label>
          <textarea
            name="notes"
            rows={4}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="기사님의 특이사항이나 추가 정보를 입력해주세요."
            onChange={handleChange}
            value={formData.notes}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">
            가능 품목 리스트
          </label>
          <div className="flex gap-4">
            <ItemInput
              type="checkbox"
              name="washer"
              onChange={handleChange}
              checked={formData.washer}
              title="세탁기"
            />
            <ItemInput
              type="checkbox"
              name="dryer"
              onChange={handleChange}
              checked={formData.dryer}
              title="건조기"
            />
          </div>
          <RevDate
            type="date"
            name="birthDate"
            onChange={handleChange}
            title="생년월일"
          />
        </div>
        <Benefit
          type="number"
          name="benefit"
          onChange={handleChange}
          title="수수료 (%)"
          step={5}
        />
        <Button
          title="등록하기"
          type="submit"
          onClick={() => {}}
          className="w-full bg-blue-500 hover:bg-blue-600"
        />
      </form>
    </div>
  );
};
