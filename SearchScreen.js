import React from 'react';
import { Text, View, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import db from '../config';


export default class Searchscreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      allTransactions: [],
      lastVisibleTransactions: null,
      search: ''
    }
  }
  
  fetchMoreTransactions = async() => {
    console.log(this.state.search)
    var text = this.state.search.toUpperCase();
    var enteredText = text.split('');
    if(enteredText[0].toUpperCase() === 'B'){
      const transaction = await db.collection("transactions")
      .where("bookId", "==", text)
      .startAfter(this.state.lastVisibleTransactions)
      .get();
      transaction.docs.map((doc)=> {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransactions: doc
        })
      }) 
    } 
    
    else if(enteredText[0].toUpperCase() === 'S'){
      const transaction = await db.collection("transactions")
      .where("studentId", "==", text)
      .startAfter(this.state.lastVisibleTransactions)
      .get();
      transaction.docs.map((doc)=> {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransactions: doc
        })
      })
    }
  }
  
  searchTransactions = async(text) => {
    var enteredText = text.split('');
    var text = text.toUpperCase();
    if(enteredText[0].toUpperCase() === 'B'){
      const transaction = await db.collection("transactions")
      .where("bookId", "==", text)
      .get();
      transaction.docs.map((doc)=> {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransactions: doc
        })
      })
    }
    else if(enteredText[0].toUpperCase() === 'S'){
      const transaction = await db.collection("transactions")
      .where("studentId", "==", text)
      .get();
      transaction.docs.map((doc)=> {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransactions: doc
        })
      })
    }


  }




  componentDidMount = async() => {
    const query = await db.collection("transactions").get()
    query.docs.map((doc)=> {
      this.setState({
        allTransactions: [...this.state.allTransactions, doc.data()]
      })
    })
  }
  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.searchBar}>
          <TextInput 
          style = {styles.bar}
          placeholder = "Enter Book ID/Student ID"
          onChangeText = {(text)=>{this.setState({search: text})}}
          />
          <TouchableOpacity style = {styles.searchButton} onPress = {()=>{
            this.searchTransactions(this.state.search)
          }}>
          <Text>Search:</Text>
          </TouchableOpacity>
        </View>

      <FlatList
        data = {this.state.allTransactions}
        renderItem = {({item})=>(
        <View style={{borderBottomWidth: 2}}>
          <Text>{"book Id:" + item.bookId}</Text>
          <Text>{"date:" + item.date.toDate()}</Text>
          <Text>{"studentId:" + item.studentId}</Text>
          <Text>{"transactionType:" + item.transactionType}</Text>
        </View>
        )}
        KeyExtractor = {(item,index)=>index.toString()}
        onEndReached = {this.fetchMoreTransactions}
        onEndReachedThreshold = {0.7}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
   marginTop: 50
 }
   
 
})
