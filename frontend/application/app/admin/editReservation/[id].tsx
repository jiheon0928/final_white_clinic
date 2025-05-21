import EditReservationPage from "@/components/admin/editReservation/EditReservationPage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const EditReservationScreen = () => {
  return (
    <>
      <EditReservationPage></EditReservationPage>
    </>
  );
};

export default EditReservationScreen;
