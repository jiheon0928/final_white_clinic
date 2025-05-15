export const ReservationUpdate = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-8 text-blue-600">
        예약 수정하기
      </h1>
      <form className="space-y-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-gray-700 font-semibold">
            고객성함
          </label>
          <input
            type="text"
            id="name"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-gray-700 font-semibold">
            연락처
          </label>
          <input
            type="text"
            id="phone"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="text-gray-700 font-semibold">
            방문 주소
          </label>
          <input
            type="text"
            id="address"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="item" className="text-gray-700 font-semibold">
            고객 요청사항
          </label>
          <textarea
            id="item"
            rows={4}
            placeholder="고객 요청사항을 입력해주세요."
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="item" className="text-gray-700 font-semibold">
            수리 물품
          </label>
          <div className="flex gap-4 text-gray-600 font-semibold">
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
          <label htmlFor="date" className="text-gray-700 font-semibold">
            방문 날짜
          </label>
          <input
            type="date"
            id="date"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="time" className="text-gray-700 font-semibold">
            방문 시간
          </label>
          <input
            type="time"
            id="time"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="manager" className="text-gray-700 font-semibold">
            담당 기사
          </label>
          <select
            id="manager"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
          >
            <option value="">기사님 선택</option>
            <option value="1">장효환</option>
            <option value="2">이광녕</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-gray-700 font-semibold">
            기사님 전달사항
          </label>
          <textarea
            id="message"
            rows={4}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
            placeholder="기사님 전달사항을 입력해주세요."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="text-gray-700 font-semibold">
            발생 비용
          </label>
          <div className="relative">
            <input
              type="number"
              id="price"
              step={1000}
              className="relative border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 w-1/4 pr-8"
              min="0"
            />
            <span className="absolute left-33 top-1/2 transform -translate-y-1/2 text-gray-600">
              원
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors font-semibold mt-4"
        >
          예약 수정
        </button>
      </form>
    </div>
  );
};
