import { Suspense } from "react";
import { RiderUpdate } from "@/components/riderList/riderUpdate/RiderUpdate";

const UpdatePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RiderUpdate />
    </Suspense>
  );
};

export default UpdatePage;
