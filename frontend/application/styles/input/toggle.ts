import { StyleSheet } from "react-native";

export const toggleInputStyles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    marginLeft: 8,
    marginBottom: 6,
    fontWeight: "bold",
  },
  dropdownContainer: {
    position: "relative", // dropdownBox 기준이 되는 부모
  },
  buttonBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    width: "100%",
  },
  buttonText: {
    fontSize: 15,
  },
  dropdownBox: {
    position: "absolute", // ✅ 절대 위치
    top: "100%", // 버튼 바로 아래
    left: 0,
    right: 0,
    marginTop: 4,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 3,
    zIndex: 999,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  dropdownText: {
    fontSize: 15,
  },
});
