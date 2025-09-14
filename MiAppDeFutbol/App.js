import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import sportsService from './services/sportsService.js';

// Configure the notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  // NOTE: We are not getting the token since this is a demo app.
  // In a real app, you would use the token to send notifications from a server.
  // token = (await Notifications.getExpoPushTokenAsync()).data;
  // console.log(token);

  return token;
}

async function schedulePushNotification(match) {
    // Note: For demonstration, this schedules a notification 5 seconds from now.
    // In a real app, you would parse match.dateEvent and match.strTime
    // to calculate the correct trigger time (e.g., 1 hour before the match).
    const trigger = new Date(Date.now() + 5 * 1000);

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "¡Partido a punto de comenzar!",
            body: `${match.strEvent} es hoy. ¡No te lo pierdas!`,
        },
        trigger,
    });
}


export default function App() {
  const [matches, setMatches] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      // You could store the token here if needed
      setNotificationPermissionStatus('Permission granted.');
    }).catch(err => {
      setNotificationPermissionStatus('Permission denied.');
    });

    const fetchMatches = async () => {
      try {
        setError(null);
        setLoading(true);

        const teamToSearch = 'Arsenal';
        const teams = await sportsService.searchTeamByName(teamToSearch);

        if (teams && teams.length > 0) {
          const team = teams[0];
          setTeamName(team.strTeam);
          const nextMatches = await sportsService.getNextMatchesByTeamId(team.idTeam);
          if (nextMatches && nextMatches.length > 0) {
            setMatches(nextMatches);
            // Schedule notifications for fetched matches
            for (const match of nextMatches) {
              await schedulePushNotification(match);
            }
          } else {
            setError('No se encontraron próximos partidos.');
          }
        } else {
          setError(`No se encontró el equipo: ${teamToSearch}`);
        }
      } catch (e) {
        console.error(e);
        setError('Ocurrió un error al obtener los datos.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const renderMatch = ({ item }) => (
    <View style={styles.matchContainer}>
      <Text style={styles.matchTitle}>{item.strEvent}</Text>
      <Text style={styles.matchDate}>Fecha: {item.dateEvent} a las {item.strTime}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.notificationStatus}>{notificationPermissionStatus}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          <Text style={styles.header}>Próximos Partidos de {teamName}</Text>
          <FlatList
            data={matches}
            renderItem={renderMatch}
            keyExtractor={(item) => item.idEvent}
            contentContainerStyle={styles.list}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    width: '100%',
    paddingHorizontal: 20,
  },
  matchContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  matchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  matchDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  notificationStatus: {
    padding: 10,
    color: 'gray',
  }
});
