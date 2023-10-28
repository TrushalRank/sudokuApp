import {} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {fontFamily} from '../../common/styles/font';
import {COLOR} from '../../common/styles/color';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const UpdateScreen = props => {
  const [modalVisible, setModalVisible] = useState(props.visible);

  return (
    // <Modal
    //   animationType="slide"
    //   transparent={true}
    //   visible={modalVisible}
    //   onRequestClose={() => {
    //     Alert.alert("Modal has been closed.");
    //     setModalVisible(!modalVisible);
    //   }}
    // >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.borderView}>
          {/* <Text style={styles.modalText}>App Update Required!</Text> */}
          <View style={styles.headerTextView}>
            <Text style={styles.modalText}>App Update Required!</Text>
            <Text style={styles.modalTextSmall}>
              We have added new features and fix some bugs to make your
              experience seamless.
            </Text>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={[
                styles.buttonOption,
                {
                  backgroundColor: COLOR.cancelBg,
                },
              ]}
              onPress={() => {
                props.backGame(), setModalVisible(false);
              }}>
              <Text style={styles.modalTextButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonOption,
                {
                  backgroundColor: '#00896C',
                },
              ]}
              onPress={() => {
                props.updateGame(), setModalVisible(false);
              }}>
              <Text style={styles.modalTextButton}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    // </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // top: hp(-1),
    zIndex: 0,
    elevation: 0,
  },
  borderView: {
    height: hp(28),
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLOR.appColor,
    padding: 5,
    borderRadius: 5,
  },
  modalView: {
    // marginTop: hp(6),
    width: DEVICE_WIDTH - wp(9),
    padding: hp(2),
    // height: hp(20),
    backgroundColor: COLOR.updateBg,
    borderRadius: wp(3),
    // padding: hp(5),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // modalText: {
  //   fontSize: hp(3),
  //   textAlign: 'center',
  //   fontFamily: fontFamily.BOLD,
  // },
  headerTextView: {
    // height: "80%",
    width: DEVICE_WIDTH - wp(20),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  modalText: {
    // fontSize: hp(3),
    fontSize: hp(3),
    marginVertical: hp(0.5),
    fontFamily: fontFamily.BOLD,
    color: COLOR.white,
  },
  modalTextSmall: {
    // fontSize: hp(3),
    fontSize: hp(2),
    marginVertical: hp(0.5),
    fontFamily: fontFamily.BOLD,
    color: COLOR.white,
    textAlign: 'center',
  },
  buttonView: {
    // height: "37%",
    width: DEVICE_WIDTH - wp(20),
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: hp(3),
  },
  buttonOption: {
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(1),
    paddingHorizontal: wp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  modalTextButton: {
    fontSize: hp(3),
    marginVertical: hp(0.5),
    fontFamily: fontFamily.MEDIUM,
    color: COLOR.white,
  },
});

export default UpdateScreen;
