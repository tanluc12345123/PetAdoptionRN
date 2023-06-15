import { NavigatorScreenParams } from '@react-navigation/native';
import { Pet, Service, Veterinarian, Volunteering, BookingAppointmentParams, BookService, BookingServiceParams, BookingVeterinarianParams, BookVeterinarian, BookingAppointment, BookVolunteering } from '../../data/model/index';
export type HomeTabParamList = {
  Home: undefined;
  Pet: undefined;
  Service: { type: string } | undefined;
  Volunteering: undefined;
  Profile: { id: string } | undefined;
};

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  EnterOTP: { phone: string };
  EnterPassword: { phone: string };
  HomeTab: NavigatorScreenParams<HomeTabParamList>;
  MyPetTab: undefined;
  DetailPet: { pet: Pet };
  DetailService: { service: Service, onHire(): void };
  DetailVeterinarian: { veterinarian: Veterinarian };
  DetailVolunteering: { volunteering: Volunteering };
  BookingAppointment: { pet: Pet };
  Payment: { bookingAppointment: BookingAppointmentParams };
  ConfirmPet: { bookingAppointment: BookingAppointment, edit?: boolean, onRefresh(): void };
  BookService: { service: Service, hire?: { pet: Pet } },
  PaymentService: { bookService: BookingServiceParams },
  ConfirmService: { bookingService: BookService, pets: Pet[], edit?: boolean, onRefresh(): void }
  BookVeterinarian: { veterinarian: Veterinarian },
  PaymentVeterinarian: { bookVeterinarian: BookingVeterinarianParams },
  ConfirmVeterinarian: { bookingVeterinarian: BookVeterinarian, edit?: boolean, onRefresh(): void }
  BookVolunteering: { volunteering: Volunteering },
  ConfirmVolunteering: { booking: BookVolunteering, edit?: boolean, onRefresh(): void }
  MyProfile: undefined,
  ChangePassword: undefined,
  History: undefined,
  Search: undefined,
}

export default RootStackParamList;
