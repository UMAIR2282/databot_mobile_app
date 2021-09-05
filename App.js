import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
const image = { uri: "https://raw.githubusercontent.com/khadkamhn/day-01-login-form/master/img/bg.jpg" };

export default function App() {

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.innerContainer}>
          <View style={styles.loginBox}>
            <Text style={styles.loginHeader}>SIGN IN</Text>
            <Text style={styles.loginLabel}>USERNAME</Text>
            <TextInput style={styles.loginInput} textContentType={'emailAddress'} autoCompleteType={'email'}></TextInput>
            <Text style={styles.loginLabel}>PASSWORD</Text>
            <TextInput style={styles.loginInput} secureTextEntry={true} textContentType={'password'} autoCompleteType={'password'}></TextInput>
            <View style={styles.loginButtonBox}>
              <Button
                style={styles.loginButton}
                title="SIGN IN"
                accessibilityLabel="Click to Login to Databot Application"
              />
            </View>
            <StatusBar style="auto" />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image:{
    flex: 1,
    justifyContent: "center"
  },
  innerContainer: {
    backgroundColor: '#283965',
    opacity: 0.9,
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  loginBox:{
    flex: 1,
    textAlign: "left",
    margin: "50px"
  },
  loginButton:{
    padding: "5px",
    color:"#fff",
    backgroundColor:"#1161ee",
    opacity: 1,
  },
  loginButtonBox:{
    marginTop: "10px",
  },
  loginHeader:{
    color: "#fff",
    fontFamily: "IBM Plex Sans, sans-serif",
    fontSize: "22px",
    textAlign: "left",
    borderBottomColor: "#1161ee",
    borderBottomWidth: "2px",
    paddingBottom: "5px",
    marginBottom: "10px",
    maxWidth: "100px"
  },
  loginLabel:{
    color: "#aaa",
    fontFamily: "IBM Plex Sans, sans-serif",
    fontSize: "12px",
    marginTop: "15px",
    marginBottom: "10px",
    textAlign: "left"
  },
  loginInput:{
    color: "#000",
    backgroundColor: "#fff",
    fontFamily: "IBM Plex Sans, sans-serif",
    fontSize: "14px",
    textAlign: "left",
    padding: "10px",
    opacity: 0.5,
    minWidth: "250px"
  }
});
