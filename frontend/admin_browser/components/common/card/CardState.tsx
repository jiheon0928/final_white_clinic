"use client";
import { useRouter } from "next/navigation";
import Button from "../Button";

export const CardState = () => {
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push(path);
  };
  return (
    <div className="flex space-x-4">
      <Button
        title="예약현황"
        onClick={() => handleClick("/reservation")}
        className="bg-blue-400 hover:bg-blue-600"
      />
      <Button
        title="기사현황"
        onClick={() => handleClick("/rider")}
        className="bg-blue-400 hover:bg-blue-600"
      />
      <Button
        title="매출현황"
        onClick={() => handleClick("/sales")}
        className="bg-blue-400 hover:bg-blue-600"
      />
    </div>
  );
};
