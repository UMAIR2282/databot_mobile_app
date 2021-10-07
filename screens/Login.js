import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { ActionButton, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

class Login extends React.Component {

  loginButtonInfo(config, navigation) {
    return{
      className: "bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150",
      label: "SIGN IN",
      hasFormData: true,
      actionEndPoint: config.ActionEndPoint,
      requestType: "post",
      needsAuthorization: true,
      successMessage: config.SuccessMessage,
      failedCallback: () => {/*ToDo: Failed Message*/},
      successCallback: () => {navigation.navigate("App")}
    }
  }

  render() {
    const { navigation } = this.props;
    let saveButtonInfo = this.saveButtonInfo(config, setShowModal);
    saveButtonInfo.data = item;

    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.LoginBg}
          style={{ width, height, zIndex: 1 }}
        >
          <Block safe flex middle style={{backgroundColor: '#283965', opacity: 0.9}}>
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Text color="#8898AA" size={12}>
                  SIGN IN
                </Text>
              </Block>
              <Block flex>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Username"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        password
                        borderless
                        placeholder="Password"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block row width={width * 0.75}>
                      <Checkbox
                        checkboxStyle={{
                          borderWidth: 3
                        }}
                        color={argonTheme.COLORS.PRIMARY}
                        label="Remember Me"
                      />
                    </Block>
                    <Block middle>
                      <ActionButton color="primary" style={styles.createButton} buttonInfo={saveButtonInfo}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          SIGN IN
                        </Text>
                      </ActionButton>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
    /*backgroundColor: "#F4F5F7",*/
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    /*backgroundColor: argonTheme.COLORS.WHITE,*/
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

export default Login;

/*import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
const image = { uri: "https://raw.githubusercontent.com/khadkamhn/day-01-login-form/master/img/bg.jpg" };

export default function Login() {

  return (
    <View style={styles.container}>
      <ImageBackground source={"./assets/loginbg.jpg"} resizeMode="cover" style={styles.image}>
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
*/