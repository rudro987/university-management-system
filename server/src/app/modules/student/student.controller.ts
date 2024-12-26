import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import logger from '../../utils/logger';

// Controller for creating a new student
const createStudent = async (req: Request, res: Response) => {
  const { student: studentData } = req.body;

  logger.info('POST /create-student - Request received', { body: studentData });

  try {
    //* Call service function to save student data into the database
    const result = await StudentServices.createStudentIntoDB(studentData);

    logger.info('POST /create-student - Student created successfully', {
      result,
    });

    //? Send success response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err: any) {
    logger.error('POST /create-student - Error occurred', {
      error: err.message,
    });

    //! Send error response
    res.status(500).json({
      success: false,
      message: 'Failed to create student.',
      error: err,
    });
  }
};

// Controller for retrieving all students
const getAllStudents = async (req: Request, res: Response) => {
  logger.info('GET / - Request received for all students data');
  try {
    //* Call service function to retrieve all students from the database
    const result = await StudentServices.getAllStudentsFromDB();

    if (!result.length) {
      logger.warn('GET / - No Data retrieved');
      
    }
    logger.info('GET / - All Students data retrieved successfully');

    //? Send success response
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    logger.error('GET / - Error occured while retrieving all students data', {
      error: err.message,
    });
    //! Send error response
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve All students data',
      error: err,
    });
  }
};

// Controller for retrieving a single student by ID
const getSingleStudent = async (req: Request, res: Response) => {
  const { studentId } = req.params;
  try {
    //* Extract student ID from request parameters

    logger.info(
      `GET /:studentId - Request received for fetching student with ID: ${studentId}`,
    );

    //* Call service function to retrieve student data
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    if (!result) {
      logger.warn(
        `GET /:studentId - Request failed for fetching student with ID: ${studentId}`,
      );
    }
    logger.info(
      `GET /:studentId - Request success for fetching student with ID: ${studentId}`,
    );

    //? Send success response
    res.status(200).json({
      success: true,
      message: "Student's data is retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    logger.error(
      `GET /:studentId - Error occured while fetching student with ID: ${studentId}`,
      {
        error: err.message,
      },
    );
    //! Send error response
    res.status(500).json({
      success: false,
      message: "Failed to retrieve student's data",
      error: err,
    });
  }
};

// Export controllers as an object
export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
