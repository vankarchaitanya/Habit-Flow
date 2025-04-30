// import { Link } from "expo-router";
import { useState } from "react";
import { Text, View, SafeAreaView, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
function signIn() {
  const [email, setEmail] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const handleLogin = async () => {

  }
  return (
    <SafeAreaView
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 4,
        height: "100%",
        backgroundColor: "#023047",
        gap: 15,
      }}
    >
      <Text
        style={{
          fontSize: 40,
          textAlign: "center",
          fontFamily: "WorkSans",
          fontWeight: 800,
          color: "#219ebc",
        }}
      >
        Login
      </Text>
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          fontFamily: "WorkSans",
          fontWeight: 400,
          color: "#219ebc",
        }}
      >
        Are you already user ?{" "}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <TextInput
          editable
          onChangeText={(text) => setEmail(text)}
          value={email}
          style={{
            backgroundColor: "#fff",
            width: "75%",
            height: 30,
            padding: "2%",
            borderRadius: "30px",
            marginLeft: "2%",
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "70%",
          }}
        >
          <TextInput
            editable
            onChangeText={(text) => setEmail(text)}
            value={email}
            style={{
              backgroundColor: "#fff",
              width: "150%",
              height: 30,
              padding: "2%",
              borderRadius: "30px",
            }}
          />
          <Text
            style={{
              marginLeft: "-20%",
            }}
            onPress={() => setShow(!show)}
          >
            Show
          </Text>
        </View>

        <Button title="Login" color="#219ebc" />
      </View>
    </SafeAreaView>
  );
}

export default signIn;
