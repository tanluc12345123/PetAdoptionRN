import { useMutation } from "react-query";
import { Auth, AuthRequest, BookingServiceRequest, ErrorResponse, ObjectResponse, User } from "../model";
import { ApiService } from "../network";
import { Pet, TypePet, Service, Veterinarian, Volunteering, BookingAppointment, BookingAppointmentRequest, BookService, DeviceToken, BookVeterinarian, BookingVeterinarianRequest, BookVolunteering, UpdateUserRequest, ChangePasswordRequest } from '../model/index';
import { LocalStore, LocalStoreKeys } from "../local";

export const useAuth = () => {
  return useMutation<ObjectResponse<Auth>, ErrorResponse, AuthRequest>(auth => {
    return ApiService.login(auth.phone, auth.password);
  });
};

export const usePets = () => {
  return useMutation<ObjectResponse<Pet[]>, ErrorResponse>(() => {
    return ApiService.getPets()
  })
}

export const useTypes = () => {
  return useMutation<ObjectResponse<TypePet[]>, ErrorResponse>(() => {
    return ApiService.getTypes()
  })
}

export const useServices = () => {
  return useMutation<ObjectResponse<Service[]>, ErrorResponse>(() => {
    return ApiService.getServices()
  })
}

export const useVeterinarians = () => {
  return useMutation<ObjectResponse<Veterinarian[]>, ErrorResponse>(() => {
    return ApiService.getVeterinarians()
  })
}

export const useVolunteeringActivities = () => {
  return useMutation<ObjectResponse<Volunteering[]>, ErrorResponse>(() => {
    return ApiService.getVolunteeringActivities()
  })
}

export const useUser = () => {
  return useMutation<ObjectResponse<User>, ErrorResponse, { id: number }>((request) => {
    return ApiService.getUser(request.id)
  })
}

export const useBookingAppointment = () => {
  return useMutation<ObjectResponse<BookingAppointment>, ErrorResponse, BookingAppointmentRequest>((request) => {
    return ApiService.bookingAppointment(request.body, request.user.id, request.pet.id)
  })
}

export const usePetOfUser = () => {
  return useMutation<ObjectResponse<Pet[]>, ErrorResponse, { id: number }>((request) => {
    return ApiService.getPetsOfUser(request.id)
  })
}

export const useAddPet = () => {
  return useMutation<ObjectResponse<Pet>, ErrorResponse, { body: FormData, idType: number, idUser: number }>((request) => {
    return ApiService.addPet(request.idType, request.idUser, request.body)
  })
}

export const useBookingService = () => {
  return useMutation<ObjectResponse<BookService>, ErrorResponse, BookingServiceRequest>((request) => {
    return ApiService.bookingService(request)
  })
}

export const useDeviceToken = () => {
  return useMutation<ObjectResponse<DeviceToken>, ErrorResponse, { deviceToken: string, id: number }>((request) => {
    return ApiService.saveDeviceToken(request.deviceToken, request.id)
  })
}

export const useBookVeterinarian = () => {
  return useMutation<ObjectResponse<BookVeterinarian>, ErrorResponse, BookingVeterinarianRequest>((request) => {
    return ApiService.bookingVeterinarian(request.veterinarian.id, request.user.id, request.body)
  })
}

export const useRegisterVolunteering = () => {
  return useMutation<ObjectResponse<BookVolunteering>, ErrorResponse, { idUser: number, idVolunteering: number }>((request) => {
    return ApiService.registerVolunteeringActivity(request.idUser, request.idVolunteering)
  })
}

export const useUpdateUser = () => {
  return useMutation<ObjectResponse<User>, ErrorResponse, { body: UpdateUserRequest, id: number }>((request) => {
    return ApiService.updateInformationUser(request.id, request.body)
  })
}

export const useUpdateAvatar = () => {
  return useMutation<ObjectResponse<User>, ErrorResponse, { body: FormData, id: number }>((request) => {
    return ApiService.updateAvatar(request.id, request.body)
  })
}

export const useChangePasswordUser = () => {
  return useMutation<ObjectResponse<User>, ErrorResponse, { body: ChangePasswordRequest, id: number }>((request) => {
    return ApiService.changePassword(request.id, request.body)
  })
}

export const useUpdatePet = () => {
  return useMutation<ObjectResponse<Pet>, ErrorResponse, { body: FormData, idPet: number, idType: number }>((request) => {
    return ApiService.updatePet(request.idPet, request.idType, request.body)
  })
}

export const usePetAdoption = () => {
  return useMutation<ObjectResponse<Pet[]>, ErrorResponse, { idPet: number }>((request) => {
    return ApiService.getPetAdoption(request.idPet)
  })
}

export const useAppointmentUser = () => {
  return useMutation<ObjectResponse<BookingAppointment[]>, ErrorResponse, { idUser: number }>((request) => {
    return ApiService.getAppointmentUser(request.idUser)
  })
}

export const useCancel = () => {
  return useMutation<ObjectResponse<BookingAppointment>, ErrorResponse, { id: number }>((request) => {
    return ApiService.cancelAppointment(request.id)
  })
}

export const useBookingServiceUser = () => {
  return useMutation<ObjectResponse<BookService[]>, ErrorResponse, { idUser: number }>((request) => {
    return ApiService.getBookingServiceUser(request.idUser)
  })
}

export const useBookingVeterinarianUser = () => {
  return useMutation<ObjectResponse<BookVeterinarian[]>, ErrorResponse, { idUser: number }>((request) => {
    return ApiService.getBookingVeterinarianUser(request.idUser)
  })
}

export const useRegisteredVolunteeringUser = () => {
  return useMutation<ObjectResponse<BookVolunteering[]>, ErrorResponse, { idUser: number }>((request) => {
    return ApiService.getRegisteredVolunteeringUser(request.idUser)
  })
}

export const useCancelBookingService = () => {
  return useMutation<ObjectResponse<BookService>, ErrorResponse, { id: number }>((request) => {
    return ApiService.cancelBookingService(request.id)
  })
}

export const useCancelBookingVeterinarian = () => {
  return useMutation<ObjectResponse<BookVeterinarian>, ErrorResponse, { id: number }>((request) => {
    return ApiService.cancelBookingVeterinarian(request.id)
  })
}

export const useCancelBookingVolunteering = () => {
  return useMutation<ObjectResponse<BookVolunteering>, ErrorResponse, { id: number, reason: string }>((request) => {
    return ApiService.cancelBookingVolunteering(request.id, request.reason)
  })
}

export const useFilter = () => {
  return useMutation<ObjectResponse<Pet[]>, ErrorResponse, { keyword: string, type: string, minAge: number, maxAge: number, gender: string }>((request) => {
    return ApiService.filterPet(request.keyword, request.type, request.minAge, request.maxAge, request.gender)
  })
}

export const useGenerate = () => {
  return useMutation<ObjectResponse<undefined>, ErrorResponse, { phone: string }>((request) => {
    return ApiService.generateOTP(request.phone)
  })
}

export const useVerify = () => {
  return useMutation<ObjectResponse<undefined>, ErrorResponse, { phone: string, code: string }>((request) => {
    return ApiService.verifyOTP(request.phone, request.code)
  })
}

export const useRegisterUser = () => {
  return useMutation<ObjectResponse<undefined>, ErrorResponse, { phone: string, password: string }>((request) => {
    return ApiService.register(request.phone, request.password)
  })
}
