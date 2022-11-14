import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const database = require('../../components/Handlers/database.js');

const Priority = props => {

    const post = props.post;
    const navigation = useNavigation();

    const onPress = () => {
        if (post.reminder_id){
            // Add Reminder Priority screen is using me
            try {
                db.addReminderPriority(post.reminder_id, post.id);
            } catch (error) {
                console.log('Error adding reminder priority ' + error);
            }
            alert('Priority added to reminder!');
            navigation.navigate('Get Reminders!');
        } else {
            // Priority screen is using me
            console.log(post.title);
        }
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.touchable} onPress={onPress}>
            <View style={{flex: 2}}>
                <Text style={styles.title} numberOfLines={1}>{post.title}</Text>
                <Text style={styles.description} numberOfLines={1}>{post.description}</Text>
            </View>
        </TouchableOpacity>
    </View>
  );
};

export default Priority;