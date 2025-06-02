import { useReservationStore } from "@/store/ReservationStore";
import Input from "./Input";

export const UpdatePriceInput = ({ price }: { price: number }) => {
  const { handleChange } = useReservationStore();
  return (
    <>
      <Input
        title="발생 비용"
        type="number"
        name="price"
        placeholder="발생 비용"
        value={price.toString()}
        onChange={handleChange}
        className="text-gray-600"
      />
    </>
  );
};
