import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    // paddingTop: 20,
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonSpacing: {
    marginVertical: 10,
  },
  teacherControls: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputBox: {
    borderWidth: 1,
    padding: 5,
    width: 80,
    marginBottom: 5,
  },
  gameMessage: {
    marginTop: 10,
  },
  gameControls: {
    marginVertical: 20,
  },
  homeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'lightgray',
  },
});
