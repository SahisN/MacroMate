import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const MacroNutrients = () => {
  const [protein, setProtein] = useState(50);
  const [carbs, setCarbs] = useState(50);
  const [fat, setFat] = useState(50);

  const updateProtein = (value) => {
    if (/^\d+$/.test(value)) {
      setProtein(parseInt(value));
    } else if (value === '') {
      setProtein(0);
    }
  };

  const updateCarbs = (value) => {
    if (/^\d+$/.test(value)) {
      setCarbs(parseInt(value));
    } else if (value === '') {
      setCarbs(0);
    }
  };

  const updateFat = (value) => {
    if (/^\d+$/.test(value)) {
      setFat(parseInt(value));
    } else if (value === '') {
      setFat(0);
    }
  };

  const data = [{ name: 'Protein', value: protein, color: 'green' }, { name: 'Carbs', value: carbs, color: 'gold' }, { name: 'Fat', value: fat, color: '#ff0000' },];

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };

  return (
    <View>
      <Text style={{ fontSize: 24, textAlign: 'center' }}>Macro Nutrients</Text>
      <View style={{ borderWidth: 1, borderColor: 'gray', padding: 10 }}>
        <PieChart
          data={data}
          width={300}
          height={200}
          chartConfig={chartConfig}
          accessor="value"
          backgroundColor="transparent"
          paddingLeft="80"
          absolute
        />
        {data.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 10, height: 10, backgroundColor: item.color, marginRight: 10 }} />
            <Text style={{ fontSize: 22 }}>{item.name}:</Text>
            <Text style={{ fontSize: 22, marginLeft: 5 }}>{item.value}g</Text>
          </View>
         
        ))}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingBottom: 69 }}>
        <View>
          <Text style={{ fontSize: 18 }}>Protein:</Text>
          <TextInput
            value={protein.toString()}
            onChangeText={updateProtein}
            keyboardType={'numeric'}
            style={{ fontSize: 24, borderWidth: 1, borderColor: 'gray', padding: 5 }}
          />
          <Text style={{ fontSize: 18, marginLeft: 5 }}>g</Text>
        </View>
        <View>
          <Text style={{ fontSize: 18 }}>Carbs:</Text>
          <TextInput
            value={carbs.toString()}
            onChangeText={updateCarbs}
            keyboardType={'numeric'}
            style={{ fontSize: 24, borderWidth: 1, borderColor: 'gray', padding: 5 }}
          />
          <Text style={{ fontSize: 18, marginLeft: 5 }}>g</Text>
        </View>
        <View>
          <Text style={{ fontSize: 18 }}>Fat: </Text>
          <TextInput
            value={fat.toString()}
            onChangeText={updateFat}
            keyboardType={'numeric'}
            style={{ fontSize: 24, borderWidth: 1, borderColor: 'gray', padding: 5 }}
          />
          <Text style={{ fontSize: 18, marginLeft: 5 }}>g</Text>
        </View>
      </View>
    </View>
  );
};

export default MacroNutrients;
