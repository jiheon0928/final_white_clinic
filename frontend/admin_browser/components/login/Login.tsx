"use client";
import { useLoginStore } from "@/store/Login";
import React from "react";
import Input from "../common/input/Input";
import Layout from "../common/Layout";

const Loginpage = () => {
  const { formData, handleChange, handleSubmit } = useLoginStore();

  return (
    <Layout title="로그인">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          name="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
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
