import useRiderStore from "@/store/rider/RiderStore";
import { RiderData } from "@/types/RiderStore/RiderTypes";

export const RidersData = (rider: RiderData) => {
  const { riderData } = useRiderStore();
  return [
    {
      title: "기사이름",
      name: "name",
      type: "text",
      placeholder: "기사님 이름 작성해주세요",
      value: riderData.name || rider.name || "",
    },
    {
      title: "전화번호",
      name: "phone",
      type: "text",
      placeholder: "기사님 전화번호 작성해주세요",
      value: riderData.phone || rider.phone || "",
    },
    {
      title: "이메일",
      name: "email",
      type: "email",
      placeholder: "기사님 이메일 작성해주세요",
      value: riderData.email || rider.email || "",
    },
    {
      title: "우편번호",
      name: "zipcode",
      type: "text",
      placeholder: "기사님 우편번호를 작성해주세요",
      value: riderData.zipcode || rider.zipcode || "",
    },
    {
      title: "주소",
      name: "address",
      type: "text",
      placeholder: "기사님 주소를 작성해주세요",
      value: riderData.address || rider.address || "",
    },
    {
      title: "상세주소",
      name: "detailAddress",
      type: "text",
      placeholder: "기사님 상세주소를 작성해주세요",
      value: riderData.detailAddress || rider.detailAddress || "",
    },
  ];
};
