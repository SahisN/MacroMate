import React from 'react';
import { Image, View, ScrollView, Text, StyleSheet } from 'react-native';
import GaolIamge from '../../assets/shredded1.jpg'

export default function Goals() {
  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.header}>Shredded Culture</Text>
        <Image style={styles.image} source={GaolIamge} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 469,
    width: 469,
    borderRadius:16,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 19,
    color: '#a3a3a3',
    paddingBottom: 120,
    marginBottom: 69,
  }

});