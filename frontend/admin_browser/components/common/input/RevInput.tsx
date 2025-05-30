import { useApiStore } from "@/store/Api";
import Input from "./Input";
import { useReservationStore } from "@/store/ReservationStore";

export const RevUpdateInput = ({ id }: { id: number }) => {
  const { reservations } = useApiStore();
  const { handleChange } = useReservationStore();

  const reservation = reservations.find((r) => r.id === Number(id));
  if (!reservation) return <div>예약 정보를 불러올 수 없습니다.</div>;

  const inputFields = [
    {
      title: "수리건",
      name: "reservationName",
      placeholder: "수리건",
      value: reservation.reservationName || "",
    },
    {
      title: "고객 이름",
      name: "customerName",
      placeholder: "고객 이름",
      value: reservation.customerName || "",
    },
    {
      title: "고객 전화번호",
      name: "customerPhone",
      placeholder: "고객 전화번호",
      value: reservation.customerPhone || "",
    },
    {
      title: "방문 주소",
      name: "address",
      placeholder: "방문 주소",
      value: reservation.address || "",
    },
    {
      title: "상세주소",
      name: "detailAddress",
      placeholder: "상세주소",
      value: reservation.detailAddress || "",
    },
    {
      title: "우편번호",
      name: "zipcode",
      placeholder: "우편번호",
      value: reservation.zipcode || "",
    },
    {
      title: "고객 요청사항",
      name: "customerRequest",
      placeholder: "고객 요청사항을 입력해주세요.",
      value: reservation.customerRequest || "",
    },
    {
      title: "기사님 전달사항",
      name: "memo",
      placeholder: "기사님 전달사항을 입력해주세요.",
      value: reservation.memo || "",
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
