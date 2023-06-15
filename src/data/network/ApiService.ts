import { Auth, User } from "../model";
import { ApiClient } from "./ApiClient";
import { ObjectResponse, Pet, TypePet, Service, Veterinarian, Volunteering, BookingAppointment, BookService, BookingServiceRequest, DeviceToken, BookVeterinarian, BookVolunteering, UpdateUserRequest, ChangePasswordRequest } from '../model/index';
import Route from "./Route";
const config = {
  headers: { 'content-type': 'multipart/form-data' }
}

export const ApiService = {
  login: (phone: string, password: string) => {
    return ApiClient.post<never, ObjectResponse<Auth>>("/auth/signin", {
      phone: phone,
      password: password,
    });
  },
  getPets: () => {
    return ApiClient.get<never, ObjectResponse<Pet[]>>(Route.NO_LOGIN + Route.PETS + '?trash=false')
  },
  getTypes: () => {
    return ApiClient.get<never, ObjectResponse<TypePet[]>>(Route.NO_LOGIN + Route.TYPES)
  },
  getServices: () => {
    return ApiClient.get<never, ObjectResponse<Service[]>>(Route.NO_LOGIN + Route.SERVICES)
  },
  getVeterinarians: () => {
    return ApiClient.get<never, ObjectResponse<Veterinarian[]>>(Route.NO_LOGIN + Route.VETERINARIANS)
  },
  getVolunteeringActivities: () => {
    return ApiClient.get<never, ObjectResponse<Volunteering[]>>(Route.NO_LOGIN + Route.VOLUNTEERING + Route.STATUS + '?status=')
  },
  getUser: (id: number) => {
    return ApiClient.get<never, ObjectResponse<User>>(Route.USERS + '/' + id)
  },
  bookingAppointment: (body: FormData, idUser: number, idPet: number) => {
    return ApiClient.post<never, ObjectResponse<BookingAppointment>>(Route.USERS + '/' + idUser + Route.PET + '/' + idPet, body, config)
  },
  getPetsOfUser: (id: number) => {
    return ApiClient.get<never, ObjectResponse<Pet[]>>(Route.USERS + '/' + id + Route.PETS)
  },
  addPet: (idType: number, idUser: number, body: FormData) => {
    return ApiClient.post<never, ObjectResponse<Pet>>(Route.PETS + Route.TYPES + '/' + idType + Route.USER + '/' + idUser, body, config)
  },
  bookingService: (request: BookingServiceRequest) => {
    return ApiClient.post<never, ObjectResponse<BookService>>(Route.USERS + Route.PET + '/' + request.pet.id + Route.SERVICE + '/' + request.service.id + Route.USER + '/' + request.user.id + Route.BOOKING_SERVICE + '?startDay=' + request.dateStart + '&endDate=' + request.dateEnd + '&visitingTimeStart=' + request.visitingTimeStart + '&visitingTimeEnd=' + request.visitingTimeEnd + '&payment=' + request.payment)
  },
  saveDeviceToken: (deviceToken: string, id: number) => {
    return ApiClient.post<never, ObjectResponse<DeviceToken>>(Route.DEVICE_TOKEN + Route.SAVE + '/' + id + '?deviceToken=' + deviceToken)
  },
  bookingVeterinarian: (idVeterinarian: number, idUser: number, body: FormData) => {
    return ApiClient.post<never, ObjectResponse<BookVeterinarian>>(Route.USERS + Route.VETERINARIAN + '/' + idVeterinarian + Route.USER + '/' + idUser + Route.BOOKING_VETERINARIAN, body, config)
  },
  registerVolunteeringActivity: (idUser: number, idVolunteer: number) => {
    return ApiClient.post<never, ObjectResponse<BookVolunteering>>(Route.USERS + '/' + idUser + Route.VOLUNTEERING + '/' + idVolunteer)
  },
  updateInformationUser: (idUser: number, body: UpdateUserRequest) => {
    return ApiClient.put<never, ObjectResponse<User>>(Route.USERS + '/' + idUser + Route.UPDATE, body)
  },
  updateAvatar: (idUser: number, body: FormData) => {
    return ApiClient.put<never, ObjectResponse<User>>(Route.USERS + '/' + idUser + Route.UPDATE + Route.AVATAR, body, config)
  },
  changePassword: (idUser: number, body: ChangePasswordRequest) => {
    return ApiClient.put<never, ObjectResponse<User>>(Route.USERS + '/' + idUser + Route.CHANGE_PASSWORD, body)
  },
  updatePet: (idPet: number, idType: number, body: FormData) => {
    return ApiClient.put<never, ObjectResponse<Pet>>(Route.PETS + '/' + idPet + Route.TYPES + '/' + idType, body, config)
  },
  getPetAdoption: (idUser: number) => {
    return ApiClient.get<never, ObjectResponse<Pet[]>>(Route.PETS + Route.USER + '/' + idUser)
  },
  getAppointmentUser: (idUser: number) => {
    return ApiClient.get<never, ObjectResponse<BookingAppointment[]>>(Route.USERS + '/' + idUser + Route.APPOINTMENT)
  },
  cancelAppointment: (id: number) => {
    return ApiClient.put<never, ObjectResponse<BookingAppointment>>(Route.USERS + Route.APPOINTMENT + '/' + id + Route.STATUS + '?status=CANCEL&role=user')
  },
  getBookingServiceUser: (idUser: number) => {
    return ApiClient.get<never, ObjectResponse<BookService[]>>(Route.USERS + '/' + idUser + Route.BOOKING_SERVICE)
  },
  getBookingVeterinarianUser: (idUser: number) => {
    return ApiClient.get<never, ObjectResponse<BookVeterinarian[]>>(Route.USERS + '/' + idUser + Route.BOOKING_VETERINARIAN)
  },
  getRegisteredVolunteeringUser: (idUser: number) => {
    return ApiClient.get<never, ObjectResponse<BookVolunteering[]>>(Route.USERS + '/' + idUser + Route.REGISTERED_VOLUNTEERING)
  },
  cancelBookingService: (id: number) => {
    return ApiClient.put<never, ObjectResponse<BookService>>(Route.USERS + Route.BOOKING_SERVICE + '/' + id + Route.CANCEL + '?role=user')
  },
  cancelBookingVeterinarian: (id: number) => {
    return ApiClient.put<never, ObjectResponse<BookVeterinarian>>(Route.USERS + Route.BOOKING_VETERINARIAN + '/' + id + Route.CANCEL + '?role=user')
  },
  cancelBookingVolunteering: (id: number, reason: string) => {
    return ApiClient.put<never, ObjectResponse<BookVolunteering>>(Route.USERS + '/' + id + Route.CANCEL + '?role=user&reason=' + reason)
  },
  filterPet: (keyword: string, type: string, minAge: number, maxAge: number, gender: string) => {
    return ApiClient.get<never, ObjectResponse<Pet[]>>(Route.NO_LOGIN + Route.PETS + Route.SEARCH + '?keyword=' + keyword + '&type=' + type + '&sterilization=' + '&minAge=' + minAge + '&maxAge=' + maxAge + '&gender=' + gender)
  },
  generateOTP: (phone: string) => {
    return ApiClient.get<never, ObjectResponse<undefined>>(Route.AUTH + Route.GENERATE_OTP + '?phone=' + phone)
  },
  verifyOTP: (phone: string, code: string) => {
    return ApiClient.get<never, ObjectResponse<undefined>>(Route.AUTH + Route.VERIFY_OTP + '?phone=' + phone + '&code=' + code)
  },
  register: (phone: string, password: string) => {
    return ApiClient.post<never, ObjectResponse<any>>(Route.AUTH + Route.SIGN_UP, {
      phone: phone,
      password: password,
    })
  },
};
