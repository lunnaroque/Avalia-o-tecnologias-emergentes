import { List, TextInput, Button, Card } from 'react-native-paper';
import {ScrollView,FlatList,Alert} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {styles} from './Utilitarios';
import { useEffect, useState } from 'react';
import firebase from '../Firebase';

export default function ProdutoScreen () {
  let [key, setKey] = useState('');
  let [nome, setNome] = useState('');
  let [descricao, setDescricao] = useState('');
  let [valor, setValor] = useState('');
  let [grupo, setGrupo] = useState(null);
  let [produtos, setProdutos] = useState([]);
  let [grupos, setGrupos] = useState('');
  let [botaoAlterar, setBotaoAlterar] = useState(true);
  let [botaoExcluir, setBotaExcluir] = useState(true);
  let [botaoInserir, setBotaoInserir] = useState(false);
  let grupoPlaceholder = { label: 'Selecione um grupo', value: null};

  useEffect (() => {
    setGrupos([]);
    setProdutos([]);
    selecionarTodos();
  }, []);

  const selecionarTodos = () => {
    let itens = [];
    firebase.database().ref('grupos').orderByChild("nome").on('value', (snapshot) => {
      snapshot.forEach((linha) => {
        itens.push({
          label: linha.val().nome,
          value: linha.val().nome,
        });
      }); 
      setGrupos(itens);
    }); 
    itens = [];
    firebase.database().ref('produtos').orderByChild("nome").on('value', (snapshot) => {
      snapshot.forEach((linha) => {
        itens.push({
          key: linha.key,
          nome: linha.val().nome,
          descricao: linha.val().descricao,
          valor: linha.val().valor,
          grupo: linha.val().grupo
        });
      }); 
      setProdutos(itens);
    }); 
  }

  const selecionar = (key, nome, descricao, valor, grupo) =>{
    setKey(key);
    setNome(nome);
    setDescricao(descricao);
    setValor(valor);
    setGrupo(grupo);
    setBotaoAlterar(false);
    setBotaExcluir(false);
    setBotaoInserir(true);
  }

  const cancelar = () => {
    setKey("");
    setNome("");
    setDescricao("");
    setValor("");
    setGrupo("")
    setGrupos([]);
    setProdutos([]);
    selecionarTodos();
    setBotaoAlterar(true);
    setBotaExcluir(false);
    setBotaoInserir(false);
  }

  const inserirProduto = () => {
    try {
      firebase.database().ref('produtos').push({nome: nome, descricao: descricao, valor: valor, grupo: grupo});
      alert("Registro inserido com sucesso!");
      cancelar();
    } catch (e){
      alert("Erro ao inserir!");
    }
  }

  const alterarProduto = () => {
    try {
      firebase.database().ref('produtos').child(key).update({nome: nome, descricao: descricao, valor: valor, grupo: grupo});
      alert("Registro alterado com sucesso!");
      cancelar();
    } catch (e){
      alert("Erro ao alterar!");
    }
  }

  const excluirProduto = (key) => {
    alert(
      'Deseja realmente excluir esse registro?',[
        {
        text:'Sim',
          onPress: () => {
              try {
                firebase.database().ref('produtos').child(key).remove();
                alert("Registro excluído com sucesso!");
                setProdutos([]);
                selecionarTodos();
              } catch (e){
                alert("Erro ao excluir!");
              }
          },
        },
        {
          text: "Não",
        },
      ]
    );
  }

  return (
    <ScrollView>
      <Card style={{margin: 10}}>
        <Card.Title
          title="Gerenciar produtos"
          subtitle="Dados dos produtos"
        />
        <Card.Content>
          <TextInput
            onChangeText={setNome}
            value={nome}
            mode="outlined"
            label="Nome"
            placeholder="Digite o nome do produto"
          />
          <TextInput
            onChangeText={setDescricao}
            value={descricao}
            mode="outlined"
            label="Descrição"
            placeholder="Digite a descrição do produto"
          />
          <TextInput
            onChangeText={setValor}
            value={valor}
            keyboardType='numeric'
            mode="outlined"
            label="Valor"
            placeholder="Digite o valor do produto"
          />
          <RNPickerSelect items={grupos} onValueChange={(grupo => setGrupo(grupo))} 
            placeholder={grupoPlaceholder} value={grupo}/>
        </Card.Content>
        <Card.Actions>
          <Button icon="plus" mode="contained" style={styles.buttonCrud} disabled={botaoInserir}
            onPress={() => inserirProduto()}>
          </Button>
          <Button icon="pencil" mode="contained"  style={styles.buttonCrud} disabled={botaoAlterar} 
            onPress={() => alterarProduto()}>
          </Button>
          <Button icon="delete" mode="contained"  style={styles.buttonCrud} disabled={botaoExcluir}
            onPress={() => excluirProduto()}>
          </Button>
          <Button icon="cancel" mode="contained"  style={styles.buttonCrud} 
            onPress={() => cancelar()}>
          </Button>
        </Card.Actions>
      </Card>
      <List.Section>
    <List.Subheader>Produtos gravados</List.Subheader>
      <FlatList
        data={produtos}
        renderItem={({ item }) => {
          return (
              <List.Item
                title={item.nome}
                left={props => <List.Icon icon="arrow-right" />}
                onPress={() =>
                  selecionar(item.key, item.nome, item.descricao, item.valor, item.grupo)
                }
              />
          );
        }}
      />
      </List.Section>
    </ScrollView>
  );
}