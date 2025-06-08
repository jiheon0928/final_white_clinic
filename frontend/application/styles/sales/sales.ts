import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  tabButton: {
    paddingBottom: 10,
    marginBottom: 40,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: "#3f51b5",
  },
  chartStyle: {
    marginVertical: 12,
    borderRadius: 16,
    alignSelf: "center",
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
  monthTitleContainer: {
    position: "relative",
    marginVertical: 8,
    alignItems: "center",
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
    backgroundColor: "#3f51b5",
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 30,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3f51b5",
  },
});
