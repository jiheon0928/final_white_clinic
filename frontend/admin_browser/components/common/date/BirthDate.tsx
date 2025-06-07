import RevDate from "@/components/common/input/revDate";
import useRiderStore from "@/store/rider/RiderStore";

export const BirthDate = ({ birth = "" }: { birth?: string }) => {
  const { riderData, setFormData } = useRiderStore();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...riderData,
      birth: e.target.value,
    });
  };

  return (
    <div>
      <RevDate
        type="date"
        name="birth"
        value={birth}
        onChange={handleDateChange}
        title="생년월일"
      />
    </div>
  );
};
