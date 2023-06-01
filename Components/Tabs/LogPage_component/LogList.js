import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions} from 'react-native';
import { FlashList } from '@shopify/flash-list';

export default function LogList(props) {
    const renderItem = ({ item }) => {
      return (
        <View>
          <Text style={styles.listElement}>{item.value}{' '}({item.serving})</Text>
        </View>
      );
    };
  
    return (
      props.data.length != 0 ? 
      (<View>
        <FlashList
          data={props.data}
          renderItem={renderItem}
          estimatedItemSize={100}
          estimatedListSize={{width: 200, height: 100}}
        />
        </View>) : (<View></View>)
      
    );
  }

  const styles = StyleSheet.create({
    listElement: {
        fontWeight:'bold',
        fontSize:22,
        color:'black',
        marginTop:1,
        backgroundColor:'white',
        paddingLeft: 10
        
    },
       
});

/**
 * <FlashList 
                        data={name}
                        renderItem={({ item }) => <Text>{item.name}</Text>}
                        estimatedItemSize={150} />
 */