import { View, Text, Button, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


export interface Todo {
    title: string,
    done: boolean,
    id: string,
}


const List = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todo, setTodo] = useState('');

    useEffect(()=> {
        const todoRef = collection(FIRESTORE_DB, 'todos');

        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {
                // console.log('UPDATED')
                const todos: Todo[] = [];
                snapshot.docs.forEach((doc) => {
                    // console.log(doc.data);
                    todos.push({
                        id: doc.id,
                        ...doc.data()
                    } as Todo);
                });
                setTodos(todos);
            },
        });
        return () => subscriber();
    },[]);

    const addTodo = async () => {
        const doc = await addDoc(collection(FIRESTORE_DB, 'todos'),{title: todo, done:false});
        setTodo('');
    }
    const renderTodo = ({item}: any) => {
        const ref = doc(FIRESTORE_DB, `todos/${item.id}`)

        const toggleDone = async() => {
            updateDoc(ref, {done: !item.done});
        };

        const deleteItem = async() => {
            deleteDoc(ref);
        };

        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={toggleDone} style={styles.todo}>
                    {item.done && <AntDesign name="checkcircle" size={24} color="green" />}
                    {!item.done && <Entypo name="circle" size={24} color="black" />}
                    <Text style={styles.todoText}>{item.title}</Text>
                </TouchableOpacity>
                <FontAwesome5 name="trash" size={24} color="red" onPress={deleteItem}/>
            </View>
        )
    }
  return (
    <View style={styles.container}>
        <View style={styles.form}>
            <TextInput style={styles.input} onChangeText={(text: string)=> setTodo(text)} value={todo} placeholder='Add New Todo'/>
            <Button onPress={addTodo} title='Add todo' disabled={todo === ''}/>
        </View>
        {todos.length > 0 && (
            <FlatList data={todos} keyExtractor={(todo: Todo) => todo.id} renderItem={renderTodo}/>

        )}
       
    </View>
  )
}


export default List

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    form: {
        marginVertical:20,
        flexDirection:'row',
        alignItems:'center',
    },
    input: {
        flex: 1,
        height: 40,
        borderRadius: 4,
        borderWidth: 1,
        padding: 10,
        borderColor: '#fff',
    },
    todoContainer:{
        flexDirection: 'row',
        alignItems:'center',
        padding: 10,
        backgroundColor:'#fff',
        marginVertical:4
    },
    todoText: {
        flex:1,
        paddingHorizontal: 4
    },
    todo: {
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    }

})
