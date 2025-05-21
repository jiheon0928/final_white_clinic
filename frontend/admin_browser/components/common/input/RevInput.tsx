import Input from "./Input";
import { useReservationStore } from "@/store/ReservationStore";

export const RevInput = () => {
  const { formData, handleChange } = useReservationStore();
  return (
    <>
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
    </>
  );
};
