import useRiderStore from "@/store/rider/RiderStore";

export const ItemListData = () => {
  const { riderData } = useRiderStore();

  return [
    {
      name: "airConditioner",
      title: "에어컨",
      checked: riderData.industry.includes(1),
    },
    {
      name: "washer",
      title: "세탁기",
      checked: riderData.industry.includes(2),
    },
    {
      name: "dryer",
      title: "건조기",
      checked: riderData.industry.includes(3),
    },
  ];
};
