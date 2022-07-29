import ImageColors from 'react-native-image-colors';

export const getColors = async (uri: string) => {
  let primary: string;
  let secundary: string;
  const colors = await ImageColors.getColors(uri, {fallback: 'grey'});
  switch (colors.platform) {
    case 'android':
      primary = colors.dominant || 'gray';
      secundary = colors.average || 'gray';
      break;
    case 'web':
      // web result properties
      primary = colors.dominant || 'gray';
      secundary = colors.vibrant || 'gray';
      break;
    case 'ios':
      // iOS result properties
      primary = colors.primary;
      secundary = colors.secondary;
      break;
    default:
      throw new Error('Unexpected platform key');
  }
  return [primary, secundary];
};
