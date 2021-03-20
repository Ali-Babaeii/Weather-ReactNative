import React, { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import { View, Text,Image,TouchableOpacity,StyleSheet,ActivityIndicator } from 'react-native';
const error = require("../../assets/images/error.png");
import { colors } from "../../constants/Theme";

const styles = StyleSheet.create({
    errorConnection: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        paddingHorizontal: 12,
      },
      errorConnectionImage: { width: 200, height: 200 },
      errorConnectionTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginTop: 40,
        color: colors.primary,
      },
      errorConnectionText: {
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
        marginTop: 18,
        color: colors.primary,
      },
      tryAgainbuttonTitle: { color: "white", fontWeight: "600", fontSize: 18 }, tryAgainButton: {
        marginTop: 66,
        backgroundColor: colors.secondary,
        width: 220,
        height: 54,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
      },
});
export default function ErrorConnection ()  {

  const [visiblity,setVisiblity]=useState(true)
  useEffect(() => {
    let timer = setInterval(() => setVisiblity(false), 4000);

    return () => clearInterval(timer)
 
  }, []);
  

  if (visiblity==true){
    return(
       <View style={{justifyContent:'center',alignItems:'center',flex:1,backgroundColor:colors.secondary,opacity:0.8}}>
      <ActivityIndicator style={{alignSelf:'center'}} size="large" color={colors.white}/> 
<Text style={{color:colors.white,fontSize:16,fontWeight:'500',marginTop:14}}>please Wait...</Text>
   </View>
      )
  }

    return (
        <View style={styles.errorConnection}>
        <Image style={styles.errorConnectionImage} source={error}></Image>
        <Text style={styles.errorConnectionTitle}>
          Oops, No Internet Connection
        </Text>
        <Text style={styles.errorConnectionText}>
          Make sure wifi and cellular data is turned on and try again.
        </Text>
        <TouchableOpacity
          style={styles.tryAgainButton}
          onPress={() =>setVisiblity(true)}
        >
          <Text style={styles.tryAgainbuttonTitle}>Try Again</Text>
        </TouchableOpacity>
        </View>
    );
  }



