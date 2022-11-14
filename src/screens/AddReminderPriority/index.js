import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import Priority from '../../components/Priority';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// use hook to create database
const myRemindersDB = openDatabase({name: 'MyReminders.db'});
const prioritiesTableName = 'priorities';

const AddReminderPriorityScreen = props => {

    const post = props.route.params.post;

  const navigation = useNavigation();
  const [priorities, setPriorites] = useState([]);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
     // declare an empty array that will store the results of the 
     // SELECT
     let results = [];
     // declare a transation the will execute the SELECT
     myRemindersDB.transaction(txn => {
       // execute SELECT
       txn.executeSql(
         `SELECT * FROM ${prioritiesTableName}`,
         [],
         // callback function to handle the results from the 
         // SELECT
         (_, res) => {
           // get number of rows of data selected
           let len = res.rows.length;
           console.log('Length of priorities ' + len);
           // if more than one row was returned
           if (len > 0){
             // loop through thr rows
             for (let i = 0; i < len; i++){
               // push a row of data at a time onto the
               // results array
               let item = res.rows.item(i);
               results.push({
                 id: item.id,
                 title: item.title,
                 description: item.description,
                 reminders_id: post.id,
               });
             }
             // assign results array to items state variable
             setPriorites(results);
           } else {
             // if no rows of data were returned,
             // set items state variable to an empty array
             setPriorites([]);
           }
         },
         error => {
           console.log('Error getting items ' + error.message);
         }
       )
     });
    });

    return listener;
});

  return (
    <View style={styles.container}>
         <FlatList 
          data={item}
          renderItem={({item}) => <Priority post={item} />}
          keyExtractor={item => item.id}
        />
    </View>
  );
};

export default AddReminderPriorityScreen;