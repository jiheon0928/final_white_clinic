"use client";
import ItemInput from "@/components/common/input/itemInput";
import useRiderStore from "@/store/rider/RiderStore";
import { ItemListData } from "@/data/ItemListData";
import { handleItemChange } from "@/utils/handlers/itemHandlers";

  export const ArrayItem = () => {
    const { riderData, handleChange } = useRiderStore();

  return (
    <div>
      <div className="flex gap-4">
        {ItemListData().map((item) => (
          <ItemInput
            key={item.name}
            type="checkbox"
            name={item.name}
            onChange={(e) => handleItemChange(e, riderData, handleChange)}
            checked={item.checked}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
};
