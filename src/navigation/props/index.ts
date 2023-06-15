import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootStackParamList from "../stacks/RootStackParamList";

// Home Screen prop
export type RootProps = NativeStackNavigationProp<RootStackParamList, "HomeTab">;

export type DetailPetRootProps = NativeStackNavigationProp<RootStackParamList, "DetailPet">;

export type DetailServiceRootProps = NativeStackNavigationProp<RootStackParamList, "DetailService">;

export type DetailVeterinarianRootProps = NativeStackNavigationProp<RootStackParamList, "DetailVeterinarian">;
export type BookVeterinarianRootProp = NativeStackNavigationProp<RootStackParamList, 'BookVeterinarian'>;
export type PaymentVeterinarianRootProp = NativeStackNavigationProp<RootStackParamList, 'PaymentVeterinarian'>;
export type ConfirmVeterinarianRootProp = NativeStackNavigationProp<RootStackParamList, 'ConfirmVeterinarian'>;

export type DetailVolunteeringRootProps = NativeStackNavigationProp<RootStackParamList, "DetailVolunteering">;
export type BookVolunteeringRootProp = NativeStackNavigationProp<RootStackParamList, 'BookVolunteering'>;
export type ConfirmVolunteeringRootProp = NativeStackNavigationProp<RootStackParamList, 'ConfirmVolunteering'>;

export type LoginRootProps = NativeStackNavigationProp<RootStackParamList, "Login">;
export type RegisterRootProps = NativeStackNavigationProp<RootStackParamList, "Register">;
export type VerifyOTPRootProps = NativeStackNavigationProp<RootStackParamList, "EnterOTP">;
export type RegisterUserRootProps = NativeStackNavigationProp<RootStackParamList, "EnterPassword">;

export type BookingAppointmentRootProps = NativeStackNavigationProp<RootStackParamList, "BookingAppointment">;

export type PaymentRootProps = NativeStackNavigationProp<RootStackParamList, "Payment">;

export type ConfirmPetRootProps = NativeStackNavigationProp<RootStackParamList, "ConfirmPet">;

export type DetailServiceRootProp = NativeStackNavigationProp<RootStackParamList, 'DetailService'>;
export type BookServiceRootProp = NativeStackNavigationProp<RootStackParamList, 'BookService'>;
export type PaymentServiceRootProp = NativeStackNavigationProp<RootStackParamList, 'PaymentService'>;
export type ConfirmServiceRootProp = NativeStackNavigationProp<RootStackParamList, 'ConfirmService'>;

export type SplashRootProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;
export type MyProfileRootProp = NativeStackNavigationProp<RootStackParamList, 'MyProfile'>;
export type ChangePasswordRootProp = NativeStackNavigationProp<RootStackParamList, 'ChangePassword'>;
export type MyPetProfileRootProp = NativeStackNavigationProp<RootStackParamList, 'MyPetTab'>;
export type HistoryRootProp = NativeStackNavigationProp<RootStackParamList, 'History'>;
export type SearchRootProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;
