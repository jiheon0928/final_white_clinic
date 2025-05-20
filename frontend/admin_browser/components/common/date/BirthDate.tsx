import RevDate from "@/components/common/input/revDate";
import useRiderStore from "@/store/rider/RiderStore";

export const BirthDate = () => {
  const { formData, handleChange } = useRiderStore();
  return (
    <div>
      <RevDate
        type="date"
        name="birthDate"
        onChange={handleChange}
        title="생년월일"
      />
    </div>
  );
};
