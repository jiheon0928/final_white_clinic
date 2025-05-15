import { verificationPending } from "@/data/data";

export const Verification = () => {
  const verificationList = verificationPending();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          회원가입 인증 대기 목록
        </h1>
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
                    {verification.status}
                  </span>
                </div>
              </div>
              {verification.status[0] && (
                <div className="flex justify-end mt-4">
                  <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
                    인증하기
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Verification;
