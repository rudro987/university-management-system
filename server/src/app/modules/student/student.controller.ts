import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import config from '../../config';
import logRequestError from '../../utils/logRequestError';
import sendResponse from '../../utils/sendResponse';

// Controller for creating a new student
const createStudent = async (req: Request, res: Response) => {
  const { student: studentData } = req.body;

  try {
    //* Call service function to save student data into the database
    const result = await StudentServices.createStudentIntoDB(studentData);

    //? Send success response
    sendResponse(res, 200, 'Student is created successfully', result);
  } catch (err: any) {
    logRequestError(req, 'Failed to create student', err);

    //! Send error response
    sendResponse(res, 500, 'Failed to create student.', config.node_env === 'production' ? err.message : err.stack);
  }
};

// Controller for retrieving all students
const getAllStudents = async (req: Request, res: Response) => {
  const { requestId } = req; // Middleware-generated request ID
  try {
    //* Call service function to retrieve all students from the database
    const result = await StudentServices.getAllStudentsFromDB();

    if (result?.length === 0) {
      logRequestError(req, 'No data found', { requestId: requestId });
      sendResponse(res, 404, `No data found with`);
      return;
    }

    //? Send success response
    sendResponse(res, 200, 'All Students Data Fetched successfully', result);
  } catch (err: any) {
    logRequestError( req, 'Error occured while retrieving all students data', err );

    //! Send error response
    sendResponse( res, 500, 'Failed to retrieve All students data', config.node_env === 'production' ? err.message : err.stack );
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

    if(!result){
      logRequestError(req, `No student found with the studentId: ${studentId}`, { requestId: requestId });
      sendResponse(res, 404, `No student found with the studentId: ${studentId}`);
      return;
    }

    //? Send success response
    sendResponse(res, 200, "Student's data is retrieved successfully", result);
  } catch (err: any) {
    logRequestError( req, `Failed to retrieve student's data with id: ${studentId}`, err);

    //! Send error response
    sendResponse( res, 500, "Failed to retrieve student's data", config.node_env === 'production' ? err.message : err.stack );
  }
};

// Export controllers as an object
export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
