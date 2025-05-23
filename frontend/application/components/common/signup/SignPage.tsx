import { ScrollView } from "react-native";
import Input from "../input/Input";
import BackBtnHeader from "../header/BackBtnHeader";
import AddressInput from "../input/AddressInput";
import Page from "../Page";
import CheckBoxBundle from "../input/CheckBoxBundle";
import useSignupStore from "@/stores/signup.store";
import DefaultBtn from "../button/DefualtBtn";
import { router } from "expo-router";
import useIndustryStore from "@/stores/industry.store";

const SignPage = () => {
  const { user, setUserField } = useSignupStore();
  const { selected, toggle } = useIndustryStore();

  const signupInputFields = [
    { title: "이름", key: "name" },
    { title: "전화번호", key: "phone" },
    { title: "이메일", key: "email" },
  ] as const;

  return (
    <Page>
      <ScrollView>
        <BackBtnHeader title="회원가입" />
        {signupInputFields.map(({ title, key }) => (
          <Input
            key={key}
            title={title}
            value={user[key]}
            onChangeText={(text) => setUserField(key, text)}
          />
        ))}

        <CheckBoxBundle
          ACvalue={selected.includes("에어컨")}
          WSvalue={selected.includes("세탁기")}
          onValueChangAC={(val) => toggle("에어컨", val)}
          onValueChangeWS={(val) => toggle("세탁기", val)}
        />
        <DefaultBtn text="완료" onPress={() => router.replace("/")} />
      </ScrollView>
    </Page>
  );
};

export default SignPage;
