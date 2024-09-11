import { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Alert, FlatList, Text, StatusBar } from 'react-native';
import { usarBD } from './hooks/usarBD';
import { Produto } from './components/produto';

export function Index() {
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [pesquisa, setPesquisa] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [selectedId, setSelectedId] = useState(null); 

    const produtosBD = usarBD();

    async function create() {
        if (isNaN(quantidade)) {
            return Alert.alert('Quantidade', 'A quantidade precisa ser um número!');
        }

        try {
            const item = await produtosBD.create({
                nome,
                quantidade,
            });
            Alert.alert('Produto cadastrado com o ID: ' + item.idProduto);
            setId(item.idProduto);

            listar();
            resetForm(); 
        } catch (error) {
            console.log(error);
        }
    }

    async function update() {
        if (isNaN(quantidade)) {
            return Alert.alert('Quantidade', 'A quantidade precisa ser um número!');
        }

        try {
            if (selectedId) {
               
                await produtosBD.update(selectedId, {
                    nome,
                    quantidade,
                });
                Alert.alert('Produto atualizado!');

                listar();
                resetForm();
            } else {
                Alert.alert('Nenhum produto selecionado para atualização.');
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function listar() {
        try {
            const captura = await produtosBD.read(pesquisa);
            setProdutos(captura);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listar();
    }, [pesquisa]);

    const del = async (id) => {
        try {
            await produtosBD.del(id);
            await listar();
        } catch (error) {
            console.log(error);
        }
    };

    const resetForm = () => {
        setNome('');
        setQuantidade('');
        setSelectedId(null);
    };

    const handleSelect = (item) => {
        setSelectedId(item.id);
        setNome(item.nome);
        setQuantidade(String(item.quantidade)); 
    };

    return (
        
        <View style={styles.container}>

            <StatusBar

                backgroundColor="black" 
            />

            <Text style={styles.text}>Nome</Text>
            <TextInput
                style={styles.input}
                placeholder="Insira o nome"
                placeholderTextColor="gray"
                onChangeText={setNome}
                value={nome}
            />

            <Text style={styles.text}>Quantidade</Text>
            <TextInput
                style={styles.input}
                placeholder="Insira a quantidade"
                placeholderTextColor="gray"
                onChangeText={setQuantidade}
                value={quantidade}
                keyboardType="numeric"
            />

            <View style={styles.buttons}>
                <TouchableOpacity style={styles.botao} onPress={create}>
                    <Text style={styles.botaoTexto}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.botao}
                    onPress={update}
                >
                    <Text style={styles.botaoTexto}>Atualizar</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.text1}>Pesquisar os itens</Text>
            <TextInput
                style={styles.input}
                placeholder="Buscar"
                onChangeText={setPesquisa}
            />

            <FlatList
                contentContainerStyle={styles.listContent}
                data={produtos}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <Produto
                        data={item}
                        onDelete={() => del(item.id)}
                        isSelected={item.id === selectedId}
                        onPress={() => handleSelect(item)} 
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 32,
        gap: 16,
        backgroundColor: 'black',
        marginTop: 20
    },
    text: {
        fontSize: 25,
        color: 'white',
    },
    text1: {
        fontSize: 25,
        color: 'white',
    },
    input: {
        height: 54,
        borderWidth: 2,
        borderRadius: 50,
        borderColor: 'white',
        paddingHorizontal: 16,
        backgroundColor: 'white',
        fontSize: 18,

    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    botao: {
        backgroundColor: 'black',
        alignItems: 'center',
        height: 50,
        borderColor: 'white',
        justifyContent: 'center',
        borderRadius: 50,
        marginTop: 10,
        shadowColor: '#E6E4E4',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
        width: '48%'
    },
    botaoTexto: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 20,
    },
    listContent: {
        gap: 20,
    },
});
