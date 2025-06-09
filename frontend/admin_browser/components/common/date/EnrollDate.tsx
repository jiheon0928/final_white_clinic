import RevDate from "@/components/common/input/revDate";
import { useReservationStore } from "@/store/ReservationStore";
import { formatDate } from "@/utils/handlers/format";

export const EnrollDate = () => {
  const { reservationData, handleChange } = useReservationStore();

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
        value={
          reservationData.visitTime
            ? (reservationData.visitTime as string).split("T")[0]
            : ""
        }
      />
    </div>
  );
};
