import { View } from "react-native";

type StatusPillProps = {
  status: string;
  position?: "absolute";
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

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
      style={{
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: getStatusColor(status),
        position: position,
        top: top,
        right: right,
        bottom: bottom,
        left: left,
      }}
    />
  );
};

const getStatusColor = (status: string) => {
  if (status === "대기") {
    return "#4299e1";
  } else if (status === "진행") {
    return "#48bb78";
  } else if (status === "완료") {
    return "#a0aec0";
  }
};

export default StatusPill;
