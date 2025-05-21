import { useReservationStore } from "@/store/ReservationStore";
import RevDate from "@/components/common/input/revDate";

export const EnrollDate = () => {
  const { formData, handleChange } = useReservationStore();
  return (
    <div>
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
    </div>
  );
};
