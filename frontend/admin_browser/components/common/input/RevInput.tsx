import Input from "./Input";
import { useReservationStore } from "@/store/ReservationStore";
import { getCustomerInputFields } from "@/data/CustomerData";

export const RevUpdateInput = ({ id }: { id: number }) => {
  const { reservationData } = useReservationStore();
  const { handleChange } = useReservationStore();

  return (
    <>
      {getCustomerInputFields(reservationData).map((field) => (
        <Input
          key={field.name}
          title={field.title}
          type="text"
          name={field.name}
          placeholder={field.placeholder}
          value={field.value}
          onChange={handleChange}
        />
      ))}
    </>
  );
};
