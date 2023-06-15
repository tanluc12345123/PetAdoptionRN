import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {PaymentServiceRouteProp} from '../../navigation/route/index';
import {PaymentServiceRootProp} from '../../navigation/props/index';
import {BaseScreen} from '../../components/BaseScreen';
import ToolbarHeader from '../../components/ToolbarHeader/ToolbarHeader';
import {Drawables} from '../../assets/images/index';
import {PaymentServiceStyles} from './PaymentService.Style';
import {Fonts} from '../../assets/fonts/index';
import {Colors} from '../../theme';
import {useEffect} from 'react';
import Button from '../../components/Button/Button';
import {usePaymentService} from './hooks/usePayment';
import IconPaypal from '../../assets/images/ic_paypal.svg';
import {WebView} from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';
import {Alert} from 'react-native';
import {apiSandBox} from '../../utils/apiSandboxUtil';

const PaymentServiceScreen = () => {
  const route = useRoute<PaymentServiceRouteProp>();
  const navigation = useNavigation<PaymentServiceRootProp>();
  const {isLoading, data, booking, error} = usePaymentService();

  const [showGateway, setShowGateway] = useState<boolean>(false);
  const [prog, setProg] = useState<boolean>(false);
  const [progClr, setProgClr] = useState<string>(Colors.darker);

  const [accessToken, setAccessToken] = useState<string>('');
  const [approvalUrl, setApprovalUrl] = useState<string>('');
  const [paymentId, setPaymentId] = useState<string>('');

  const dataDetail = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    transactions: [
      {
        amount: {
          total: route.params.bookService.totalPrice,
          currency: 'THB',
          details: {
            subtotal: route.params.bookService.totalPrice,
            tax: '0',
            shipping: '0',
            handling_fee: '0',
            shipping_discount: '0',
            insurance: '0',
          },
        },
      },
    ],
    redirect_urls: {
      return_url: 'https://example.com/success',
      cancel_url: 'https://example.com/failed',
    },
  };

  const callApiSandbox = () => {
    apiSandBox
      .callApiSandBox()
      .then(response => {
        console.log('1', response.data);
        setAccessToken(response.data.access_token);
        apiSandBox
          .callApiSandboxPayment(response.data.access_token, dataDetail)
          .then(response => {
            console.log('2', response.data);
            const {id, links} = response.data;
            const approvalUrl = links.find(
              (data: {rel: string}) => data.rel == 'approval_url',
            );
            setPaymentId(id);
            setApprovalUrl(approvalUrl.href);
          })
          .catch(err => {
            console.log('2', err.message);
          });
      })
      .catch(error => {
        console.log('1', error.message);
      });
  };

  const onNavigationStateChange = (webViewState: any) => {
    if (webViewState.url.includes('https://example.com/')) {
      setApprovalUrl('');
      const PayerID = getSearchParamFromURL(webViewState.url, 'PayerID');
      const paymentId = getSearchParamFromURL(webViewState.url, 'paymentId');
      apiSandBox
        .callApiSandboxPaymentExecute(PayerID, paymentId, accessToken)
        .then(response => {
          console.log('3', response.data.payer);
          if (response.data.payer.status === 'VERIFIED') {
            Alert.alert('Payment!', 'Payment Successful!', [
              {text: 'OK', onPress: () => bookingService(true)},
            ]);
          } else {
            Alert.alert('Payment!', 'Payment Failed!', [
              {text: 'OK', onPress: () => {}},
            ]);
          }
        })
        .catch(err => {
          console.log({...err});
        });
    }
  };

  const getSearchParamFromURL = (url: string, param: string) => {
    const include = url.includes(param);

    if (!include) return null;

    const params = url.split(/([&,?,=])/);
    const index = params.indexOf(param);
    const value = params[index + 2];
    return value;
  };

  const bookingService = (payment: boolean) => {
    route.params.bookService.pets.forEach(item => {
      booking({
        dateStart: route.params.bookService.startDay,
        dateEnd: route.params.bookService.endDate,
        visitingTimeEnd: route.params.bookService.visitingTimeEnd,
        visitingTimeStart: route.params.bookService.visitingTimeStart,
        payment: payment,
        service: route.params.bookService.service,
        user: route.params.bookService.user,
        pet: item,
      });
    });
  };

  useEffect(() => {
    callApiSandbox();
  }, []);

  useEffect(() => {
    if (data?.status === 'Success') {
      Alert.alert('Booking', 'Booking Successful!', [
        {
          text: 'OK',
          onPress: () =>
            navigation.navigate('ConfirmService', {
              bookingService: data.data,
              pets: route.params.bookService.pets,
              onRefresh: () => {},
            }),
        },
      ]);
    }
  }, [data]);

  return (
    <BaseScreen
      style={PaymentServiceStyles.container}
      isLoading={isLoading}
      error={error}>
      <View>
        <ToolbarHeader
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => {}}
          title="Payment"
          iconLeft={Drawables.ic_left}
        />
      </View>
      <Button
        title="Payment Later"
        style={{width: '90%', alignSelf: 'center'}}
        onPress={() => bookingService(false)}
      />
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          backgroundColor: Colors.primary,
          width: '90%',
          alignSelf: 'center',
          marginTop: 20,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => setShowGateway(true)}>
        <IconPaypal width={50} height={50} />
        <Text
          style={{
            fontFamily: Fonts.ROBOTO_REGULAR,
            color: Colors.lighter,
            marginStart: 10,
          }}>
          Payment with Paypal
        </Text>
      </TouchableOpacity>
      {showGateway && approvalUrl && (
        <Modal
          visible={showGateway}
          onDismiss={() => setShowGateway(false)}
          onRequestClose={() => setShowGateway(false)}
          animationType={'fade'}
          transparent>
          <View style={PaymentServiceStyles.webViewCon}>
            <View style={PaymentServiceStyles.wbHead}>
              <TouchableOpacity
                style={{padding: 13}}
                onPress={() => setShowGateway(false)}>
                <Feather name={'x'} size={24} />
              </TouchableOpacity>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#00457C',
                }}>
                PayPal GateWay
              </Text>
              <View style={{padding: 13, opacity: prog ? 1 : 0}}>
                <ActivityIndicator size={24} color={progClr} />
              </View>
            </View>
            <WebView
              source={{uri: approvalUrl}}
              style={{flex: 1}}
              onNavigationStateChange={onNavigationStateChange}
              onLoadStart={() => {
                setProg(true);
                setProgClr(Colors.darker);
              }}
              onLoadProgress={() => {
                setProg(true);
                setProgClr(Colors.loadingColor);
              }}
              onLoadEnd={() => {
                setProg(false);
              }}
              onLoad={() => {
                setProg(false);
              }}
            />
          </View>
        </Modal>
      )}
    </BaseScreen>
  );
};

export default PaymentServiceScreen;
