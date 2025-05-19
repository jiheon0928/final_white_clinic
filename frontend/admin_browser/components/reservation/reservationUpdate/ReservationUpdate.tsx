"use client";
import Input from "@/components/common/input/Input";
import { FormData } from "@/types/types";
import { useReservationEnrollStore } from "@/store/reservation/ReservationEnrollStore";
import { useReservationUpdateStore } from "@/store/reservation/ReservationUpdateStore";
import Button from "@/components/common/Button";
import ItemInput from "@/components/common/input/itemInput";
import RevDate from "@/components/common/input/revDate";
import Managers from "@/components/common/Managers";

export const ReservationUpdate = () => {
  const { formData, handleChange } = useReservationEnrollStore() as {
    formData: FormData & {
      washer: boolean;
      dryer: boolean;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

  const { selectedItems, manager, handleCheckboxChange, setManager } =
    useReservationUpdateStore();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-8 text-blue-600">
        예약 수정하기
      </h1>
      <form className="space-y-6">
        <Input
          title="고객성함"
          type="text"
          name="name"
          placeholder="고객성함"
          value={formData.name || ""}
          onChange={handleChange}
        />
        <Input
          title="연락처"
          type="text"
          name="phone"
          placeholder="연락처"
          value={formData.phone || ""}
          onChange={handleChange}
        />
        <Input
          title="방문 주소"
          type="text"
          name="address"
          placeholder="방문 주소"
          value={formData.address || ""}
          onChange={handleChange}
        />
        <Input
          title="고객 요청사항"
          type="text"
          name="item"
          placeholder="고객 요청사항을 입력해주세요."
          value={formData.item || ""}
          onChange={handleChange}
        />
        <Input
          title="기사님 전달사항"
          type="text"
          name="message"
          placeholder="기사님 전달사항을 입력해주세요."
          value={formData.message || ""}
          onChange={handleChange}
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="item" className="text-gray-700 font-semibold">
            수리 물품
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
        </div>
        <RevDate
          type="date"
          name="date"
          onChange={handleChange}
          title="방문 날짜"
        />
        <RevDate
          type="time"
          name="time"
          onChange={handleChange}
          title="방문 시간"
        />
        <div className="flex flex-col gap-4">
          <Managers
            value={manager}
            onChange={(e) => setManager(e.target.value)}
            title="담당 기사"
          />
          <Input
            title="발생 비용"
            type="number"
            name="price"
            placeholder="발생 비용"
            value={formData.price?.toString() || ""}
            onChange={handleChange}
            className="text-gray-600"
          />
        </div>
        <Button
          title="예약 수정"
          type="submit"
          onClick={() => {}}
          className="w-full bg-blue-500 hover:bg-blue-600"
        />
      </form>
    </div>
  );
};
