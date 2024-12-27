import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import logger from '../../utils/logger';
import config from '../../config';

// Controller for creating a new student
const createStudent = async (req: Request, res: Response) => {
  const { student: studentData } = req.body;

  logger.info('POST /create-student - Request received', { body: studentData });

  try {
    //* Call service function to save student data into the database
    const result = await StudentServices.createStudentIntoDB(studentData);

    if (!result) {
      logger.info('POST /create-student - Student created successfully');
      return res.status(500).json({
        success: false,
        message: 'Failed to create student.',
      });
    }

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
      error: config.node_env === 'production' ? err.message : err.stack,
    });
  }
};

// Controller for retrieving all students
const getAllStudents = async (req: Request, res: Response) => {
  logger.info('GET / - Request received for all students data');
  try {
    //* Call service function to retrieve all students from the database
    const result = await StudentServices.getAllStudentsFromDB();

    if (!result?.length) {
      logger.warn('GET / - No Data retrieved');
      return res.status(404).json({
        success: false,
        message: 'No students found.',
      });
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
      error: config.node_env === 'production' ? err.message : err.stack,
    });
  }
};

// Controller for retrieving a single student by ID
const getSingleStudent = async (req: Request, res: Response) => {
  //* Extract student ID from request parameters
  const { studentId } = req.params;

  if (!studentId) {
    logger.error('GET /:studentId - Missing student ID in request.');
    return res.status(400).json({
      success: false,
      message: 'Student ID is required.',
    });
  }

  logger.info(
    `GET /:studentId - Request received for fetching student with ID: ${studentId}`,
  );

  try {
    //* Call service function to retrieve student data
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    if (!result) {
      logger.warn(
        `GET /:studentId - Request failed for fetching student with ID: ${studentId}`,
      );
      return res.status(404).json({
        success: false,
        message: 'Student not found.',
      });
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
