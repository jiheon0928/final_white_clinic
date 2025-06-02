import { Rider } from "@/types/RiderStore/RiderTypes";
import Button from "../Button";

export const RiderErrorMessage = ({
  isLoading,
  error,
  getRiders,
  riders,
}: {
  isLoading: boolean;
  error: string;
  getRiders: () => void;
  riders: Rider[];
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        <p>데이터를 불러오는데 실패했습니다.</p>
        <p className="text-sm">{error}</p>
        <Button
          title="다시 시도"
          onClick={() => getRiders()}
          className="mt-2 bg-blue-500 hover:bg-blue-600"
        />
      </div>
    );
  }
  if (riders.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">기사가 없습니다.</div>
    );
  }

  return null;
};
