import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {Picker} from '@react-native-community/picker'

export default function UnitsPicker({unitSystem, setUnitSystem}) {
  return (
    <View style={styles.units}>
      <Picker selectedValue={unitSystem} onValueChange={(item)=>setUnitSystem(item)} mode='dropdown' itemStyle={{fontSize:12, fontWeight:'bold'}}>
          <Picker.Item label="C°" value="metric" />
          <Picker.Item label="F°" value="imperial" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
    units:{
        top:40,
        position:'absolute',
        left:30,
        height:50,
        width:100,
    }
});
