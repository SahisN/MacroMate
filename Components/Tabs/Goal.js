import React, { Component, useState, useEffect } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import MyLineChart from './Goal_component/LineChart';

function Goal(){
    return (
      <ScrollView>
        <View>
            <MyLineChart/>
        </View>
      </ScrollView>
    );
  }


export default Goal;

// <ScrollView contentContainerStyle={{ padding: 20 }}>