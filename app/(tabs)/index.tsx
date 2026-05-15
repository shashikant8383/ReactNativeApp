import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { router } from 'expo-router';

export default function HomeScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {

    if (email !== '' && password !== '') {

      router.push('/Dashboard');

    }
    else {

      alert('Please enter email and password');

    }

  }

  return (

    <View style={styles.container}>

      <TextInput
        placeholder="Enter Email"
        placeholderTextColor="#ec67b0"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Enter Password"
        placeholderTextColor="#ec67b0"
        secureTextEntry={true}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >

        <Text style={styles.buttonText}>
          Login
        </Text>

      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#bcb0b0',
    justifyContent: 'center',
    padding: 20,
  },

  input: {
    backgroundColor: '#000000',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#00aaff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

});