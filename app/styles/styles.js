import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f14",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 30,
  },
  tituloPrincipal: {
    fontSize: 20,
    fontWeight: "700",
    color: "#9be7c4",
    marginBottom: 18,
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  card: {
    width: Math.min(width * 0.92, 760),
    backgroundColor: '#0f1620',
    borderRadius: 18,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2dce89',
    shadowColor: '#2dce89',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    color: "#b5c0d0",
    alignSelf: 'flex-start',
  },
  input: {
    fontSize: 16,
    width: '100%',
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#23263a",
    backgroundColor: '#f7f7d9',
    marginBottom: 14,
    paddingHorizontal: 16,
    color: "#23263a",
  },
  formRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  formCol: {
    width: '48%',
    alignItems: 'flex-start',
  },
  buttonRow: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width: "48%",
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2dce89",
  },
  buttonSecondary: {
    backgroundColor: "#5e60ce",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  clearButtonWrapper: {
    marginTop: 18,
    alignItems: 'center',
  },
});

export default styles;