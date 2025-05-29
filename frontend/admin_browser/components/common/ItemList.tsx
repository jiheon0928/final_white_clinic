"use client";
import ItemInput from "@/components/common/input/itemInput";
import useRiderStore from "@/store/rider/RiderStore";
import { useApiStore } from "@/store/Api";
import { useSearchParams } from "next/navigation";

export const ItemList = () => {
  const { formData, handleChange } = useRiderStore();
  const { reservations } = useApiStore();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const reservation = reservations.find(
    (reservation) => reservation.id === Number(id)
  );

  const items = [
    {
      name: "washer",
      title: "세탁기",
      checked: reservation?.industryId,
    },
    {
      name: "dryer",
      title: "건조기",
      checked: reservation?.industryId,
    },
  ];

  return (
    <div>
      <div className="flex gap-4">
        {items.map((item) => (
          <ItemInput
            key={item.name}
            type="checkbox"
            name="industryId"
            onChange={handleChange}
            checked={item.checked}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
};
