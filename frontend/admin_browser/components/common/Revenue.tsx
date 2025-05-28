import Benefit from "@/components/common/input/benefit";
import useRiderStore from "@/store/rider/RiderStore";

export const Revenue = () => {
  const { formData, handleChange } = useRiderStore();
  return (
    <div>
      <Benefit
        type="number"
        name="benefit"
        value={formData.benefit}
        onChange={handleChange}
        title="수수료 (%)"
        step={5}
      />
    </div>
  );
};
