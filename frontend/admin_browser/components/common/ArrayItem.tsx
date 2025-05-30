"use client";
import ItemInput from "@/components/common/input/itemInput";
import useRiderStore from "@/store/rider/RiderStore";

export const ArrayItem = () => {
  const { formData, handleChange } = useRiderStore();

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
    let industryId: number | undefined;
    if (e.target.name === "washer") industryId = 1;
    else if (e.target.name === "dryer") industryId = 2;
    if (industryId === undefined) {
      console.warn("❌ 잘못된 name입니다:", e.target.name);
      return;
    }
    const newIndustryIds = e.target.checked
      ? Array.from(new Set([...formData.industryIds, industryId])).filter(
          (id): id is number => typeof id === "number" && !isNaN(id)
        )
      : formData.industryIds.filter((id) => id !== industryId);

    handleChange({
      target: {
        name: "industryIds",
        value: newIndustryIds,
      },
    } as any);
  };

  console.log("industryIds :", formData.industryIds);

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
