import { View, TextInput, Button, StyleSheet } from 'react-native'
import React,{useState} from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth();

    const signUp = async() => {
        const after = await createUserWithEmailAndPassword(auth, email, password)

    }

    const signIn = async() => {
        const user = await signInWithEmailAndPassword(auth, email, password)
    }

  return (
    <View style={styles.container}>
       <TextInput style={styles.input} onChangeText={(text: string)=> setEmail(text)} value={email} placeholder='Email'/>
       <TextInput style={styles.input} onChangeText={(text: string)=> setPassword(text)} value={password} placeholder='Password' textContentType='password'/>

       <Button onPress={signUp} title='create account'/>
       <Button onPress={signIn} title='Sign In'/>

    </View>
  )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        paddingVertical: 20,
    },
    input: {
        backgroundColor:'#fff',
        borderRadius: 5,
        borderWidth: 1,
        height: 50,
        padding: 10,
        marginVertical: 5
    }
});