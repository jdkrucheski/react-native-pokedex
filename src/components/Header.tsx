import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  text: string;
}

export const Header = ({text}: Props) => {
  const {top} = useSafeAreaInsets();
  return (
    <View style={{marginTop: top, marginBottom: 20}}>
      <Text
        style={{...styles.title, paddingLeft: 15}}
        numberOfLines={1}
        adjustsFontSizeToFit>
        {text}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    color: 'gray',
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'Comfortaa-Bold',
  },
});
