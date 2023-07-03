import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/Welcome';
import Discover from './screens/Discover';
import PlacesDetailsScreen from './screens/PlacesDetailsScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Discover" component={Discover}/>
        <Stack.Screen name="PlacesDetails" component={PlacesDetailsScreen}/>
      </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
    
  );
}