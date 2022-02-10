import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import {colors} from './utils/index'
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails'
 
const WEATHER_API_KEY='38347a6d1189e4a801446efcfb7c2e44';

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'
export default function App() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitSystem, setUnitSystem] = useState('metric')

  useEffect(()=>{
    load()
  },[unitSystem])
  async function load(){
    setCurrentWeather(null)
    setErrorMessage(null)
    try{
      let { status } =await Location.requestBackgroundPermissionsAsync()
      if(status !== 'granted'){
        setErrorMessage('Acess to location is needed to run')
        return 
      }
      const location = await Location.getCurrentPositionAsync()
      const {latitude, longitude} = location.coords

      const weatherURL=`${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}`;
      const response = await fetch(weatherURL);

      const result = await response.json()

      if(response.ok){
        setCurrentWeather(result)
      }
      else{
        setErrorMessage(result.message)
      }



    }catch(error){
      setErrorMessage(error.message)
    }
  }
  if(currentWeather){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
          <ReloadIcon load={load}/>
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails currentWeather={currentWeather} unitSystem={unitSystem}/>
      </View>
    ); 
  }
  else if(errorMessage){
    return (
      <View style={styles.container}>
          <ReloadIcon load={load}/>
          <Text style={{textAlign:'center'}}>{errorMessage}</Text>
          <StatusBar style="auto" />
      </View>
    );
  }
  else{
    return (
      <View style={styles.container}>
          <ActivityIndicator size="large" color={colors}/>
          <StatusBar style="auto" />
      </View>
    )
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main:{
    flex:1,
    justifyContent:'center'
  }
});
