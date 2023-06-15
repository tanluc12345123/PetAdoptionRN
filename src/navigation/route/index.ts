import type { RouteProp } from '@react-navigation/native';
import RootStackParamList, { HomeTabParamList } from '../stacks/RootStackParamList';
import type { StackScreenProps } from '@react-navigation/stack';
import type {
    CompositeScreenProps,
} from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type DetailPetRouteProp = RouteProp<RootStackParamList, 'DetailPet'>;

export type BookingAppointmentRouteProp = RouteProp<RootStackParamList, 'BookingAppointment'>;
export type PaymentRouteProp = RouteProp<RootStackParamList, 'Payment'>;
export type ConfirmPetRouteProp = RouteProp<RootStackParamList, 'ConfirmPet'>;

export type DetailServiceRouteProp = RouteProp<RootStackParamList, 'DetailService'>;
export type BookServiceRouteProp = RouteProp<RootStackParamList, 'BookService'>;
export type PaymentServiceRouteProp = RouteProp<RootStackParamList, 'PaymentService'>;
export type ConfirmServiceRouteProp = RouteProp<RootStackParamList, 'ConfirmService'>;

export type DetailVeterinarianRouteProp = RouteProp<RootStackParamList, 'DetailVeterinarian'>;
export type BookVeterinarianRouteProp = RouteProp<RootStackParamList, 'BookVeterinarian'>;
export type PaymentVeterinarianRouteProp = RouteProp<RootStackParamList, 'PaymentVeterinarian'>;
export type ConfirmVeterinarianRouteProp = RouteProp<RootStackParamList, 'ConfirmVeterinarian'>;

export type DetailVolunteeringRouteProp = RouteProp<RootStackParamList, 'DetailVolunteering'>;
export type BookVolunteeringRouteProp = RouteProp<RootStackParamList, 'BookVolunteering'>;
export type ConfirmVolunteeringRouteProp = RouteProp<RootStackParamList, 'ConfirmVolunteering'>;
export type VerifyOTPRouteProp = RouteProp<RootStackParamList, 'EnterOTP'>;
export type RegisterRouteProp = RouteProp<RootStackParamList, 'EnterPassword'>;

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<HomeTabParamList, T>,
        RootStackScreenProps<keyof RootStackParamList>
    >;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}