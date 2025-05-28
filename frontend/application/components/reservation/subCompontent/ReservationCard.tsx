import Info from "@/components/common/text/Info";
import StatusPill from "@/components/common/StatusPill";
import Title from "@/components/common/text/Title";
import Card from "@/components/common/box/Card";
import { CardSectionProps } from "@/types/reservations";
const ReservationCard = ({
  title,
  address,
  price,
  status,
  goToLink,
}: CardSectionProps) => {
  return (
    <Card btnName="상세 정보" pressBtn={goToLink}>
      <Title title={title} />
      <Info value={address} category="주소" />
      <Info value={price.toString()} category="가격" />
      <StatusPill status={status} position="absolute" bottom={20} right={20} />
    </Card>
  );
};
export default ReservationCard;
