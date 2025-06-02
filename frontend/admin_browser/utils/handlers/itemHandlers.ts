import { ChangeEvent } from "react";
import { Item } from "@/types/ComponentProps";

export const handleItemChange = (
  e: ChangeEvent<HTMLInputElement>,
  formData: { industry: number[] },
  handleChange: (e: any) => void
) => {
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

export const handleNumItemChange = (
  e: ChangeEvent<HTMLInputElement>,
  items: Item[],
  handleChange: (e: any) => void
) => {
  const selectedItem = items.find((item) => item.name === e.target.name);
  if (!selectedItem) {
    console.warn("❌ 잘못된 name입니다:", e.target.name);
    return;
  }
  const industry = selectedItem.id;
  handleChange({
    target: {
      name: "industry",
      value: industry,
    },
  } as any);
};
