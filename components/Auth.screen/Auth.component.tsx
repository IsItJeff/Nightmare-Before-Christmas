import React, { useState, useRef, SetStateAction } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner, FirebaseAuthApplicationVerifier } from 'expo-firebase-recaptcha';
import { getAuth, PhoneAuthProvider, signInWithCredential, ApplicationVerifier } from 'firebase/auth';
import { getApp } from 'firebase/app';
import { firebaseApp } from "../../utils/firestoreConfig"

const app = getApp();
const auth = getAuth();

if (!app?.options || Platform.OS === 'web') {
  throw new Error('This example only works on Android or iOS, and requires a valid Firebase config.');
}

export function PhoneSignIn() {
  firebaseApp
  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  // const firebaseConfig = app ? app.options : undefined;
  const [message, showMessage] = useState('');
  const attemptInvisibleVerification = false;

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        // attemptInvisibleVerification
      />
      <Text style={{ marginTop: 20 }}>Enter phone number</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        placeholder="+1 999 999 9999"
        autoFocus
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
      />
      <Button
        title="Send Verification Code"
        // disabled={!phoneNumber}
        onPress={async () => {
          try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current as FirebaseAuthApplicationVerifier
            );
            setVerificationId(verificationId);
            showMessage('Verification code has been sent to your phone.');
          } catch (err: any) {
            showMessage(`Error: ${err.message}`);
          }
        }}
      />
      <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        editable={!!verificationId}
        placeholder="123456"
        onChangeText={setVerificationCode}
      />
      <Button
        title="Confirm Verification Code"
        disabled={!verificationId}
        onPress={async () => {
          try {
            const credential = PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );
            await signInWithCredential(auth, credential);
            showMessage("Phone authentication successful" as SetStateAction<string>);
          } catch (err) {
            showMessage(`Error: ${err}` as SetStateAction<string>);
          }
        }}
      />
      {message ? (
        <TouchableOpacity
          style={[
            StyleSheet.absoluteFill
          ]}
          onPress={() => showMessage('')}>
          <Text
            style={{
              color: 'blue',
              fontSize: 17,
              textAlign: 'center',
              margin: 20,
            }}>
            {message}
          </Text>
        </TouchableOpacity>
      ) : (
        undefined
      )}
      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
    </View>
  );
}