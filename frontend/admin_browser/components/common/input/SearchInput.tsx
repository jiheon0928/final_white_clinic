import Input from "./Input";
import { useRiderSearchStore } from "@/store/rider/SearchRider";

export const SearchInput = () => {
  const { search, setSearch } = useRiderSearchStore();
  return (
    <>
      <Input
        type="search"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 기사님 이름 또는 전화번호로 검색"
        className="w-full md:w-1/2 border border-gray-300 rounded-md p-2 mx-auto"
      />
    </>
  );
};
