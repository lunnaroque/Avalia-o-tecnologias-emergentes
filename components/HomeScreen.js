import { ScrollView, Image } from 'react-native';
import { styles }  from './Utilitarios';;
import { Card } from 'react-native-paper';
export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.scrolview}>
   <Card style={styles.card}>
        <Card.Content>
          <Image source={require('../assets/Gerenciamento.png')} style={styles.image} />
        </Card.Content>
      </Card>
      </ScrollView>
  );
  }