import {  Image, View,Text,SafeAreaView } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView
    style={{
      display:'flex',
      flexDirection:"column",
      justifyContent:"space-between",
      alignItems:"stretch",
      padding:20,
      height:'100%',
      backgroundColor:'#023047'
    }}
    >
      <Image source={require("../assets/images/main.png")} alt="main" 
      style={{
        width:'100%',
        height:'80%'
      }}   
      />
      <View style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:'center',
        gap:10,
        marginTop:'-20%'
      }}>
        <Text style={{
          fontSize:40,
          fontFamily:"WorkSans",
          color:'#fb8500',
          letterSpacing:1
        }}>Habit tracker</Text>
        <Text style={{
          margin:'2%',  
          fontSize:14,
          fontFamily:'WorkSans',
          color:'#fb8500'
          }}>Collect points and achievements. Marks the completion of tasks every days.</Text>
     <Link href="/auth/signIn" 
     style={{
      width:'100%',
      maxWidth:300,
      height:50,
      textAlign:'center'
    }}
     >
          <Text
          style={{
            fontSize:24,
            color:'#fb8500',
            fontFamily:'WorkSans'
          }}
          >Let's Start!</Text>
     </Link>
      </View>
     
    </SafeAreaView>
  );
}
