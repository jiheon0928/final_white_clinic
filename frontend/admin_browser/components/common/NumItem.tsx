import { useReservationStore } from "@/store/ReservationStore";
import ItemInput from "./input/itemInput";
import { handleNumItemChange } from "@/utils/handlers/itemHandlers";

export const NumItem = () => {
  const { formData, handleChange } = useReservationStore();
  const items = [
    { name: "washer", title: "세탁기", id: 1 },
    { name: "dryer", title: "건조기", id: 2 },
  ];

  return (
    <div className="flex gap-4">
      {items.map((item) => (
        <ItemInput
          key={item.name}
          type="checkbox"
          name={item.name}
          onChange={(e) => handleNumItemChange(e, items, handleChange)}
          checked={formData.industry === item.id}
          title={item.title}
        />
      ))}
    </div>
  );
};
