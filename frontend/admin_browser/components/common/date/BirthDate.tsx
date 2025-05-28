import RevDate from "@/components/common/input/revDate";
import useRiderStore from "@/store/rider/RiderStore";

export const BirthDate = () => {
  const { formData, handleChange, setFormData } = useRiderStore();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      birth: e.target.value,
    });
  };

  return (
    <div>
      <RevDate
        type="date"
        name="birth"
        value={formData.birth}
        onChange={handleDateChange}
        title="생년월일"
      />
    </div>
  );
};
