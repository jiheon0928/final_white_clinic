import { useReservationStore } from "@/store/ReservationStore";
import RevDate from "@/components/common/input/revDate";
import { formatDate } from "@/types/RevStore/RevCardStates";

export const EnrollDate = () => {
  const { formData, handleChange } = useReservationStore();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    const formattedDate = formatDate(date);
    handleChange({
      target: {
        name: "date",
        value: formattedDate,
      },
    });
  };

  return (
    <div>
      <RevDate
        type="date"
        name="date"
        onChange={handleDateChange}
        title="방문 날짜"
        value={formData.visitTime}
      />
    </div>
  );
};
