export type Auth = {
  token: string;
  type: string;
  id: number;
  fullName: string;
  phone: string;
  roles: string[];
  expiresAt: Date;
};

export type ErrorResponse = {
  message: string;
  error: string;
  path: string;
  statusCode: number;
  timestamp: string;
};

export type AuthRequest = {
  phone: string;
  password: string;
};

export type LocationState = {
  latLocation: number;
  longLocation: number;
};

export type AuthState = {
  token: string | null;
  expiresAt: Date | null;
}

export type ObjectResponse<T> = {
  status: string;
  message: string;
  data: T
}

export type PetImage = {
  id: number;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
};

export type Status = {
  id: number;
  sterilization: boolean;
  rabiesVaccination: boolean;
  vaccination: boolean;
  safe: boolean;
};

export type Pet = {
  id: number;
  name: string;
  gender: boolean;
  breed: string;
  color: string;
  age: number;
  weight: number;
  price: number;
  description: string;
  payment: boolean;
  dateReceived: Date;
  dateAdopt: Date;
  statusAdopt: boolean;
  eTypeOwnership: string;
  nameType: string;
  petImage: PetImage;
  status: Status;
  typeId: number;
};

export type TypePet = {
  id: number;
  nameType: string;
}

export type Service = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  typeService: string;
}

export type Veterinarian = {
  id: number;
  name: string;
  phoneNumber: string;
  address: string;
  price: number;
  description: string;
  image: string;
}

export type Volunteering = {
  id: number;
  name: string;
  numberPeople: string;
  requirement: string;
  dateOfEvent: string;
  description: string;
  image: string;
  status: string;
}

export type User = {
  id: number;
  phone: string;
  email: string;
  fullName: string;
  gender: boolean;
  birthday: Date;
  career: string;
  address: string;
  avatar: string;
}

export type BookingAppointmentRequest = {
  user: User;
  pet: Pet;
  body: FormData
}

export type BookingAppointment = {
  id: number;
  dateStart: Date;
  visitingTimeStart: string;
  payment: boolean;
  status: string;
  user: User;
  pet: Pet
}

export type BookService = {
  id: number;
  dateOrder: Date;
  dateStart: Date;
  visitingTimeStart: string;
  dateEnd: Date;
  visitingTimeEnd: string;
  totalPrice: number;
  payment: boolean;
  status: string;
  user: User;
  pet: Pet;
  service: Service;
}

export type BookingAppointmentParams = {
  user: User;
  pet: Pet;
  visitingDate: string;
  visitingTime: string;
  payment: boolean;
}

export type BookingServiceParams = {
  user: User;
  pets: Pet[];
  service: Service;
  startDay: string;
  endDate: string;
  payment: boolean;
  visitingTimeStart: string;
  visitingTimeEnd: string;
  totalPrice: number;
}

export type BookingServiceRequest = {
  user: User;
  service: Service;
  pet: Pet;
  dateStart: string;
  visitingTimeStart: string;
  dateEnd: string;
  visitingTimeEnd: string;
  payment: boolean;
}

export type DeviceToken = {
  id: number;
  deviceToken: string;
}

export type BookingVeterinarianParams = {
  user: User;
  veterinarian: Veterinarian;
  dateStart: string;
  dateEnd: string;
  payment: boolean;
  totalPrice: number;
}

export type BookingVeterinarianRequest = {
  user: User;
  veterinarian: Veterinarian;
  body: FormData
}

export type BookVeterinarian = {
  id: number;
  dateOrder: Date;
  dateStart: Date;
  dateEnd: Date;
  totalPrice: number;
  payment: boolean;
  status: string;
  user: User;
  veterinarian: Veterinarian;
}

export type BookVolunteering = {
  id: number;
  user: User;
  volunteer: Volunteering;
  complete: string;
  reason: string;
}

export type UpdateUserRequest = {
  fullName: string;
  gender: boolean;
  email:string;
  birthday: string;
  phone: string;
  career: string;
  address: string;
}

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
