"use client";
import ItemInput from "@/components/common/input/itemInput";
import useRiderStore from "@/store/rider/RiderStore";

export const ArrayItem = () => {
  const { formData, handleChange } = useRiderStore();

  const items = [
    {
      name: "washer",
      title: "세탁기",
      checked: formData.industry.includes(1),
    },
    {
      name: "dryer",
      title: "건조기",
      checked: formData.industry.includes(2),
    },
  ];

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let industry: number | undefined;
    if (e.target.name === "washer") industry = 1;
    else if (e.target.name === "dryer") industry = 2;
    if (industry === undefined) {
      console.warn("❌ 잘못된 name입니다:", e.target.name);
      return;
    }
    const newIndustry = e.target.checked
      ? Array.from(new Set([...formData.industry, industry])).filter(
          (id): id is number => typeof id === "number" && !isNaN(id)
        )
      : formData.industry.filter((id) => id !== industry);

    handleChange({
      target: {
        name: "industry",
        value: newIndustry,
      },
    } as any);
  };

  console.log("industry :", formData.industry);

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
