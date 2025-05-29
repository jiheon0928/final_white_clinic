import Input from "./Input";
import { useReservationStore } from "@/store/ReservationStore";

export const RevInput = () => {
  const { formData, handleChange } = useReservationStore();

  const inputFields = [
    {
      title: "예약자 이름",
      name: "reservationName",
      placeholder: "예약자 이름",
      value: formData.reservationName,
    },
    {
      title: "연락처",
      name: "customerPhone",
      placeholder: "연락처",
      value: formData.customerPhone,
    },
    {
      title: "방문 주소",
      name: "address",
      placeholder: "방문 주소",
      value: formData.address,
    },
    {
      title: "상세주소",
      name: "detailAddress",
      placeholder: "상세주소",
      value: formData.detailAddress,
    },
    {
      title: "우편번호",
      name: "zipcode",
      placeholder: "우편번호",
      value: formData.zipcode,
    },
    {
      title: "고객 요청사항",
      name: "customerRequest",
      placeholder: "고객 요청사항을 입력해주세요.",
      value: formData.customerRequest,
    },
    {
      title: "기사님 전달사항",
      name: "memo",
      placeholder: "기사님 전달사항을 입력해주세요.",
      value: formData.memo,
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
