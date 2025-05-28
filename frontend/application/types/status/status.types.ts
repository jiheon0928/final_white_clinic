export type StatusType = "대기" | "진행" | "완료";
export type StatusPillProps = {
  status: StatusType;
  position?: "absolute";
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};
