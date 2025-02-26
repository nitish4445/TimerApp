// components/Timer.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { saveTimers } from '../utils/storage';

const Timer = ({ timer, onTimerUpdate }) => {
  const [remainingTime, setRemainingTime] = useState(timer.remainingTime);
  const [status, setStatus] = useState(timer.status);

  useEffect(() => {
    let interval;
    if (status === 'Running') {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(interval);
            setStatus('Completed');
            onTimerUpdate({ ...timer, status: 'Completed', remainingTime: 0 });
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    const updatedTimer = { ...timer, remainingTime, status };
    onTimerUpdate(updatedTimer);
    saveTimers([updatedTimer]);
  }, [remainingTime, status]);

  return (
    <View style={styles.timerContainer}>
      <Text>{timer.name}</Text>
      <Text>{remainingTime} seconds</Text>
      <Button
        title={status === 'Running' ? 'Pause' : 'Start'}
        onPress={() => setStatus(status === 'Running' ? 'Paused' : 'Running')}
      />
      <Button
        title="Reset"
        onPress={() => {
          setRemainingTime(timer.duration);
          setStatus('Paused');
          onTimerUpdate({ ...timer, remainingTime: timer.duration, status: 'Paused' });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default Timer;