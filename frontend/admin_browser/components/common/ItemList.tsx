"use client";
import ItemInput from "@/components/common/input/itemInput";
import useRiderStore from "@/store/rider/RiderStore";

export const ItemList = () => {
  const { formData, handleChange } = useRiderStore();

  const items = [
    {
      name: "washer",
      title: "세탁기",
      industryIds: 1,
      checked: formData.industryIds === 1,
    },
    {
      name: "dryer",
      title: "건조기",
      industryIds: 2,
      checked: formData.industryIds === 2,
    },
  ];

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const industryIds = e.target.name === "washer" ? 1 : 2;
    handleChange({
      target: {
        name: "industryIds",
        value: industryIds,
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
