import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { fetchData } from "../redux/actions";
import ErrorConnection from '../components/ErrorConnection/index.js'

const MainImage = require("../assets/images/main.png");
export default function App() {
  const isLoading = useSelector((state) => state.fetchDataReducer.isLoading);
  const data = useSelector((state) => state.fetchDataReducer.data);

  const [age, setAge] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const showData = () => {
    axios({
      method: "get",
      url:
        "https://api.mocki.io/v1/b043df5a",
      responseType: "json",
      headers: {},
    })
      .then(function (response) {
        // console.log("Response Data: ", response.data);
        setAge(response.data[2].city)
      })
      .catch(function (error) {
        console.log("Error Response: ", error.response);
      });
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("STORAGE_KEY",JSON.stringify(age))
      alert('Data successfully saved')
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert("Storage successfully cleared!");
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };

  const readData = async () => {
    try {
      const userAge = await AsyncStorage.getItem("STORAGE_KEY")
      if (userAge !== null) {
  const sendData=JSON.parse(userAge)

dispatch(fetchData(null,null,sendData))  
    }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

 


  useEffect(() => {
    // let timer = setInterval(() => console.log('fire!'), 4000);

    // return () => clearInterval(timer)
    // dispatch(fetchData());
    // console.log(data)
    // showData()
// saveData();
readData();
    // readData()
  }, []);

 

  // if (isLoading == true || data=="" )
  //   return (
  //     <ErrorConnection></ErrorConnection>
  //     // <ActivityIndicator
  //     //   style={{ alignSelf: "center" }}
  //     //   size="large"
  //     //   color="red"
        
  //     // />
  //   );

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={MainImage}></Image>
      <Text>{age}</Text>
{/* <Text>{age}</Text> */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("HomeScreen")}
        // onPress={()=> console.log(data)}
      >
        <Text style={styles.text}>EXPLORE</Text>
      </TouchableOpacity>

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5D50FE",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    position: "absolute",
    marginBottom: 32,
    bottom: 0,
    backgroundColor: "white",
    width: 220,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  text: { color: "#130E51", fontWeight: "bold", fontSize: 16 },
  image: {
    width: "100%",
    height: "90%",
    position: "absolute",
    bottom: 0,
  },
});
