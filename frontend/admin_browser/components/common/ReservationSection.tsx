import { CustomerSection } from "@/types/RevStore/ReservationTypes";

export const ReservationSection = ({ title, items }: CustomerSection) => (
  <div className="bg-gray-50 p-6 rounded-lg">
    <h2 className="text-xl font-semibold text-blue-600 mb-4 border-b pb-2">
      {title}
    </h2>
    <div
      className={
        title === "예약 정보"
          ? "grid grid-cols-1 md:grid-cols-2 gap-4"
          : "space-y-3"
      }
    >
      {items.map((item) => (
        <p
          key={item.label}
          className={`flex items-center ${
            item.isHighlighted ? "text-blue-600 font-semibold" : "text-gray-700"
          }`}
        >
          <span className="font-medium mr-2">{item.label}:</span> {item.value}
        </p>
      ))}
    </div>
  </div>
);
