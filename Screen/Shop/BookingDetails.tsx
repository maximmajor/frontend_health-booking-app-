// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableHighlight } from 'react-native';
import React, {

    useState,
  } from "react";
  
  
  
  import {
    ScrollView,
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Button,
    Alert,
  } from "react-native";
  import styled from "styled-components";
  import { Goback } from "../../assets/icon";
  import { useNavigation } from "../../Hooks/useNavigation";
  import { FloatingLabelInput } from "react-native-floating-label-input";
  import { LinearGradient } from "expo-linear-gradient";
  import TextInput from "../../Components/TextInput/TextInput";
  import { useSelector } from "react-redux";
  import { baseUrl } from "../../Constants/baseUrl";
  import Loading from "../../Components/Loading/Loading";
  import Product from "../../Models/Product";
  import Colors from "../../Constants/Colors";
  import * as yup from 'yup'
  
  import {useForm, Controller} from 'react-hook-form'
  
  
  const ResetPassword = ({route,  navigation }: any) => {
    const token = route.params ? route.params.token : null
    // console.log(token, "koloo")
  
    // const [newPassword, setnewPassword] = useState("");
    const [number, setNumber] = useState("56");
    const [date, setDate] = useState("2017-03-01");
    // const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [paymenterror, setPaymenterror] = useState<null | string>(null);
    const [loading, setLoading] = useState(false);
  
  
  
    const _onPressButton = async () => {
  
    };
  
  
    const { control, handleSubmit, formState: { errors } } = useForm({
      defaultValues: {
        newPassword: '',
        repeatPassword: '',
      }
    });
    
    const onSubmit = async (data:any) => {
      console.log(data)
      setError(null);
      setLoading(true)
      console.log(data.newPassword, "clicked");
      try {
        const response = await fetch(
          `${baseUrl}/profile/buyer/resetpassword/${token}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              // Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              newPassword: data.newPassword,
              repeatPassword: data.repeatPassword,
            }),
          }
        );
      
        //handling edge cases error
        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData, "check return")
          setError(errorData.message);
          throw new Error(errorData);
        }
        //retreiving response
        const resData = await response.json();
        console.log(resData, "reset indi");
        Alert.alert("password Reset successfull", 'Kindly login', [{ text: "Okay" }]);
        navigation.navigate("Login", {
          token: token
        })
      
      
      } catch (err: any) {
        setError(err.message);
      }
      setError(null);
      setLoading(false)
    }
    return (
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TitleBar>
            <Goback
              style={{ position: "absolute", top: 0, left: 0 }}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Title>
              Reset Password<Text style={{ color: "#FECD05", fontSize: 32 }}>.</Text>
            </Title>
          </TitleBar>
  
          <Text           style={{marginTop: 50, marginBottom:-20}}>New password</Text>
          <Controller
          control={control}
          rules={{
           required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              label="Enter a new password"
            />
          )}
          name="newPassword"
        />
        {errors.newPassword && <Text style={{fontSize:13,  marginTop:10,color:"red"}}>please enter a valid password.</Text>}     
  
        <Text           style={{marginTop: 50, marginBottom:-20}}>Repeat password</Text>
        <Controller
          control={control}
          rules={{
           required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              label="repeat password"
            />
          )}
          name="repeatPassword"
        />
        {errors.repeatPassword && <Text style={{fontSize:13,  marginTop:10,color:"red"}}>password must match new password</Text>}     
  
        
        {/* <Button title='Submit' /> */}
  
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            {/* <ButtonLargeYellow title="Create Account" /> */}
            <LinearGradient
              // Button Linear Gradient
              colors={[Colors.primaryColor, Colors.linearYellow]}
              style={{
                // width: 340,
                height: 69,
                borderRadius: 16,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                paddingLeft: 20,
                paddingRight: 20,
                marginTop: 250,
              }}
            >
              <CheckoutText>
                {loading ? (
                  <ActivityIndicator size="large" color="#ffffff" />
                ) : (
                  "reset"
                )}{" "}
              </CheckoutText>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </Container>
    );
  };
  
  export default ResetPassword;
  const Container = styled.View`
    flex: 1;
    background: #f9f9f9;
    padding: 24px;
    /* scroll-behavior:scroll; */
  `;
  const TitleBar = styled.View`
    position: relative;
    width: 100%;
    margin-top: 48px;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  `;
  const Title = styled.Text`
    /* font-family: Open Sans; */
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 35px;
    color: #000000;
  `;
  const WhatsNew = styled.Text`
    /* font-family: Open Sans; */
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: #000000;
    margin-top: 10px;
    text-align: center;
  `;
  export const CheckoutText = styled.Text`
    font-family: open-sans-bold;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    color: #fff;
    margin-right: 8px;
  `;
  export const Login = styled.Text`
    margin: 20px auto;
    /* font-family: Open Sans; */
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: #000000;
  `;
  export const LoginText = styled.Text`
    text-align: center;
    margin: 0;
    /* font-family: Open Sans; */
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: #fecd05;
  `;
  
  