"use client";

import React, { useState } from "react";
import Input from "../common/input/Input";
import Layout from "../common/Layout";
import { useRouter } from "next/navigation";
import axios from "axios";

const Loginpage = () => {
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 로그인아이디 : admin 비밀번호 : admin123
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!loginId || !password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/admin/login", {
        loginId,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.accessToken);
        router.push("/reservation");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "로그인에 실패했습니다.");
      } else {
        setError("알 수 없는 에러가 발생했습니다.");
      }
    }
  };

  return (
    <Layout title="로그인">
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
