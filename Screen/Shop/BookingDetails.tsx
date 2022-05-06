import React, {
    useState,
  } from "react";
  
  import {
    ScrollView,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
  } from "react-native";
  import styled from "styled-components";
  import { Goback } from "../../assets/icon";
  import { LinearGradient } from "expo-linear-gradient";
  import TextInput from "../../Components/TextInput/TextInput";
  import { baseUrl } from "../../Constants/baseUrl";
  import Colors from "../../Constants/Colors";
  import * as yup from 'yup'
  
  import {useForm, Controller} from 'react-hook-form'
 
  
  const BookingDetails = ({route,  navigation }: any) => {
    const { hospitalId } = route.params;
  console.log(hospitalId, "manacaa")
    // const [newPassword, setnewPassword] = useState("");
    const [number, setNumber] = useState("56");
    const [date, setDate] = useState("2017-03-01");
    // const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [paymenterror, setPaymenterror] = useState<null | string>(null);
    const [loading, setLoading] = useState(false);
  
  
    const { control, handleSubmit, formState: { errors } } = useForm({
      defaultValues: {
        name: '',
        phonenNmber: '',
        email: '',
        illnessType: '',
        photo: ''
      }
    });
    
    const onSubmit = async (data:any) => {
      console.log(data)
      setError(null);
      setLoading(true)
      console.log(data.name, "clicked");
      try {
        const response = await fetch(
          `${baseUrl}/users/book/appointment/${hospitalId}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              // Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: data.name,
              phonenNmber: data.phonenNmber,
              email: data.email,
              illnessType: data.illnessType,
              photo: data.photo
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
        console.log(resData, "Bokked");
        Alert.alert("Booking successfull", '', [{ text: "Okay" }]);
      } catch (err: any) {
        setError(err.message);
        Alert.alert( err.message, '', [{ text: "Okay" }]);
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
              Patient Details<Text style={{ color: "#FECD05", fontSize: 32 }}>.</Text>
            </Title>
          </TitleBar>
  
          <Text           style={{marginTop: 50, marginBottom:-20}}>Name</Text>
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
              label="Enter your name"
            />
          )}
          name="name"
        />
        {errors.name && <Text style={{fontSize:13,  marginTop:10,color:"red"}}>please enter a valid name.</Text>}     
  
        <Text           style={{marginTop: 50, marginBottom:-20}}>Phone Number</Text>
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
              label="Enter your phone number"
            />
          )}

          name="phonenNmber"
        />
        {errors.phonenNmber && <Text style={{fontSize:13,  marginTop:10,color:"red"}}>Enter a correct phone Number</Text>} 

                <Text           style={{marginTop: 50, marginBottom:-20}}>Email</Text>
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
              label="Enter your email"
            />
          )}

          name="email"
        />
        {errors.email && <Text style={{fontSize:13,  marginTop:10,color:"red"}}>Enter a valid email</Text>}   

        
                <Text           style={{marginTop: 50, marginBottom:-20}}>Illness Type</Text>
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
              label="Enter your illness type"
            />
          )}

          name="illnessType"
        />
        {errors.illnessType && <Text style={{fontSize:13,  marginTop:10,color:"red"}}>Enter a valid illness type </Text>}     
  
        
        {/* <Button title='Submit' /> */}
  
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <LinearGradient
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
                  "Book Now"
                )}{" "}
              </CheckoutText>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </Container>
    );
  };
  
  export default BookingDetails;
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
  
  