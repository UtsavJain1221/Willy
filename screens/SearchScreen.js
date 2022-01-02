import React from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpaciy } from 'react-native';
import db from '.../config';
export default class Searchscreen
extends React.Component {
  constructor(props){
    super(props);
    this.state={
      allTransactions:[],
      lastVisibleTransaction:doc

    }
  }
  componentDidMount = async ()=>{
    const query = await db.collection("transactions").limit(10).get()
    query.docs.map((doc)=>{
      this.setState({
        allTransactions: [],
        lastVisibleTransaction: doc
      })
    })
  }
    render() {
      return (
        <View style = {styles.container}>
<View style = {styles.searchBar}>
<TextInput 
style = {styles.bar}
placeholder = "Enter bookId or StudentId"
onChangeText = {(text)=>{this.setState({search:text})}}/>
<TouchableOpacity
style = {styles.searchButton}
onPress = {()=>{this.searchTransactions(this.state.search)}}>

 <Text>Search</Text> 
</TouchableOpacity>
  
</View>
<FlatList
          data={this.state.allTransactions}
          renderItem={({item})=>(
            <View style={{borderBottomWidth: 2}}>
              <Text>{"Book Id: " + item.bookId}</Text>
              <Text>{"Student id: " + item.studentId}</Text>
              <Text>{"Transaction Type: " + item.transactionType}</Text>
              <Text>{"Date: " + item.date.toDate()}</Text>
            </View>
          )}
          keyExtractor= {(item, index)=> index.toString()}
          onEndReached ={this.fetchMoreTransactions}
          onEndReachedThreshold={0.7}
        /> 
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20
    },
    searchBar:{
      flexDirection:'row',
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'grey',
  
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10,
    },
    searchButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green'
    }
  })