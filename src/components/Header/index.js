import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React from 'react';
import {COLOR} from '../../common/styles/color';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Header = () => {
  const CustomStatusBar = ({backgroundColor, dark, ...props}) => {
    const insets = useSafeAreaInsets();
    const styles = makestyles(backgroundColor, insets);
    return (
      <>
        <View style={styles.container}>
          <StatusBar
            animated
            barStyle={dark ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundColor}
            {...props}
          />
        </View>
      </>
    );
  };

  const makestyles = (backgroundColor, insets) =>
    StyleSheet.create({
      container: {backgroundColor: backgroundColor, paddingTop: insets.top},
    });

  return (
    <>
      <CustomStatusBar backgroundColor={COLOR.appColor} dark />
    </>
  );
};

export default Header;
