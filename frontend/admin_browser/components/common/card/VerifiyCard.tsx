"use client";
import { useApiStore } from "@/store/Api";
import Button from "../Button";
import { useEffect } from "react";

export const VerifyCard = () => {
  const { riders, getRiders, updateRiderBenefit, updateRiderApproval } =
    useApiStore();

  useEffect(() => {
    getRiders();
  }, [getRiders]);

  return (
    <div className="space-y-4">
      {riders.map((verification) => (
        <div
          key={verification.id}
          className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">이름</span>
              <span className="font-semibold text-gray-900">
                {verification.name}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">이메일</span>
              <span className="font-semibold text-gray-900">
                {verification.email}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">연락처</span>
              <span className="font-semibold text-gray-900">
                {verification.phone}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">주소</span>
              <span className="font-semibold text-gray-900">
                {verification.address}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">수수료</span>
              <select
                className="font-semibold text-gray-900 border rounded p-1"
                value={verification.benefit || 40}
                onChange={(e) => {
                  const newBenefit = parseInt(e.target.value);
                  updateRiderBenefit(verification.id, newBenefit);
                }}
              >
                <option value={40}>40%</option>
                <option value={50}>50%</option>
                <option value={55}>55%</option>
              </select>
            </div>
          </div>
          {verification.approval === false && (
            <div className="flex justify-end mt-4">
              <Button
                title="승인하기"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                onClick={() => updateRiderApproval(verification.id)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
