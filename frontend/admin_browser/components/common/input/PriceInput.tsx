import Input from "./Input";
import { useReservationStore } from "@/store/ReservationStore";

export const PriceInput = () => {
  const { formData, handleChange } = useReservationStore();
  return (
    <>
      <Input
        title="발생 비용"
        type="number"
        name="price"
        placeholder="발생 비용"
        value={formData.price?.toString() || ""}
        onChange={handleChange}
        className="text-gray-600"
      />
    </>
  );
};
