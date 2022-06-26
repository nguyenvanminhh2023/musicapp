import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from 'react-native';
import Animated, {
  withSpring,
  interpolate,
  Extrapolate,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

import { Context } from './Context';
import { Handle } from './Handle';
import { Position } from './Position';
import { Header } from './Header';
import { Section } from './Section';
import { Actions } from './Actions';
import { NextPrev } from './NextPrev';

import {
  WIDTH,
  HEIGHT,
  TOP_INSET,
  BOTTOM_INSET,
  SNAP_TOP,
  SNAP_BOTTOM,
} from './Dimensions';
import { Alarm } from 'src/icons/Alarm';
import Modal from 'react-native-modal';
import { Colors } from 'src/constants';
import { listTimer } from '../../../data';
import { usePlaylist } from 'src/provider';

export const Player = () => {
  const { setTimeToStop } = usePlaylist();
  const [isShowModal, setIsShowModal] = useState(false);

  const onShowModal = () => {
    setIsShowModal(true);
  };

  const onCloseModal = () => {
    setIsShowModal(false);
  };

  const onPressItem = (value: number) => {
    onCloseModal();
    setTimeToStop(value);
  };

  const translateY = useSharedValue(SNAP_BOTTOM);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx: any) => {
      const min = SNAP_BOTTOM;
      const max = SNAP_TOP;

      let value = ctx.startY + event.translationY;

      if (value > min) {
        value = min;
      } else if (value < max) {
        value = max;
      }

      translateY.value = value;
    },
    onEnd: (event) => {
      const velocity = event.velocityY;
      const toValue = velocity > 0 ? SNAP_BOTTOM : 0;

      translateY.value = withSpring(toValue, {
        velocity,
        stiffness: 40,
        overshootClamping: true,
      });
    },
  });

  const percent = useDerivedValue(() => {
    return interpolate(
      translateY.value,
      [SNAP_BOTTOM, SNAP_TOP],
      [0, 100],
      Extrapolate.CLAMP,
    );
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <Context.Provider value={{ percent }}>
      <Animated.View style={[styles.container, style]}>
        <Handle {...{ gestureHandler }} />
        <Position />
        <Header />
        <Section />
        <View style={styles.button}>
          <TouchableOpacity onPress={onShowModal}>
            <Alarm size={30} />
          </TouchableOpacity>
        </View>
        <Actions />
        <NextPrev />
      </Animated.View>
      <Modal
        swipeDirection="left"
        useNativeDriver={true}
        style={styles.modal}
        isVisible={isShowModal}
        onSwipeComplete={onCloseModal}
        onBackButtonPress={onCloseModal}
        onBackdropPress={onCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.headerModal}>
            <View style={styles.indicator} />
          </View>
          <View style={styles.headerModal}>
            <Text style={styles.titleModal}>Tắt nhạc sau: </Text>
          </View>
          <ScrollView>
            {listTimer.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => onPressItem(item.value)}
                  key={index.toString()}
                  style={styles.btnModal}>
                  <Text style={styles.textBtnModal}>{item.title}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </Context.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute',

    paddingTop: TOP_INSET,
    paddingBottom: BOTTOM_INSET,

    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#271B37',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 40,
    width: WIDTH,
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    maxHeight: (HEIGHT * 2) / 4,
    backgroundColor: '#FFFFFF',
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerModal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  indicator: {
    width: 40,
    height: 8,
    borderRadius: 16,
    backgroundColor: '#AEAEAE',
  },
  titleModal: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.black,
  },
  btnModal: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  textBtnModal: {
    color: Colors.black,
    fontSize: 17,
    fontWeight: 'bold',
  },
});
