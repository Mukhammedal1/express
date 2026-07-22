import { Router } from "express";
import {
  addTask,
  findAllTasks,
  findTaskById,
  updateTaskById,
  deleteTaskById,
} from "../controllers/tasks.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * /tasks/create:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - userId
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn Swagger
 *               description:
 *                 type: string
 *                 example: Swagger documentation
 *     responses:
 *       201:
 *         description: Task created
 */
router.post("/create", authMiddleware, addTask);

/**
 * @swagger
 * /tasks/all:
 *   get:
 *     summary: Get all tasks
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/all", authMiddleware, findAllTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by id
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task found
 */
router.get("/:id", authMiddleware, findTaskById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Yangi vazifa"
 *               description:
 *                 type: string
 *                 example: "Vazifa tafsiloti"
 *     responses:
 *       200:
 *         description: Task updated
 *       404:
 *         description: Task topilmadi
 *       401:
 *         description: Avtorizatsiyadan o'tilmagan
 */
router.put("/:id", authMiddleware, updateTaskById);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted
 */
router.delete("/:id", authMiddleware, deleteTaskById);

export default router;
