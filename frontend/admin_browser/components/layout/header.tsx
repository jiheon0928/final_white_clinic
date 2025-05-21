"use client";
import React from "react";
import { CardState } from "../common/card/CardState";
import { Logo } from "../common/Logo";

export const Header = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-white">
      <div className="flex items-center justify-between h-16 max-w-5xl mx-auto">
        <Logo />
        <CardState />
      </div>
    </div>
  );
};
