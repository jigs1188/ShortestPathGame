import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student'); // 'student' or 'teacher'
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        onLogin(JSON.parse(user));
      }
    });
  }, []);

  const handleLogin = async () => {
    try {
      const userCredential = isSignup
        ? await auth().createUserWithEmailAndPassword(email, password)
        : await auth().signInWithEmailAndPassword(email, password);

      const userDetails = {
        email: userCredential.user.email,
        role,
        name,
      };

      // Save user details locally
      await AsyncStorage.setItem('user', JSON.stringify(userDetails));
      onLogin(userDetails);
    } catch (error) {
      console.error('Error during authentication:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignup ? 'Signup' : 'Login'}</Text>
      {isSignup && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Role (student/teacher)"
            value={role}
            onChangeText={setRole}
          />
        </>
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={isSignup ? 'Signup' : 'Login'} onPress={handleLogin} />
      <Button
        title={isSignup ? 'Already have an account? Login' : 'New here? Signup'}
        onPress={() => setIsSignup(!isSignup)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default Login;
