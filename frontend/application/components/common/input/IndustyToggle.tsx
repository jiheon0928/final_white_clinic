import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useReservationStore from "@/stores/reservation.store";
import { IndustryToggleStyles } from "@/styles/input/industryInput";
import Title from "../text/Title";

const options = ["에어컨", "세탁기", "건조기"];

const IndustryToggle = () => {
  const { setReservationField } = useReservationStore();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View>
      <Title title="품목" />
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            IndustryToggleStyles.option,
            selected === option && IndustryToggleStyles.selectedOption,
          ]}
          onPress={() => {
            setSelected(option);
            if (option === "에어컨") {
              setReservationField("industry", 1);
            } else if (option === "세탁기") {
              setReservationField("industry", 2);
            } else {
              setReservationField("industry", 3);
            }
          }}
        >
          <Text
            style={
              selected === option
                ? IndustryToggleStyles.selectedText
                : IndustryToggleStyles.text
            }
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default IndustryToggle;
