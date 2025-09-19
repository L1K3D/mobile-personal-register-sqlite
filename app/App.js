import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, Text, TextInput, TouchableOpacity, View, ScrollView, Keyboard, Image } from "react-native";
import styles from "./styles/styles";
import Register from "./components/register/index";
import * as DbService from "./services/database-services";

export default function App() {
  const [personalCode, setPersonalCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registers, setRegisters] = useState([]);

  async function processingUseEffect() {
    try {
      await DbService.createTable();
      await loadData();
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(
    () => {
      processingUseEffect();
    }, []
  );

  useEffect(
    () => {
      console.log("Data changed")
    }, [fullName, email, password]
  );

  function createUnicPersonalCode() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
  }

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
      // personalCode is generated automatically when creating a new register

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

  // If there's no personalCode (empty string), treat as a new register
  let newRegister = !personalCode || personalCode.toString().trim() === "";

    let obj = {
      personalCode: newRegister ? createUnicPersonalCode() : personalCode,
      fullName: fullName,
      email: email,
      password: password,
    };

    try {

      let result = false;
      if (newRegister)
        result = await DbService.addRegister(obj);
      else
        result = await DbService.changeRegister(obj);

      if (result)
        Alert.alert("Data saved successfully!");
      else
        Alert.alert('Error on trying to save data!');

      Keyboard.dismiss();
      clearFields();
      await loadData();
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  // Function to load user data
  async function loadData() {
    try {
      console.log('loading...');
      let registers = await DbService.getAllData();
      setRegisters(registers);
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  function edit(identifier) {
    const register = registers.find(register => register.personalCode == identifier);

    if (register != undefined) {
      setPersonalCode(register.personalCode);
      setFullName(register.fullName);
      setEmail(register.email);
      setPassword(register.password);
      setConfirmPassword(register.password);
    }

    console.log(register);
  }

  async function effectiveExclusion() {
    try {
      await DbService.deleteAllRegisters();
      await loadData();
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  function excludeEverything() {
    if (Alert.alert('Please, this step requires atention!', 'Do you confirm the EXCLUSION OF ALL DATA?',
      [
        {
          text: 'Yes, confirm!',
          onPress: () => {
            effectiveExclusion();
          }
        },
        {
          text: 'No!',
          style: 'cancel'
        }
      ]));
  }

  function removeElement(identifier) {
    Alert.alert('CAUTION', 'Are you sure, you want to exclude this register?',
      [
        {
          text: 'Yes',
          onPress: () => effectiveRegisterExclusion(identifier),
        },
        {
          text: 'No',
          style: 'cancel',
        }
      ]
    );
  }

  async function effectiveRegisterExclusion(identifier) {
    try {
      await DbService.deleteRegister(identifier);
      Keyboard.dismiss();
      clearFields();
      await loadData();
      Alert.alert('Register deleted sucessfully!');
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

return (
    <View style={styles.container}>
      <Text style={styles.tituloPrincipal}>Create a user registration, persisting data on the device</Text>
      <Text />
      <Text />

      <View style={styles.card}>
        {/* Code is generated automatically; user cannot edit it */}

        <View style={styles.formRow}>
          <View style={styles.formCol}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              placeholderTextColor="#b5c0d0"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.formCol}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              placeholderTextColor="#b5c0d0"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

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

          <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={clearFields}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.buttonRow, { marginTop: 12 }]}> 
          <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={effectiveExclusion}>
            <Text style={styles.buttonText}>Delete all</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={loadData}>
            <Text style={styles.buttonText}>Load</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ width: '94%', marginTop: 12 }}>
        {registers.map((reg, index) => (
          <View key={reg.personalCode ?? index.toString()} style={{ backgroundColor: '#0f1620', padding: 12, marginBottom: 8, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#9be7c4', fontWeight: '700', fontSize: 16 }}>{reg.fullName}</Text>
              <Text style={{ color: '#b5c0d0' }}>{reg.email}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => edit(reg.personalCode)} style={{ marginRight: 12 }}>
                <Image source={require('./assets/app/edit.png')} style={{ width: 22, height: 22 }} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => removeElement(reg.personalCode)}>
                <Image source={require('./assets/app/delete.png')} style={{ width: 22, height: 22 }} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}
