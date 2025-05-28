import { statusPillStyles } from "@/styles/status/statusPillStyle";
import { StatusPillProps, StatusType } from "@/types/status";
import { View } from "react-native";

const StatusPill = ({
  status,
  top,
  right,
  bottom,
  left,
  position,
}: StatusPillProps) => {
  return (
    <View
      style={[
        statusPillStyles.base,
        {
          backgroundColor: getStatusColor(status),
          position,
          top,
          right,
          bottom,
          left,
        },
      ]}
    />
  );
};

const getStatusColor = (status: StatusType) => {
  if (status === "대기") return "#4299e1";
  if (status === "진행") return "#48bb78";
  if (status === "완료") return "#a0aec0";
  return "#000";
};

export default StatusPill;
