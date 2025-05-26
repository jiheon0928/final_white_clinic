import Input from "./Input";
import { useReservationStore } from "@/store/ReservationStore";
import { useApiStore } from "@/store/Api";
import { useSearchParams } from "next/navigation";

export const RevInput = () => {
  const { formData, handleChange } = useReservationStore();
  const { reservations } = useApiStore();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const reservation = reservations.find(
    (reservation) => reservation.id === Number(id)
  );

  const inputFields = [
    {
      title: "고객성함",
      name: "customer",
      placeholder: "고객성함",
      value: reservation?.customer || "",
    },
    {
      title: "연락처",
      name: "phone",
      placeholder: "연락처",
      value: reservation?.phone || "",
    },
    {
      title: "방문 주소",
      name: "address",
      placeholder: "방문 주소",
      value: reservation?.address || "",
    },
    {
      title: "고객 요청사항",
      name: "request",
      placeholder: "고객 요청사항을 입력해주세요.",
      value: reservation?.request || "",
    },
    {
      title: "기사님 전달사항",
      name: "memo",
      placeholder: "기사님 전달사항을 입력해주세요.",
      value: reservation?.memo || "",
    },
  ];

  return (
    <>
      {inputFields.map((field) => (
        <Input
          key={field.name}
          title={field.title}
          type="text"
          name={field.name}
          placeholder={field.placeholder}
          value={field.value}
          onChange={handleChange}
        />
      ))}
    </>
  );
};
