import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Color from "../../Constants/Colors";
import * as Linking from "expo-linking";
import { baseUrl } from "../../Constants/baseUrl";

const prefix = Linking.createURL("/");

const HomeScreen = ({ navigation }: any) => {
  //local state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hospital, setHospital] = useState<[] | null>(null);

  //Load available teams
  const loadHospital = async () => {
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/hospital/list/mock`);
      //handling edge cases error
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData, "error");
        throw new Error(errorData);
      }
      //retreiving response
      const resData = await response.json();
      console.log(resData, "show hospital");
      setHospital(resData);
    } catch (err: any) {
      // setError(err.message);
      console.log("kolo url");
    }
  };

  //error Alert
  useEffect(() => {
    loadHospital();
    if (error) {
      Alert.alert("oops", error, [{ text: "Okay" }]);
    }

    //cleanup fucntion
    return () => {
      setError(null); // This worked for me
    };
  }, []);

  return (
    <Container>
      <SafeAreaView>
        <SubTitle style={{ marginBottom: 20 }}>
          List of Hospitals near you{" "}
        </SubTitle>
        {!isLoading && hospital && hospital.length === 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#00CD52" />
          </View>
        ) : (
          <FlatList
            keyExtractor={(item, index) => item.id}
            data={hospital}
            renderItem={(itemData: any) => {
              const id = itemData.item.id;
              return (
                <TouchableOpacity style={{ marginTop: 15 }}>
                  <LinearGradient
                    colors={[Color.primaryColor, Color.linearYellow]}
                    style={{
                      // width: 340,
                      height: 72,
                      borderRadius: 16,
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}
                  >
                    <Wrapper>
                      <Daily>{itemData.item.hospitalName}</Daily>
                    </Wrapper>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.push("Product", {
                          hospitalId: itemData.item.id,
                          address: itemData.item.address,
                          doctorsName: itemData.item.doctorsName,
                        });
                      }}
                    >
                      <Mark>
                        <MarkText>View details </MarkText>
                      </Mark>
                    </TouchableOpacity>
                  </LinearGradient>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </SafeAreaView>
    </Container>
  );
};

export default HomeScreen;

const Container = styled.View`
  flex: 1;
  background: #f9f9f9;
  padding: 24px;
  font-family: "open-sans";
`;
export const SubTitle = styled.Text`
  font-family: "open-sans-bold";
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 30px;
  color: #000000;
  margin-top: 32px;
`;
const Wrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Mark = styled.View`
  justify-content: center;
  align-items: center;
  width: 84px;
  height: 32px;
  background: #ffffff;
  border-radius: 10px;
`;
const Daily = styled.Text`
  font-family: "open-sans-bold";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #ffffff;
`;
const MarkText = styled.Text`
  font-family: "open-sans";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #000;
`;
