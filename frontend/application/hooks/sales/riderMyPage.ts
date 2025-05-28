import { chartData } from "@/dummyData/maPagechartData";
import { ChartKey } from "@/types/riderMyPage";
import { useState } from "react";

export const useSalesChart = () => {
  const [type, setType] = useState<ChartKey>("daily");
  const [selectedMonth, setSelectedMonth] = useState("1월");
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  const toggleDropdown = () => setShowMonthDropdown((prev) => !prev);

  const chart =
    type === "monthly" ? chartData.monthly[selectedMonth] : chartData[type];

  return {
    type,
    setType,
    selectedMonth,
    setSelectedMonth,
    showMonthDropdown,
    toggleDropdown,
    chart,
  };
};
