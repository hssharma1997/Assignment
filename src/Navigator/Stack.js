import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import MovieInfo from '../Screens/MovieInfo';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MovieInfo" component={MovieInfo} />
     
    </Stack.Navigator>
  );
}
export default MyStack