import { VerifyCard } from "../common/card/VerifiyCard";
import Layout from "../common/Layout";

export const Verification = () => {
  return (
    <Layout title="회원가입 인증 대기" className="h-screen">
      <VerifyCard />
    </Layout>
  );
};

export default Verification;
