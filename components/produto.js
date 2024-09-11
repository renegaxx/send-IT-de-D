import { Pressable, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export function Produto({ data, onDelete, isSelected, onPress }) {
    return (
        <Pressable
            style={[styles.container, isSelected && styles.selectedContainer]}
            onPress={onPress} 
        >
            <View style={styles.junto}>
                <Text style={styles.text}>
                    Nome: {data.nome}
                </Text>
                <Text style={styles.text}>
                    Quantidade: {data.quantidade}
                </Text>
            </View>

            <TouchableOpacity onPress={onDelete}>
                <MaterialIcons name="delete" size={28} color="black" />
            </TouchableOpacity>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 24,
        borderRadius: 25,
        gap: 12,
        shadowColor: '#E6E4E4', 
        shadowOffset: { width: 0, height: 1 }, 
        shadowOpacity: 0.8, 
        shadowRadius: 3, 
        elevation: 5, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    selectedContainer: {
        backgroundColor: '#F9F9F9',
        borderColor: '#000',
        borderWidth: 2
    },
    text: {
        fontSize: 20,
        color: '#000',
    },
});
