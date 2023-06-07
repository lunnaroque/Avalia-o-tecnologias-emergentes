import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/HomeScreen';
import GrupoScreen from './components/GrupoScreen';
import ProdutoScreen from './components/ProdutoScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Gerenciar Grupos" component={GrupoScreen} />
        <Drawer.Screen name="Gerenciar Produtos" component={ProdutoScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}