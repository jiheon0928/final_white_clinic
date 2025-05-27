import { formatTime } from "@/app/hooks/input";
import { create } from "zustand";

type TimeState = {
  time: string;
  setTime: (time: string) => void;
  resetTime: () => void;
};

const useTimeStore = create<TimeState>((set) => ({
  time: formatTime(new Date()),
  setTime: (time: string) => set({ time }),
  resetTime: () => set({ time: new Date().toISOString().split("T")[1] }),
}));

export default useTimeStore;
