import { Rider } from "@/types/RiderStore/RiderTypes";

export const RiderData = (rider: Rider) => {
  return [
    {
      title: "기사이름",
      name: "name",
      type: "text",
      placeholder: "기사님 이름 작성해주세요",
      value: rider?.name || "",
    },
    {
      title: "전화번호",
      name: "phone",
      type: "text",
      placeholder: "기사님 전화번호 작성해주세요",
      value: rider?.phone || "",
    },
    {
      title: "이메일",
      name: "email",
      type: "email",
      placeholder: "기사님 이메일 작성해주세요",
      value: rider?.email || "",
    },
    {
      title: "우편번호",
      name: "zipcode",
      type: "text",
      placeholder: "기사님 우편번호를 작성해주세요",
      value: rider?.zipcode || "",
    },
    {
      title: "주소",
      name: "address",
      type: "text",
      placeholder: "기사님 주소를 작성해주세요",
      value: rider?.address || "",
    },
    {
      title: "상세주소",
      name: "detailAddress",
      type: "text",
      placeholder: "기사님 상세주소를 작성해주세요",
      value: rider?.detailAddress || "",
    },
  ];
};
