"use client";
import { useRouter } from "next/navigation";
import Button from "../common/Button";
import { RiderCard } from "../common/card/RiderCard";
import { SearchInput } from "../common/input/SearchInput";
import Layout from "../common/Layout";

export const RiderList = () => {
  const router = useRouter();
  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <Layout title="기사님 상세정보 & 목록">
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
    </Layout>
  );
};

export default RiderList;
