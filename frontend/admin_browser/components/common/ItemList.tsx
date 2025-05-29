"use client";
import ItemInput from "@/components/common/input/itemInput";
import useRiderStore from "@/store/rider/RiderStore";
import { useApiStore } from "@/store/Api";
import { useSearchParams } from "next/navigation";

export const ItemList = () => {
  const { formData, handleChange } = useRiderStore();
  const { riders } = useApiStore();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const rider = riders.find((rider) => rider.id === Number(id));

  const items = [
    {
      name: "washer",
      title: "세탁기",
      checked: formData.industryIds.includes(1),
    },
    {
      name: "dryer",
      title: "건조기",
      checked: formData.industryIds.includes(2),
    },
  ];

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const industryId = e.target.name === "washer" ? 1 : 2;
    const newIndustryIds = e.target.checked
      ? [...formData.industryIds, industryId]
      : formData.industryIds.filter((id) => id !== industryId);

    handleChange({
      target: {
        name: "industryIds",
        value: newIndustryIds,
      },
    } as any);
  };

  return (
    <div>
      <div className="flex gap-4">
        {items.map((item) => (
          <ItemInput
            key={item.name}
            type="checkbox"
            name={item.name}
            onChange={handleItemChange}
            checked={item.checked}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
};
