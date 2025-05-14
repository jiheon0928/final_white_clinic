import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const completedData = [
  {
    id: 1,
    title: "에어컨 청소",
    location: "서울 강동구",
    price: "100,000원",
  },
  {
    id: 2,
    title: "세탁기 청소",
    location: "경기 수원시",
    price: "90,000원",
  },
];

const CompletedPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>완료</Text>
      {completedData.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          activeOpacity={0.7}
          onPress={() => {
            router.push({
              pathname: "/completed/[id]",
              params: { id: String(item.id) },
            });
          }}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.location}>{item.location}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingTop: 32,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    width: 180,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#222",
  },
  location: {
    color: "#ff4d4d",
    fontSize: 14,
    marginBottom: 4,
  },
  price: {
    color: "#2196f3",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default CompletedPage;
