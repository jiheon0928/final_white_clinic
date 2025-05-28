import { StyleSheet } from "react-native";

export const riderMyPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 16,
  },
  chartMainTitle: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    padding: 16,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 12,
    padding: 8,
  },
  tabButton: {
    paddingBottom: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: "#222",
  },

  monthTitleContainer: {
    position: "relative",
    marginVertical: 8,
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  currencyUnitLayout: {
    position: "relative",
  },
  currencyUnit: {
    position: "absolute",
    left: -3,
    fontSize: 12,
    top: 6,
  },

  monthToggleSmall: {
    position: "absolute",
    right: 16,
    top: -3,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  dropdownOverlay: {
    position: "absolute",
    top: 28,
    right: 16,
    zIndex: 1000,
  },
  monthDropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 6,
    backgroundColor: "#fff",
  },
  monthDropdownItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  activeMonthItem: {
    backgroundColor: "#222",
  },
});
