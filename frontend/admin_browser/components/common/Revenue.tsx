import Benefit from "@/components/common/input/benefit";
import useRiderStore from "@/store/rider/RiderStore";

export const Revenue = () => {
  const { riderData, handleChange } = useRiderStore();
  console.log(riderData.benefit);

  return (
    <div>
      <Benefit
        value={riderData.benefit}
        onChange={(e) => {
          handleChange(e as unknown as React.ChangeEvent<HTMLTextAreaElement>);
        }}
      />
    </div>
  );
};
