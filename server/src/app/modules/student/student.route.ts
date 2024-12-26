import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

//?will call controller function for creating student from this route
router.post('/create-student', StudentControllers.createStudent);

//?will call controller function for getting all students data from this route
router.get('/', StudentControllers.getAllStudents);

//?will call controller function for getting single student's data based on studentId from this route
router.get('/:studentId', StudentControllers.getSingleStudent);

export const StudentRoutes = router;