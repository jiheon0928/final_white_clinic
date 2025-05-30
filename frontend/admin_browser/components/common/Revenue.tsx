import Benefit from "@/components/common/input/benefit";
import useRiderStore from "@/store/rider/RiderStore";

export const Revenue = () => {
  const { formData, handleChange } = useRiderStore();
  console.log(formData.benefit);

  return (
    <div>
      <Benefit
        type="number"
        name="benefit"
        value={formData.benefit || 1}
        onChange={handleChange}
        title="수수료"
        step={1}
      />
    </div>
  );
};
