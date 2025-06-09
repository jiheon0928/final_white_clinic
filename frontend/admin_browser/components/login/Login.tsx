"use client";

import React from "react";
import Input from "../common/input/Input";
import Layout from "../common/Layout";
import { useRouter } from "next/navigation";
import { useLoginStore } from "@/store/Login";

const Loginpage = () => {
  const router = useRouter();
  const { loginId, password, setLoginId, setPassword, login } = useLoginStore();
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login();
      alert("로그인 성공");
      router.push("/reservation");
    } catch (err: any) {
      setError(err.message || "로그인에 실패했습니다.");
    }
  };

  return (
    <Layout title="로그인" className="h-screen">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="loginId"
          placeholder="아이디"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <button
          type="submit"
          className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
        >
          로그인
        </button>
      </form>
    </Layout>
  );
};

export default Loginpage;
