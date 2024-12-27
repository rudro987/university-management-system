import handleAsync from '../../utils/handleAsync';
import logger from '../../utils/logger';
import redisClient from '../../utils/redis';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = handleAsync(async (student: TStudent) => {
  logger.info('Creating student in database');

  const result = await Student.create(student);

  if (!result) {
    logger.error('Failed to create student in database');
    return null;
  }

  logger.info('Student created successfully in database', { result });

  return result;
});

const getAllStudentsFromDB = handleAsync(async () => {
  logger.info('Fetching all student data from database');

  const cacheKey = 'students:all';

  //? Check cache for existing data
  const cachedAllStudentsData: string | null = await redisClient.get(cacheKey);

  if (cachedAllStudentsData) {
    logger.info('Cache hit for all students data');
    return JSON.parse(cachedAllStudentsData); // Return cached data
  }

  //*Fetch from DB if not cached
  const result = await Student.find();

  if (!result || result.length === 0) {
    logger.warn('No data found');
    return [];
  }

  logger.info('All students data fetched from DB');

  await redisClient.setEx(cacheKey, 3600, JSON.stringify(result)); // Cache result

  return result;
});

const getSingleStudentFromDB = handleAsync(async (id: string) => {
  logger.info(`Fetching student from DB with ID: ${id}`); // Log the operation

  const cacheKey = `students:${id}`;

  //? Check cache for existing data
  const cachedStudentData: string | null = await redisClient.get(cacheKey);

  if (cachedStudentData) {
    logger.info(`Cache hit for student ID: ${id}`);
    return JSON.parse(cachedStudentData);
  }

  //*Fetch from DB if not cached
  const result = await Student.findOne({ id });

  if (!result) {
    logger.warn(`No student found with ID: ${id}`);
    return null;
  }

  logger.info(`Student fetched from DB with ID: ${id}`);

  await redisClient.setEx(cacheKey, 3600, JSON.stringify(result)); // Cache result
  return result;
});

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
