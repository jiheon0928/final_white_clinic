import { VerifyCard } from "../common/card/VerifiyCard";

export const Verification = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          회원가입 인증 대기 목록
        </h1>
        <VerifyCard />
      </div>
    </div>
  );
};

export default Verification;
