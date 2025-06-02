"use client";
import { useRouter } from "next/navigation";
import Button from "../common/Button";
import { RiderCard } from "../common/card/RiderCard";
import { SearchInput } from "../common/input/SearchInput";
import Layout from "../common/Layout";
import { useApiStore } from "@/store/Api";

export const RiderList = () => {
  const router = useRouter();
  const { isLoading, error } = useApiStore();

  const handleClick = (path: string) => {
    router.push(path);
  };

  if (isLoading) {
    return (
      <Layout title="기사님 상세정보 & 목록">
        <div className="flex justify-center items-center h-64">
          <p>로딩 중...</p>
        </div>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout title="기사님 상세정보 & 목록">
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">에러가 발생했습니다: {error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="기사님 상세정보 & 목록">
      <div className="flex justify-end gap-2 mb-4">
        <Button
          title="회원가입 인증 대기"
          onClick={() => handleClick("/verify")}
          className="bg-blue-500 hover:bg-blue-600"
        />
      </div>
      <SearchInput />
      <RiderCard />
    </Layout>
  );
};

export default RiderList;
