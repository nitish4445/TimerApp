import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTimer } from '../hooks/useTimer';
import ProgressBar from './ProgressBar';
import { formatTime } from '../utils/timeUtils';

const TimerItem = ({ timer, dispatch }) => {
  const { startTimer, pauseTimer, resetTimer } = useTimer(timer, dispatch);
  
  // Calculate progress percentage
  const progressPercentage = Math.round(100 - ((timer.remaining / timer.duration) * 100));
  
  // Determine color based on timer status
  const getStatusColor = () => {
    switch (timer.status) {
      case 'running':
        return '#4CAF50';  // Green
      case 'paused':
        return '#FFC107';  // Yellow
      case 'completed':
        return '#9E9E9E';  // Gray
      default:
        return '#2196F3';  // Blue
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.timerInfo}>
        <Text style={styles.timerName}>{timer.name}</Text>
        <Text style={styles.timerTime}>{formatTime(timer.remaining)}</Text>
        <Text style={[styles.timerStatus, { color: getStatusColor() }]}>
          {timer.status.charAt(0).toUpperCase() + timer.status.slice(1)}
        </Text>
      </View>
      
      <ProgressBar progress={progressPercentage} color={getStatusColor()} />
      
      <View style={styles.controls}>
        {timer.status !== 'completed' && (
          <>
            {timer.status === 'running' ? (
              <TouchableOpacity 
                style={[styles.button, styles.pauseButton]} 
                onPress={pauseTimer}
              >
                <Text style={styles.buttonText}>Pause</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={[styles.button, styles.startButton]} 
                onPress={startTimer}
                disabled={timer.remaining === 0}
              >
                <Text style={styles.buttonText}>Start</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={[styles.button, styles.resetButton]} 
              onPress={resetTimer}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  timerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timerName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  timerTime: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  timerStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  pauseButton: {
    backgroundColor: '#FFC107',
  },
  resetButton: {
    backgroundColor: '#9E9E9E',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TimerItem;