import { useReservationStore } from "@/store/ReservationStore";
import RevDate from "@/components/common/input/revDate";
import { formatDate } from "@/types/RevStore/RevCardStates";

export const UpdateDate = ({ visitTime = "" }: { visitTime?: string }) => {
  const { handleChange } = useReservationStore();

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
        value={visitTime ? visitTime.split("T")[0] : ""}
      />
    </div>
  );
};
