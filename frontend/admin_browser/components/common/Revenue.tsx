import Benefit from "@/components/common/input/benefit";
import useRiderStore from "@/store/rider/RiderStore";

export const Revenue = () => {
  const { riderData, handleChange } = useRiderStore();
  console.log(riderData.benefit);

  return (
    <div>
      <Benefit
        type="number"
        name="benefit"
        value={riderData.benefit || 1}
        onChange={handleChange}
        title="수수료"
        step={1}
      />
    </div>
  );
};
