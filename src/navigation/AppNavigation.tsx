import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import DetailPetScreen from '../features/detailpet/DetailPetScreen';
import RootStackParamList from './stacks/RootStackParamList';
import BottomNavigation from './BottomNavigation';
import DetailServiceScreen from '../features/detailservice/DetailServiceScreen';
import DetailVeterinarianScreen from '../features/detailveterinarian/DetailVeterinarianScreen';
import DetailVolunteeringScreen from '../features/detailvolunteering/DetailVolunteeringScreen';
import LoginScreen from '../features/login/LoginScreen';
import BookingAppointmentScreen from '../features/bookingappointment/BookingAppointmentScreen';
import PaymentScreen from '../features/payment/PaymentScreen';
import ConfirmPetScreen from '../features/confirm/ConfirmPetScreen';
import BookServiceScreen from '../features/bookservice/BookServiceScreen';
import PaymentServiceScreen from '../features/paymentservice/PaymentServiceScreen';
import ConfirmServiceScreen from '../features/confirmservice/ConfirmServiceScreen';
import SplashScreen from '../features/splash/SplashScreen';
import BookVeterinarianScreen from '../features/bookveterinarian/BookVeterinarianScreen';
import PaymentVeterinarianScreen from '../features/paymentveterinarian/PaymentVeterinarianScreen';
import ConfirmVeterinarianScreen from '../features/confirmveterinarian/ConfirmVeterinarianScreen';
import BookingVolunteeringScreen from '../features/bookingvolunteering/BookingVolunteeringScreen';
import ConfirmVolunteeringScreen from '../features/confirmvolunteering/ConfirmVolunteeringScreen';
import MyProfileScreen from '../features/myprofile/MyProfileScreen';
import ChangePasswordScreen from '../features/changepassword/ChangePasswordScreen';
import MyPetProfileScreen from '../features/mypetprofile/MyPetProfileScreen';
import HistoryScreen from '../features/history/HistoryScreen';
import SearchScreen from '../features/search/SearchScreen';
import RegisterScreen from '../features/register/RegisterScreen';
import EnterOTPScreen from '../features/enterotp/EnterOTPScreen';
import EnterPasswordScreen from '../features/enterpassword/EnterPasswordScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="HomeTab" component={BottomNavigation} />
      <Stack.Screen name="DetailPet" component={DetailPetScreen} />
      <Stack.Screen name="DetailService" component={DetailServiceScreen} />
      <Stack.Screen
        name="DetailVeterinarian"
        component={DetailVeterinarianScreen}
      />
      <Stack.Screen
        name="DetailVolunteering"
        component={DetailVolunteeringScreen}
      />
      <Stack.Screen
        name="BookingAppointment"
        component={BookingAppointmentScreen}
      />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="ConfirmPet" component={ConfirmPetScreen} />

      <Stack.Screen name="BookService" component={BookServiceScreen} />
      <Stack.Screen name="PaymentService" component={PaymentServiceScreen} />
      <Stack.Screen name="ConfirmService" component={ConfirmServiceScreen} />
      <Stack.Screen
        name="BookVeterinarian"
        component={BookVeterinarianScreen}
      />
      <Stack.Screen
        name="PaymentVeterinarian"
        component={PaymentVeterinarianScreen}
      />
      <Stack.Screen
        name="ConfirmVeterinarian"
        component={ConfirmVeterinarianScreen}
      />
      <Stack.Screen
        name="BookVolunteering"
        component={BookingVolunteeringScreen}
      />
      <Stack.Screen
        name="ConfirmVolunteering"
        component={ConfirmVolunteeringScreen}
      />
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="MyPetTab" component={MyPetProfileScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="EnterOTP" component={EnterOTPScreen} />
      <Stack.Screen name="EnterPassword" component={EnterPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
