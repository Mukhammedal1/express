import { Router } from "express";
import {
  addUser,
  findAllUsers,
  findUserById,
  deleteUserById,
  updateUserById,
  activateUser,
  loginUser,
} from "../controllers/users.controller";

const router = Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: ali@gmail.com
 *               name:
 *                 type: string
 *                 example: Ali
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/register", addUser);

/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Users list
 */
router.get("/all", findAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by id
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: User found
 */
router.get("/:id", findUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: new@gmail.com
 *               name:
 *                 type: string
 *                 example: New Name
 *               password:
 *                 type: string
 *                 example: newpassword
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put("/:id", updateUserById);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete("/:id", deleteUserById);

/**
 * @swagger
 * /users/activate/{link}:
 *   get:
 *     summary: Activate user account
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: link
 *         required: true
 *         schema:
 *           type: string
 *         example: abc123-verification-link
 *     responses:
 *       200:
 *         description: Account activated successfully
 */
router.get("/activate/:link", activateUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: odiljonovmuhammadali742@gmail.com
 *               password:
 *                 type: string
 *                 example: ali777
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", loginUser);

export default router;
