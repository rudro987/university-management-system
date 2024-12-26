import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TStudentName,
} from './student.interface';

//? Schema for student's full name
const studentNameSchema = new Schema<TStudentName>({
  firstName: {
    type: String,
    required: true, //? First name is mandatory
  },
  middleName: {
    type: String, //? Optional middle name
  },
  lastName: {
    type: String,
    required: true, //? Last name is mandatory
  },
});

//? Schema for guardian details (e.g., parents)
const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

//? Schema for local guardian details (non-parental guardian)
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

//? Main schema for Student entity
const studentSchema = new Schema<TStudent>({
  id: {
    type: String,
    unique: true, // Unique identifier for the student
  },
  name: studentNameSchema, // Embedded schema for student's name
  gender: {
    type: String,
    enum: ['male', 'female'], // Allowed values for gender
    required: true,
  },
  dateOfBirth: { type: String }, // Optional date of birth
  email: {
    type: String,
    required: true, // Mandatory email field
    unique: true, // Email must be unique
  },
  contactNo: {
    type: String,
    required: true, // Primary contact number
  },
  emergencyContactNo: {
    type: String,
    required: true, // Emergency contact number
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // Allowed blood group values
  },
  presentAddress: {
    type: String,
    required: true, // Mandatory present address
  },
  permanentAddress: {
    type: String,
    required: true, // Mandatory permanent address
  },
  guardian: guardianSchema, // Embedded schema for guardian details
  localGuardian: localGuardianSchema, // Embedded schema for local guardian details
  profileImg: {
    type: String, // Optional profile image URL
  },
  isActive: {
    type: String,
    enum: ['active', 'blocked'], // Allowed statuses
    default: 'active', // Default status is active
  },
  isDeleted: {
    type: Boolean,
    default: false, // Default value for deletion flag
  },
});

// Add an index for the `email` field
studentSchema.index({ email: 1 }); // Ensures fast queries on the `email` field

// Exporting the Student model
export const Student = model<TStudent>('Student', studentSchema);
