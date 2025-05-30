import ItemInput from "./input/itemInput";
import { useReservationStore } from "@/store/ReservationStore";

export const NumItem = () => {
  const { formData, handleChange } = useReservationStore();
  const items = [
    { name: "washer", title: "세탁기", id: 1 },
    { name: "dryer", title: "건조기", id: 2 },
  ];

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedItem = items.find((item) => item.name === e.target.name);
    if (!selectedItem) {
      console.warn("❌ 잘못된 name입니다:", e.target.name);
      return;
    }
    const industryId = selectedItem.id;
    // 항상 industryId를 덮어쓰기 (해제 불가)
    handleChange({
      target: {
        name: "industryId",
        value: industryId,
      },
    } as any);
  };
  console.log(formData.industryId);
  return (
    <div className="flex gap-4">
      {items.map((item) => (
        <ItemInput
          key={item.name}
          type="checkbox"
          name={item.name}
          onChange={handleItemChange}
          checked={formData.industryId === item.id}
          title={item.title}
        />
      ))}
    </div>
  );
};
