import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#282828',
  },
  headerBar: {
    height: 20,
    justifyContent: 'space-between',
    backgroundColor: 'lightgray',
  },
  header: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#686868',
  },
  footer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#686868',
  },
  profiles: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  picture: {
    margin: 20,
    padding: 2,
    width: 50,
    height: 50,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#F8F8F8',
  },
  instructions: {
    textAlign: 'center',
    color: '#D3D3D3',
    marginBottom: 5,
  },
  hero: {
    textAlign: 'center',
    color: '#D3D3D3',
    marginBottom: 5,
  },
  textInput: {
    borderColor: '#F8F8F8',
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  inputBox: {
    backgroundColor: 'white',
    borderColor: '#F8F8F8',
    height: 40,
    width: 200,
    textAlign: 'center',
  },
  text: {
    color: 'white',
  },
  button: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  webview: {
    backgroundColor: '#282828',
    height: 80,
  },
  message: {
    backgroundColor: '#282828',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messageBox: {
    height: 75,
    margin: 10,
    padding: 5,
  },
  loading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 350,
  },
  picker: {
    width: '100%',
  },
  pickerView: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    width: '100%',
    height: 100,
    backgroundColor: '#282828',
  },
});
