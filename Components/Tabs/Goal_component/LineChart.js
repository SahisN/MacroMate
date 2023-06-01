import React, { useState } from 'react';
import { Text, Dimensions, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function MyLineChart() {
  const [timeFrame, setTimeFrame] = useState('daily');
  const [calorieGoal, setCalorieGoal] = useState('');
  const [chartData, setChartData] = useState({ labels: [], datasets: [{ data: [], strokeWidth: 2 }] });

  const renderChartData = () => {
    switch (timeFrame) {
      case 'weekly':
        return {
          labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'],
          datasets: [
            {
              data: [calorieGoal / 4, calorieGoal / 4 * 2, calorieGoal / 4 * 3, calorieGoal],
              strokeWidth: 2,
            },
          ],
        };
      case 'monthly':
        return {
          labels: ['1', '8', '15', '22', '30'],
          datasets: [
            {
              data: [calorieGoal / 4, calorieGoal / 4 * 2, calorieGoal / 4 * 3, calorieGoal / 4 * 4, calorieGoal],
              strokeWidth: 2,
            },
          ],
        };
      default:
        // daily
        return {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              data: [calorieGoal / 7, calorieGoal / 7 * 2, calorieGoal / 7 * 3, calorieGoal / 7 * 4, calorieGoal / 7 * 5, calorieGoal / 7 * 6, calorieGoal],
              strokeWidth: 2,
            },
          ],
        };
    }
  };

  const handleCalorieGoalInput = (goal) => {
    const parsedGoal = parseInt(goal);
    if (!isNaN(parsedGoal)) {
      setCalorieGoal(parsedGoal);
    }
  };

  return (
    <>
      <Text style={[styles.header, {alignSelf: 'center'}]}>Goal Chart</Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={[styles.button, timeFrame === 'daily' && styles.activeButton]}
          onPress={() => setTimeFrame('daily')}>
          <Text style={styles.buttonText}>DAILY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, timeFrame === 'weekly' && styles.activeButton]}
          onPress={() => setTimeFrame('weekly')}>
          <Text style={styles.buttonText}>WEEKLY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, timeFrame === 'monthly' && styles.activeButton]}
          onPress={() => setTimeFrame('monthly')}>
          <Text style={styles.buttonText}>MONTHLY</Text>
        </TouchableOpacity>
      </View>
      <LineChart
        data={renderChartData()}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          backgroundColor: '#F2F3F5',
          backgroundGradientFrom: '#F2F3F5',
          backgroundGradientTo: '#F2F3F5',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
            padding: 16,
          }
        }}/>
      <TextInput
        placeholder="Enter your calorie goal"
        keyboardType="numeric"
        style={styles.input}
        onChangeText={handleCalorieGoalInput}
        value={calorieGoal.toString()}
      />
       <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          // code to save the calorie goal goes here
        }}
      >
        <Text style={[styles.saveButtonText, styles.buttonText]}>Save</Text>
      </TouchableOpacity>
      
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#efefef',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 8,
    marginHorizontal: 2,
  },
  saveButton: {
    backgroundColor: '#c2c0c0',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 16,
  },
  activeButton: {
    backgroundColor: '#c2c0c0',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});