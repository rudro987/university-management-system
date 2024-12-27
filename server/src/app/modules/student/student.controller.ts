import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import logger, { logError, logOperation } from '../../utils/logger';
import config from '../../config';

// Controller for creating a new student
const createStudent = async (req: Request, res: Response) => {
  const { student: studentData } = req.body;
  const { requestId } = req; // Middleware-generated request ID

  try {
    //* Call service function to save student data into the database
    const result = await StudentServices.createStudentIntoDB(studentData);

    logOperation('Student created successfully', { requestId, studentId: result?.id });

    //? Send success response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err: any) {
    logError('Failed to create student', { requestId, err });

    //! Send error response
    res.status(500).json({
      success: false,
      message: 'Failed to create student.',
      error: config.node_env === 'production' ? err.message : err.stack,
    });
  }
};

// Controller for retrieving all students
const getAllStudents = async (req: Request, res: Response) => {
  const { requestId } = req; // Middleware-generated request ID
  try {
    //* Call service function to retrieve all students from the database
    const result = await StudentServices.getAllStudentsFromDB();

    logOperation('All Students Data Fetched successfully', { requestId: requestId });

    //? Send success response
    res.status(200).json({
      success: true,
      message: 'All Students Data Fetched successfully',
      data: result,
    });
  } catch (err: any) {
    logError('Error occured while retrieving all students data', { requestId, err });

    //! Send error response
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve All students data',
      error: config.node_env === 'production' ? err.message : err.stack,
    });
  }
};

// Controller for retrieving a single student by ID
const getSingleStudent = async (req: Request, res: Response) => {
  //* Extract student ID from request parameters
  const { studentId } = req.params;
  const { requestId } = req; // Middleware-generated request ID

  try {
    //* Call service function to retrieve student data
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    logOperation("Student's data is retrieved successfully", { requestId, studentId: result?.id });

    //? Send success response
    res.status(200).json({
      success: true,
      message: "Student's data is retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    logError(`Failed to retrieve student's data with id: ${studentId}`, { requestId, err });

    //! Send error response
    res.status(500).json({
      success: false,
      message: "Failed to retrieve student's data",
      error: config.node_env === 'production' ? err.message : err.stack,
    });
  }
};

// Export controllers as an object
export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
