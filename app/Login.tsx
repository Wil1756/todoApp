import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                // @ts-ignore
                navigation.navigate('Todos');
            }
        })
        return unsubscribe
    },[])

    const auth = getAuth();

    const handleSignUp = async() => {
        try {
           const userCredential = await createUserWithEmailAndPassword(auth, email, password);

           const user = userCredential.user;
        //    console.log('Registered With', user.email);
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('An unexpected error occured.')
            }
        }

    }

    const handleLogin = async() => {
        try {
           const userCredential = await signInWithEmailAndPassword(auth, email, password)

           const user = userCredential.user;
        //    console.log('logged in with', user.email);
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('An unexpected error occured.')
            }
        }

    }

  

  return (
    <KeyboardAvoidingView style={styles.container} >
        <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={(text: string)=> setEmail(text)} value={email} placeholder='Email'/>
        <TextInput style={styles.input} onChangeText={(text: string)=> setPassword(text)} value={password} placeholder='Password' secureTextEntry/>
        </View>
        
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutline]}>
                <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
    
  )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems:'center',
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor:'#fff',
        marginTop: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    buttonContainer:{
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button:{
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText:{
        color: '#fff',
        fontWeight: '700',
        fontSize: 10,
    },
    buttonOutline:{
        backgroundColor: '#fff',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonOutlineText:{
        color: '#0782F9',
        fontWeight:'700',
        fontSize: 16,
    }
});