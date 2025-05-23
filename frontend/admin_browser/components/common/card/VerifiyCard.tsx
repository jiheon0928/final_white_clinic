import { riderList } from "@/data/data";

export const VerifyCard = () => {
  const verificationList = riderList();

  return (
    <div className="space-y-4">
      {verificationList.map((verification) => (
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
              <span className="font-semibold text-gray-900">
                {verification.benefit}%
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">상태</span>
              <span className="font-semibold text-gray-900">
                {verification.approval}
              </span>
            </div>
          </div>
          {verification.approval === "미승인" && (
            <div className="flex justify-end mt-4">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
                승인하기
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
