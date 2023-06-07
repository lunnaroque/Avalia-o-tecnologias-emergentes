import { List, TextInput, Button, Card } from 'react-native-paper';
import {ScrollView,FlatList,Alert} from 'react-native';
import {styles} from './Utilitarios';
import { useEffect, useState } from 'react';
import firebase from '../Firebase';

export default function GrupoScreen () {

  let [key, setKey] = useState('');
  let [nome, setNome] = useState('');
  let [descricao, setDescricao] = useState('');
  let [grupos, setGrupos] = useState([]);
  let [botaoAlterar, setBotaoAlterar] = useState(true);
  let [botaoExcluir, setBotaoExcluir] = useState(true);
  let [botaoInserir, setBotaoInserir] = useState(false);

  useEffect (() => {
    setGrupos([]);
    selecionarTodos();
  }, []);

  const selecionarTodos = () => {
    let itens = [];
    firebase.database().ref('grupos').orderByChild("nome").on('value', (snapshot) => {
      snapshot.forEach((linha) => {
        itens.push({
          key: linha.key,
          nome: linha.val().nome,
          descricao: linha.val().descricao
        });
      }); 
      setGrupos(itens);
    }); 
  }

  const selecionar = (key, nome, descricao) =>{
    setKey(key);
    setNome(nome);
    setDescricao(descricao);
    setBotaoAlterar(false);
    setBotaoExcluir(false);
    setBotaoInserir(true);
  }

  const cancelarGrupo = () => {
    setKey("");
    setNome("");
    setDescricao("");
    setGrupos([]);
    selecionarTodos();
    setBotaoAlterar(true);
    setBotaoExcluir(false);
    setBotaoInserir(false);
  }

  const inserirGrupo = () => {
    try {
      firebase.database().ref('grupos').push({nome: nome, descricao: descricao});
      alert("Registro inserido com sucesso!");
      cancelarGrupo();
    } catch (e){
      alert("Erro ao inserir!");
    }
  }

  const alterarGrupo = () => {
    try {
      firebase.database().ref('grupos').child(key).update({nome: nome, descricao: descricao});
      alert("Registro alterado com sucesso!");
      cancelarGrupo();
    } catch (e){
      alert("Erro ao alterar!");
    }
  }

 const excluirGrupo= (key) => {
     Alert.alert('Mensagem', 'Deseja realmente excluir esse registro?', [
      {
        text: 'Sim',
        onPress: () => {
          try {
            firebase.database().ref('grupos').child(key).remove();
            alert('Registro excluído com sucesso!');
            setGrupos([]);
            selecionarTodos();
          } catch (e) {
            alert('Erro ao excluir!' + e);
          }
        },
      },
      {
        text: 'Não',
        onPress: () => {
          setGrupos([]);
          selecionarTodos();
        },
      },
    ]);
  };

  return (
    <ScrollView>
      <Card style={{margin: 10}}>
        <Card.Title
          title="Gerenciar Grupos"
          subtitle="Dados dos grupos dos produtos"
        />
        <Card.Content>
          <TextInput
            onChangeText={setNome}
            value={nome}
            mode="outlined"
            label="Nome"
            placeholder="Digite o nome do grupo"
          />
          <TextInput
            onChangeText={setDescricao}
            value={descricao}
            mode="outlined"
            label="Descrição"
            placeholder="Digite a descrição do grupo"
          />
        </Card.Content>
        <Card.Actions>
          <Button icon="plus" mode="contained" style={styles.buttonCrud} disabled={botaoInserir}
            onPress={() => inserirGrupo()}>
          </Button>
          <Button icon="pencil" mode="contained"  style={styles.buttonCrud} disabled={botaoAlterar} 
            onPress={() => alterarGrupo()}>
          </Button>
          <Button icon="cancel" mode="contained"  style={styles.buttonCrud} 
            onPress={() => cancelarGrupo()}>
          </Button>
          <Button icon="delete" mode="contained"  style={styles.buttonCrud} disabled={botaoExcluir}
            onPress={() => excluirGrupo()}>
          </Button>
        </Card.Actions>
      </Card>
      <List.Section>
    <List.Subheader>Grupos cadastrados!</List.Subheader>
      <FlatList
        data={grupos}
        renderItem={({ item }) => {
          return (
              <List.Item
                title={item.nome}
                left={props => <List.Icon icon="arrow-right" />}
                onPress={() =>
                  selecionar(item.key, item.nome, item.descricao)
                }
              />
          );
        }}
      />
      </List.Section>
    </ScrollView>
  );
}