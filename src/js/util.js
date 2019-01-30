import { Dimensions, Platform } from 'react-native';


export const iPhoneX = () => {
	const {height} = Dimensions.get('window');
	if (Platform.OS == 'ios' && height === 812)
		return true;
	return false;
}