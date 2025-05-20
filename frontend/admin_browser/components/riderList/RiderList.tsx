"use client";
import { useRouter } from "next/navigation";
import Button from "../common/Button";
import { RiderCard } from "../common/card/RiderCard";
import { SearchInput } from "../common/input/SearchInput";

export const RiderList = () => {
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4 text-black">
      <h1 className="flex justify-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        기사님 상세정보 & 목록
      </h1>
      <div className="flex justify-between gap-2 mb-4">
        <Button
          title="회원가입 인증 대기"
          onClick={() => handleClick("/verify")}
          className="bg-blue-500 hover:bg-blue-600"
        />
        <Button
          title="기사 등록"
          onClick={() => handleClick("/rider/enroll")}
          className="bg-blue-500 hover:bg-blue-600"
        />
      </div>
      <SearchInput />
      <RiderCard />
    </div>
  );
};

export default RiderList;
