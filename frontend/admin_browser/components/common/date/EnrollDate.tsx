import RevDate from "@/components/common/input/revDate";
import { useReservationStore } from "@/store/ReservationStore";
import { formatDate } from "@/types/RevStore/RevCardStates";

export const EnrollDate = () => {
  const { formData, handleChange } = useReservationStore();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    const formattedDate = formatDate(date);
    handleChange({
      target: {
        name: "visitTime",
        value: formattedDate,
      },
    } as any);
  };

  return (
    <div>
      <RevDate
        type="date"
        name="visitTime"
        onChange={handleDateChange}
        title="방문 날짜"
        value={formData.visitTime ? formData.visitTime.split("T")[0] : ""}
      />
    </div>
  );
};
