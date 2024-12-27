import { logError, logOperation } from '../../utils/logger';
import redisClient from '../../utils/redis';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (student: TStudent) => {
  try {
    const result = await Student.create(student);
    logOperation('Student created successfully in database', {
      studentId: result.id,
    });

    await redisClient.del('students:all'); // Invalidate cache

    return result;
  } catch (error) {
    logError('Error inserting student into database', { error });
  }
};

const getAllStudentsFromDB = async () => {
  try {
    const cacheKey = 'students:all';
    //? Check cache for existing data
    const cachedAllStudentsData: string | null =
      await redisClient.get(cacheKey);

    if (cachedAllStudentsData) {
      const studentsData = JSON.parse(cachedAllStudentsData);
      logOperation('Cache hit for all students data', { data: studentsData });
      return studentsData; // Return cached data
    }

    //*Fetch from DB if not cached
    const result = await Student.find();

    logOperation('All students data fetched from DB', { data: result });

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(result)); // Cache result

    return result;
  } catch (error) {
    logError('Error fetching all students from database', { error });
  }
};

const getSingleStudentFromDB = async (id: string) => {
  try {
    const cacheKey = `students:${id}`;

    //? Check cache for existing data
    const cachedStudentData: string | null = await redisClient.get(cacheKey);

    if (cachedStudentData) {
      const studentData = JSON.parse(cachedStudentData);
      logOperation(`Cache hit for student ID: ${id}`, {
        studentId: studentData.id,
      });
      return studentData;
    }

    //*Fetch from DB if not cached
    const result = await Student.findOne({ id });

    logOperation(`Student fetched from DB with ID: ${id}`, {
      studentId: result?.id,
    });

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(result)); // Cache result
    return result;
  } catch (error) {
    logError(`Error fetching student with ID: ${id} from database`, { error });
  }
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
