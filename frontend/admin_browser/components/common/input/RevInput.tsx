import { useApiStore } from "@/store/Api";
import Input from "./Input";
import { useReservationStore } from "@/store/ReservationStore";
import { getCustomerInputFields } from "@/data/CustomerData";

export const RevUpdateInput = ({ id }: { id: number }) => {
  const { reservations } = useApiStore();
  const { handleChange } = useReservationStore();
  const { setFormData } = useReservationStore();

  const reservation = reservations.find((r) => r.id === Number(id));
  if (!reservation) return <div>예약 정보를 불러올 수 없습니다.</div>;
  setFormData({ ...reservation, industry: reservation.industry.id });
  const inputFields = getCustomerInputFields(reservation);

  return (
    <>
      {inputFields.map((field) => (
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
