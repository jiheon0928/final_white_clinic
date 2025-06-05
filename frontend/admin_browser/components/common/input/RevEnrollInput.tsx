import { useReservationStore } from "@/store/ReservationStore";
import Input from "./Input";
import { RevEnrollData } from "@/data/RevEnrollData";

export const RevEnrollInput = () => {
  const { handleChange } = useReservationStore();

  return (
    <>
      {RevEnrollData().map((field) => (
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
