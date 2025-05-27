export const riderList = () => {
  const status = ["미승인", "승인"];
  const benefit = [40, 50, 55];
  const rider = [
    {
      id: 1,
      loginId: "gyghks123",
      password: "1234",
      name: "장효환",
      age: 30,
      phone: "010-1234-5678",
      address: "부산시 서구",
      email: "gyghks123@gmail.com",
      significant: "서울, 경기 및 인천지역 위주로 원함",
      benefit: benefit[0],
      approval: status[0],
    },
    {
      id: 2,
      loginId: "rhkdsud123",
      password: "5678",
      name: "이광녕",
      age: 30,
      phone: "010-4321-5678",
      address: "인천시 중구",
      email: "rhkdsud123@gmail.com",
      significant: "인천 위주이며 오후 4~5시는 가급적 피하기를 원함",
      benefit: benefit[1],
      approval: status[0],
    },
    {
      id: 3,
      loginId: "gustj123",
      password: "9876",
      name: "우현서",
      age: 30,
      phone: "010-4321-9632",
      address: "인천시 중구",
      email: "gustj123@gmail.com",
      significant: "주말 일거리 적극적으로 원함",
      benefit: benefit[2],
      approval: status[0],
    },
  ];
  return rider;
};
