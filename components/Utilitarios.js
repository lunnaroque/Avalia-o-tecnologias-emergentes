import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  scrolview: {
    flex: 1
  },
  card: {
    margin: 10
  },
  image: {
    width: Dimensions.get('window').width - 65,
    height: 100,
    alignSelf: 'center'
  },
  title: {
    alignSelf: 'center'
  },
  button: {
    marginLeft: 10
  },
  buttonCrud: {
    padding: 10, 
    marginLeft: 10
  },
  buttonImageCrud: {
    marginTop: 10
  }
});

export const valorFormatado = (valor) => {
  return valor.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          });
};