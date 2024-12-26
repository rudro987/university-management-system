//* Type representing a student's name
export type TStudentName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

//* Type representing guardian details (e.g., parent or legal guardian)
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  address: string;
};

//* Type representing a local guardian (non-parental guardian)
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

//* Main type representing a student in the system
export type TStudent = {
  id: string; // Unique identifier for the student
  name: TStudentName; // Nested structure for student's full name
  gender: 'male' | 'female' | 'other'; // Gender of the student
  dateOfBirth?: string; // Optional date of birth
  email: string; // Student's email address
  contactNo: string; // Primary contact number
  emergencyContactNo: string; // Emergency contact number
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'; // Optional blood group
  presentAddress: string; // Current address
  permanentAddress: string; // Permanent address
  guardian: TGuardian; // Details about the primary guardian
  localGuardian: TLocalGuardian; // Details about the local guardian
  profileImg?: string; // Optional profile image URL
  isActive: 'active' | 'blocked'; // Status of the student
  isDeleted: boolean; // Indicates if the student record is deleted
  createdAt: string; // Timestamp of creation
  updatedAt: string; // Timestamp of last update
};
