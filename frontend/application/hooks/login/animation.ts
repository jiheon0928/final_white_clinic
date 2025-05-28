import { useEffect, useRef } from "react";
import { Animated, Dimensions } from "react-native";

const { height } = Dimensions.get("window");
const LOGO_SIZE = 170;
const initialLogoY = height / 2 - LOGO_SIZE / 2;
export function useLoginAnimation(isReady: boolean) {
  const logoPosition = useRef(new Animated.Value(initialLogoY)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (isReady) {
      Animated.sequence([
        Animated.delay(500),
        Animated.stagger(600, [
          Animated.timing(logoPosition, {
            toValue: initialLogoY - 250,
            duration: 800,
            useNativeDriver: false,
          }),
          Animated.timing(formOpacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, [isReady]);
  return { logoPosition, formOpacity };
}
