// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, SectionList, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Timer from '../components/Timer';
import CategoryActions from '../components/CategoryActions';
import TimerCompletedModal from '../components/TimerCompletedModal';
import { loadTimers, saveTimers } from '../utils/storage';

const HomeScreen = ({ navigation }) => {
  const [timers, setTimers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [completedTimerName, setCompletedTimerName] = useState('');

  useEffect(() => {
    const loadTimersData = async () => {
      const storedTimers = await loadTimers();
      setTimers(storedTimers);
    };
    loadTimersData();
  }, []);

  const handleTimerUpdate = (updatedTimer) => {
    const updatedTimers = timers.map((timer) =>
      timer.name === updatedTimer.name ? updatedTimer : timer
    );
    setTimers(updatedTimers);
    saveTimers(updatedTimers);

    if (updatedTimer.status === 'Completed') {
      setCompletedTimerName(updatedTimer.name);
      setModalVisible(true);
    }
  };

  const handleCategoryAction = (category, action) => {
    const updatedTimers = timers.map((timer) => {
      if (timer.category === category) {
        switch (action) {
          case 'start':
            return { ...timer, status: 'Running' };
          case 'pause':
            return { ...timer, status: 'Paused' };
          case 'reset':
            return { ...timer, remainingTime: timer.duration, status: 'Paused' };
          default:
            return timer;
        }
      }
      return timer;
    });
    setTimers(updatedTimers);
    saveTimers(updatedTimers);
  };

  const groupedTimers = timers.reduce((acc, timer) => {
    if (!acc[timer.category]) {
      acc[timer.category] = [];
    }
    acc[timer.category].push(timer);
    return acc;
  }, {});

  const sections = Object.keys(groupedTimers).map((category) => ({
    title: category,
    data: groupedTimers[category],
  }));

  return (
    <View style={styles.container}>
      <Button title="Add Timer" onPress={() => navigation.navigate('AddTimer')} />
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => (
          <Timer timer={item} onTimerUpdate={handleTimerUpdate} />
        )}
        renderSectionHeader={({ section }) => (
          <View>
            <Text style={styles.sectionHeader}>{section.title}</Text>
            <CategoryActions category={section.title} onAction={handleCategoryAction} />
          </View>
        )}
      />
      <TimerCompletedModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        timerName={completedTimerName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  timerItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
});

export default HomeScreen;