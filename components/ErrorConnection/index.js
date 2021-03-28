import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
const error = require("../../assets/images/error.png");
import { colors } from "../../constants/Theme";

export default function ErrorConnection() {
  const [loadingVisiblity, setLoadingVisibility] = useState(true);
  useEffect(() => {
    let timer = setInterval(() => setLoadingVisibility(false), 8000);

    return () => clearInterval(timer);
  }, []);

  if (loadingVisiblity == true) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          style={{ alignSelf: "center" }}
          size="large"
          color={colors.white}
        />
        <Text style={styles.textLoading}>please Wait...</Text>
      </View>
    );
  }

  return (
    <View style={styles.errorConnection}>
      <View style={{  justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 12,}}>
      <Image style={styles.errorConnectionImage} source={error}></Image>
      <Text style={styles.errorConnectionTitle}>
        Oops, No Internet Connection
      </Text>
      <Text style={styles.errorConnectionText}>
        Make sure wifi and cellular data is turned on and try again.
      </Text>
      </View>
      <View style={{paddingVertical:32}}>
      <TouchableOpacity
        style={styles.tryAgainButton}
        onPress={() => setLoadingVisibility(true)}
      >
        <Text style={styles.tryAgainbuttonTitle}>Try Again</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.secondary,
    opacity: 0.8,
  },
  textLoading: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
    marginTop: 14,
  },
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
  tryAgainbuttonTitle: { color: "white", fontWeight: "600", fontSize: 20 },
  tryAgainButton: {
    backgroundColor: colors.secondary,
    width: 240,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
});
