import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

const styles = StyleSheet.create({
  styleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background

  },
  styleScrollView: {
    backgroundColor: colors.background
  }
});

export default styles;
