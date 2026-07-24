import { Request, Response } from "express";
import prisma from "../config/db.js";
import { errorHandler } from "../helpers/error-handler.js";
import { taskValidation } from "../validations/tasks.validation.js";

const addTask = async (req: Request, res: Response) => {
  try {
    const { error, value } = taskValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const userId = (req as any).user.id;

    const newTask = await prisma.task.create({
      data: {
        ...value,
        userId,
      },
    });

    res.status(201).send({ message: "Task qo'shildi", newTask });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).send({ tasks });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findTaskById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = (req as any).user.id;

    const task = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!task) return res.status(404).send({ message: "Task topilmadi" });
    res.status(200).send({ task });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateTaskById = async (req: Request, res: Response) => {
  try {
    const { error, value } = taskValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const id = Number(req.params.id);
    const userId = (req as any).user.id;

    const existingTask = await prisma.task.findFirst({
      where: { id, userId },
    });
    if (!existingTask) {
      return res.status(404).send({ message: "Task topilmadi" });
    }

    const task = await prisma.task.update({
      where: { id },
      data: { ...value },
    });

    res.status(200).send({ task });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteTaskById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = (req as any).user.id;

    const existingTask = await prisma.task.findFirst({
      where: { id, userId },
    });
    if (!existingTask) {
      return res.status(404).send({ message: "Task topilmadi" });
    }

    await prisma.task.delete({ where: { id } });

    res.status(200).send({ deleted: true });
  } catch (error) {
    errorHandler(error, res);
  }
};

export { addTask, findAllTasks, findTaskById, updateTaskById, deleteTaskById };
