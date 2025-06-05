import useRiderStore from "@/store/rider/RiderStore";

export const ItemListData = () => {
  const { formData } = useRiderStore();

  return [
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
};
