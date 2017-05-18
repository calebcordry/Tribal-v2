import { View, Image } from 'react-native';
import styles from './css/styles.css';

const Loading = () => (
  <View style={styles.loading}>
    <Image source={require('../public/images/loading.gif')} />
  </View>
);

export default Loading;
