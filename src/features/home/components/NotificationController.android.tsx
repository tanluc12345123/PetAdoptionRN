import {View, Text} from 'react-native';
import React from 'react';
import PushNotification from 'react-native-push-notification';
import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';

PushNotification.createChannel(
  {
    channelId: '12345',
    channelName: 'notification',
    channelDescription: 'push notification from adoption pet app',
    playSound: false,
    soundName: 'default',
  },
  created => console.log('created',created),
);
const NotificationController = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        message: remoteMessage.notification?.body ?? '',
        title: remoteMessage.notification?.title,
        bigPictureUrl: remoteMessage.notification?.android?.imageUrl,
        smallIcon: remoteMessage.notification?.android?.imageUrl,
        channelId: '12345',
        vibrate: true,
      });
    });
    return unsubscribe;
  }, []);
  return null;
};

export default NotificationController;
