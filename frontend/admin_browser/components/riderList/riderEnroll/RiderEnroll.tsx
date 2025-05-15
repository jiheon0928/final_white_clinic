export const RiderEnroll = () => {
  return (
    <div
      id="enroll"
      className="flex flex-col gap-4 bg-white p-8 rounded-lg text-black shadow-lg max-w-2xl mx-auto"
    >
      <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        기사 등록
      </h1>
      <form className="space-y-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-gray-700 font-semibold">
            이름
          </label>
          <input
            type="text"
            id="name"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="text-gray-700 font-semibold">
            생년월일
          </label>
          <input
            type="date"
            id="date"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-gray-700 font-semibold">
            전화번호
          </label>
          <input
            type="text"
            id="phone"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-gray-700 font-semibold">
            이메일
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="text-gray-700 font-semibold">
            거주 지역
          </label>
          <input
            type="text"
            id="address"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">
            가능 품목 리스트
          </label>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span>세탁기</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span>건조기</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="notes" className="text-gray-700 font-semibold">
            특이사항
          </label>
          <textarea
            id="notes"
            rows={4}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="기사님의 특이사항이나 추가 정보를 입력해주세요."
          />
        </div>
        <div className="flex flex-col gap-2 max-w-xs">
          <label htmlFor="benefit" className="text-gray-700 font-semibold">
            수수료 (%)
          </label>
          <input
            type="number"
            id="benefit"
            step="10"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors font-semibold mt-4"
        >
          등록하기
        </button>
      </form>
    </div>
  );
};
