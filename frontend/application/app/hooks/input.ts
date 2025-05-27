import useDateStore from "@/stores/calender.store";

export const formatTime = (d: Date) =>
  `${String(new Date().getHours()).padStart(2, "0")}:${String(
    new Date().getMinutes()
  ).padStart(2, "0")}`;

export const updateDateWithoutTime = (d: Date) => {
  const { setDate } = useDateStore.getState();
  const formatted = stripTimeFromDate(d);
  setDate(formatted.toISOString().split("T")[0]);
};
const stripTimeFromDate = (d: Date): Date => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return new Date(`${yyyy}-${mm}-${dd}`);
};
