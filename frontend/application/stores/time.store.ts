import { formatTime } from "@/app/hooks/format";
import { TimeState } from "@/types/stores";
import { create } from "zustand";

const useTimeStore = create<TimeState>((set) => ({
  time: formatTime(new Date()),
  setTime: (time: Date) => set({ time: formatTime(time) }),
  resetTime: () => set({ time: formatTime(new Date()) }),
}));

export default useTimeStore;
