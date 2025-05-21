"use client";
import ItemInput from "@/components/common/input/itemInput";
import useRiderStore from "@/store/rider/RiderStore";

export const ItemList = () => {
  const { formData, handleChange } = useRiderStore();

  return (
    <div>
      <div className="flex gap-4">
        <ItemInput
          type="checkbox"
          name="washer"
          onChange={handleChange}
          checked={formData.washer}
          title="세탁기"
        />
        <ItemInput
          type="checkbox"
          name="dryer"
          onChange={handleChange}
          checked={formData.dryer}
          title="건조기"
        />
      </div>
    </div>
  );
};
