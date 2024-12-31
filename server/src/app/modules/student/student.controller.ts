import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';

// Controller for creating a new student
const createStudent = async (req: Request, res: Response) => {
  const { student: studentData } = req.body;

  const result = await StudentServices.createStudentIntoDB(studentData);

  //? Send success response
  sendResponse(res, 200, 'Student is created successfully', result);
};

// Controller for retrieving all students
const getAllStudents = async (req: Request, res: Response) => {
  //* Call service function to retrieve all students from the database
  const result = await StudentServices.getAllStudentsFromDB();

  //? Send success response
  sendResponse(res, 200, 'All Students Data Fetched successfully', result);
};

// Controller for retrieving a single student by ID
const getSingleStudent = async (req: Request, res: Response) => {
  //* Extract student ID from request parameters
  const { studentId } = req.params;
  //* Call service function to retrieve student data
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  //? Send success response
  sendResponse(res, 200, "Student's data is retrieved successfully", result);
};

// Export controllers as an object
export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
