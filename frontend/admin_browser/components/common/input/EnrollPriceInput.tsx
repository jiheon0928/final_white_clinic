import { useReservationStore } from "@/store/ReservationStore";
import Input from "./Input";

export const EnrollPriceInput = () => {
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
