import React, { Component, useState, useEffect} from 'react';
import {View} from 'react-native';
import {BarChart} from 'react-native-chart-kit'
import { TouchableOpacity } from 'react-native-gesture-handler';

const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
        {
            data: [1680, 1000, 1200, 1800, 2000, 1900, 1300],
            color: (opacity=1) => 'rgba (255, 0, 0 ${opacity})',
            strokeWidth: 2,
        },
    ],
};

const chartConfig = {
    backgroundColor: 'white',
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 225, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.8,
    categoryPercentage: 0.6,
  };

class Charts extends Component {
    render()
    {
        const myData = this.props.myData;
        return( 
            <BarChart
                data={data}
                width={400}
                height={300}
                chartConfig={chartConfig}
                bezier
            />
        );
    }
    
}

export default Charts;