import React, { useState } from "react";
import styled from "styled-components";
import { ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { GoBackWhite } from "../../assets/icon";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../Constants/Colors";
import { CheckoutText } from "./BookingDetails";
//Styles
const Wrapper = styled.View`
  flex: 1;
  background: #ededed;
  padding: 24px;
`;
const Box2 = styled.View`
  background: #ffffff;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  height: 50%;
  padding: 24px;
`;
const TitleBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ProductName = styled.Text`
  font-family: open-sans-bold;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  color: rgba(0, 0, 0, 0.78);
  /* max-width: 210px; */
`;

const ProductDescription = styled.Text`
  font-family: open-sans-bold;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  text-align: left;
  color: rgba(0, 0, 0, 0.56);
`;
const PageHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

function ProductDetailScreen({ route, navigation }: any) {
  //extraction
  const { hospitalId } = route.params;
  const { address } = route.params;
  const { doctorsName } = route.params;

  console.log(hospitalId, "here 555");

  return (
    <>
      <Wrapper>
        <SafeAreaView>
          <PageHeader>
            <GoBackWhite
              onPress={() => {
                navigation.goBack();
              }}
            />
          </PageHeader>
        </SafeAreaView>
      </Wrapper>

      <Box2>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TitleBar>
            <ProductName>
              Doctor's Name: {doctorsName && doctorsName}
            </ProductName>
          </TitleBar>
          <ProductDescription>
            {" "}
            Hospital address: {address && address}
          </ProductDescription>
          <TouchableOpacity>
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
                marginTop: 30,
              }}
            >
              <CheckoutText>Book Now</CheckoutText>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </Box2>
    </>
  );
}
export default ProductDetailScreen;
