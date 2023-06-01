import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';


const sources = [
  {
    title: 'Heart.org',
    url: 'https://www.heart.org/en/healthy-living/healthy-eating',
  },
  {
    title: 'World Health Organization',
    url: 'https://www.who.int/health-topics/nutrition#tab=tab_1',
  },
  {
    title: 'Harvard T.H. Chan',
    url: 'https://www.hsph.harvard.edu/nutritionsource/healthy-eating-plate/',
  },
];

export default function HelpScreen() {
  
  const handleLinkPress = url => {
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <SafeAreaView style={{ flex: 1 }}>
          {sources.map((source, index) => (
            <TouchableOpacity key={index} style={styles.row} onPress={() => handleLinkPress(source.url)}>
              <Text style={styles.link}>{source.title}</Text>
            </TouchableOpacity>
          ))}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    height: 90,
    margin: 8,
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: '#CCCCCC',
    borderBottomWidth: 0.2,
    borderRadius: 15,
  },
  link: {
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
