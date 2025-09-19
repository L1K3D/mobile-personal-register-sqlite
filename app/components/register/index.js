import { Alert, Text, TextInput, TouchableOpacity, View, ScrollView, Keyboard } from "react-native";
import styles from './styles';
import iconEmail from '../../assets/app/email.png';
import iconDelete from '../../assets/app/delete.png';
import iconEdit from '../../assets/app/edit.png';

export default function Register({ register, removeElement, edit}) {
    return(
        <View style={styles.register}>

            <Text style={styles.namesList}> {register.name}</Text>
            <View style={styles.dataEmailsList}>

                <Image source={iconEmail} style={styles.emailIcon} />
                <Text style={styles.emailsList}> {register.email}</Text>
            </View>
            <View style={styles.dataActionButtons}>
                <TouchableOpacity onPress={() => edit(register)}>
                    <Image source={iconEdit} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeElement(register.code)}>
                    <Image source={iconDelete} style={styles.icon} />
                </TouchableOpacity>
            </View>

        </View>
    );
};