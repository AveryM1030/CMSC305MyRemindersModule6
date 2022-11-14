import React, { useState } from 'react';
import { Text, TextInput, View, Pressable, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// use hook to create database
const myRemindersDB = openDatabase({name: 'MyReminders.db'});
const remindersTableName = 'reminders';
const remindersprioritiesTableName = 'reminders_priorities';


const ExistingReminderScreen = props => {

    const post = props.route.params.post;

    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [date, setDate] = useState(post.date);

    const navigation = useNavigation();
    
    const onReminderDelete = () => {
        return Alert.alert(
            // title
            'Confirm',
            // message
            'Are you sure you want to delete this reminder?',
            // buttons
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        myRemindersDB.transaction(txn => {
                            txn.executeSql(
                                `DELETE FROM ${remindersTableName}  WHERE id = ${post.id}`,
                                [],
                                () => {
                                    console.log(`${title} deleted sucessfully`);
                                },
                                error => {
                                    console.log('Error on deleting reminder' + error.messgae);
                                }
                            );
                        });
                        myRemindersDB.transaction(txn => {
                            txn.executeSql(
                                `DELETE FROM ${remindersprioritiesTableName}  WHERE reminder_id = ${post.id}`,
                                [],
                                () => {
                                    console.log('Reminder Priority deleted sucessfully.');
                                },
                                error => {
                                    console.log('Error on deleting reminder priority' + error.messgae);
                                }
                            );
                        });
                        alert('Reminder Deleted');
                        navigation.navigate('Get Reminders!');
                    },
                },
                {
                    text: 'No', 
                },
            ],
        );
    }

    const onReminderUpdate = () => {
        if (!title){
            alert('Please enter a reminder title.')
            return;
        }
        if (!description){
            alert('Please enter a description.')
            return;
        }
        if (!date){
            alert('Please enter a date in format MM-DD-YYYY.')
            return;
        }

        myRemindersDB.transaction(txn => {
            txn.executeSql(
                `UPDATE ${remindersTableName} SET title = '${title}', description = '${description}', date = '${date}' WHERE id = ${post.id}`,
                [],
                () => {
                    console.log(`${title} updated sucessfully`);
                },
                error => {
                    console.log('Error on updating reminder' + error.messgae);
                }
            );
        });

        alert(title + ' updated!');
        navigation.navigate('Get Reminders!');
    }

    const onAddPriority = () => {
        navigation.navigate('Add Reminder Priority', {post: post});
    }

  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <TextInput 
                value={title}
                onChangeText={value => setTitle(value)}
                style={styles.name}
                clearButtonMode={'while-editing'}
                placeholder={'Enter Reminder Title'}
                placeholderTextColor={'grey'}
            />
             <TextInput 
                value={description}
                onChangeText={value => setDescription(value)}
                style={styles.store}
                clearButtonMode={'while-editing'}
                placeholder={'Enter Reminder Description'}
                placeholderTextColor={'grey'}
            />
             <TextInput 
                value={date}
                onChangeText={value => setDate(value)}
                style={styles.date}
                clearButtonMode={'while-editing'}
                placeholder={'Enter Date in format MM-DD-YYYY'}
                placeholderTextColor={'grey'}
            />
        </View>
        <View style={styles.bottomContainer}>
            <Pressable style={styles.deleteButton} onPress={onReminderDelete}>
                <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
            <Pressable style={styles.updateButton} onPress={onReminderUpdate}>
                <Text style={styles.buttonText}>Update</Text>
            </Pressable>
            <Pressable style={styles.addButton} onPress={onAddPriority}>
                <Text style={styles.buttonText}>Add Priority</Text>
            </Pressable>
            </View>
    </View>
  );
};

export default ExistingReminderScreen;