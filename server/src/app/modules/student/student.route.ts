import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

//? Route for creating a new student.
//? Calls the `createStudent` controller.
router.post('/create-student', StudentControllers.createStudent);

//? Route for retrieving all students
//? Calls the `getAllStudents` controller
router.get('/', StudentControllers.getAllStudents);

//? Route for retrieving a single student by ID
//? Calls the `getSingleStudent` controller
router.get('/:studentId', StudentControllers.getSingleStudent);

export const StudentRoutes = router;