import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    register: {
        backgroundColor: '#386641',
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        margin: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    namesList: {
        width: '50%',
        fontSize: 18,
        paddingRight: 10,
    },
    dataEmailsList: {
        width: '40%',
        flexDirection: 'row',
    },
    dataActionButtons: {
        width: '10%',
    },
    emailIcon: {
        width: 20,
        height: 25,
        marginRight: 5,
    },
    emailsList: {
        color: "#FFF",
        fontSize: 18,
    },
    icon: {
        width: 20,
        height: 20,
    }

});

export default styles;