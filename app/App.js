import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  // State variables
  const [personalCode, setPersonalCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Function to clear all fields
  function clearFields() {
    setPersonalCode("");
    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  // Function to save user data with validations
  async function save() {
    // Validation: Personal code must be greater than 0
    if (!personalCode || isNaN(personalCode) || Number(personalCode) <= 0) {
      Alert.alert('Personal code must be a number greater than 0.');
      return;
    }

    // Validation: Name is required
    if (!fullName || fullName.trim().length === 0) {
      Alert.alert('Name is required.');
      return;
    }

    // Validation: Valid email (regex)
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Please enter a valid email.');
      return;
    }

    // Validation: Password and confirmation must match
    if (password !== confirmPassword) {
      Alert.alert('Password and confirmation must match.');
      return;
    }

    // Validation: Password must contain at least one number
    const numberRegex = /[0-9]/;
    if (!numberRegex.test(password)) {
      Alert.alert('Password must contain at least one number.');
      return;
    }

    // Validation: Password must contain at least one uppercase letter
    const upperRegex = /[A-Z]/;
    if (!upperRegex.test(password)) {
      Alert.alert('Password must contain at least one uppercase letter.');
      return;
    }

    // Validation: Password must be at least 5 characters
    if (password.length < 5) {
      Alert.alert('Password must be at least 5 characters long.');
      return;
    }

    let userData = {
      personalCode: personalCode,
      fullName: fullName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    const stringJson = JSON.stringify(userData);
    await AsyncStorage.setItem("@userData", stringJson);
    Alert.alert("Data saved successfully!");
  }

  // Function to load user data
  async function load() {
    const jsonContent = await AsyncStorage.getItem("@userData");
    console.log(jsonContent);
    if (jsonContent != null) {
      const userData = JSON.parse(jsonContent);
      setPersonalCode(userData.personalCode);
      setFullName(userData.fullName);
      setEmail(userData.email);
      setPassword(userData.password);
      setConfirmPassword(userData.confirmPassword);
    } else {
      Alert.alert("No data found");
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.tituloPrincipal}>
          Create a user registration, persisting data on the device
        </Text>
  <View style={styles.card}>
          {/* Personal Code */}
          <Text style={styles.label}>Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter code"
            placeholderTextColor="#b5c0d0"
            keyboardType="numeric"
            value={personalCode}
            onChangeText={setPersonalCode}
          />
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            placeholderTextColor="#b5c0d0"
            value={fullName}
            onChangeText={setFullName}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            placeholderTextColor="#b5c0d0"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.formRow}>
            <View style={styles.formCol}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="****"
                placeholderTextColor="#b5c0d0"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <View style={styles.formCol}>
              <Text style={styles.label}>Confirm password</Text>
              <TextInput
                style={styles.input}
                placeholder="****"
                placeholderTextColor="#b5c0d0"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={save}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={load}>
              <Text style={styles.buttonText}>Load</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.clearButtonWrapper}>
            <TouchableOpacity onPress={clearFields}>
              <Text style={[styles.buttonText, { color: '#5e60ce', fontSize: 18, textShadowColor: 'transparent' }]}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
  {/* Modern Card Form Layout */}
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}
