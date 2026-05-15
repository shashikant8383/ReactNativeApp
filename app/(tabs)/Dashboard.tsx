import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';

import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Dashboard() {

  const [users, setUsers] = useState<any[]>([]);

  async function getUsers() {

    try {

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );

      const data = await response.json();

      setUsers(data);
       console.log("Data added to state successfully");

    }
    catch(error) {

      console.log(error);

    }

  }

  useEffect(() => {

    getUsers();

  }, []);

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Users List for shashikant raghuvanshi
      </Text>
      

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (

          <View style={styles.userCard}>

 <Text style={styles.id}>
              {item.id}
            </Text>
            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text style={styles.email}>
              {item.email}
            </Text>

          </View>

        )}
      />
 <Pressable onPress={() => router.push('/')}  style={styles.button}>
      <Text style={styles.buttonText}>
        Go Back
      </Text>
      </Pressable>
    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  userCard: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  id: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  email: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
   buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
   button: {
  backgroundColor: '#00aaff',
  padding: 15,
  borderRadius: 10,
  alignItems: 'center',
  marginBottom: 20,
},

});