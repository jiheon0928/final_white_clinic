import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export const useSplashReady = () => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      await new Promise((res) => setTimeout(res, 500));
      setIsReady(true);
      SplashScreen.hideAsync();
    };
    prepare();
  }, []);
  return isReady;
};
