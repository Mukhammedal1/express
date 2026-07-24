import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";
import { userValidation } from "../validations/users.validation.js";
import { errorHandler } from "../helpers/error-handler.js";
import prisma from "../config/db.js";
import mailService from "../services/mail.service.js";
import userJwtService from "../services/user-jwt.service.js";

const addUser = async (req: Request, res: Response) => {
  try {
    const { error, value } = userValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const oldUser = await prisma.user.findUnique({
      where: { email: value.email },
    });
    if (oldUser) {
      return res.status(400).send({ message: "This user already exists" });
    }

    const hashedPassword = bcrypt.hashSync(value.password, 7);
    const activation_link = uuid.v4();

    const newUser = await prisma.user.create({
      data: {
        ...value,
        password: hashedPassword,
        verification: activation_link,
      },
    });

    await mailService.sendMailActivationCode(
      value.email,
      `${process.env.API_URL}/api/users/activate/${activation_link}`,
    );

    res.status(201).send({ message: "New user added", newUser });
  } catch (error) {
    errorHandler(error, res);
  }
};

const activateUser = async (req: Request, res: Response) => {
  try {
    const link = req.params.link as string;
    const user = await prisma.user.findFirst({
      where: { verification: link, is_active: false },
    });
    if (!user) {
      return res.status(400).send({ message: "Bunday user topilmadi" });
    }
    if (user.is_active) {
      return res.status(400).send({ message: "User oldin faollashtirilgan" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { is_active: true },
    });

    res.send({
      message: "User faollashtirildi",
      is_active: updatedUser.is_active,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).send({ message: "Email yoki parol noto'g'ri" });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: "Email yoki parol noto'g'ri" });
    }

    if (!user.is_active) {
      return res.status(403).send({ message: "Akauntingiz hali aktiv emas" });
    }

    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.is_active,
    };

    const tokens = userJwtService.generateTokens(payload);
    await prisma.user.update({
      where: { id: user.id },
      data: { refresh_token: tokens.refreshToken },
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_TOKEN_MS),
    });

    res.status(200).send({
      message: "Tizimga xush kelibsiz",
      user_id: user.id,
      user_accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).send({ users });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).send({ message: "User not found" });
    res.status(200).send({ user });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    const { error, value } = userValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const id = Number(req.params.id);
    const hashedPassword = bcrypt.hashSync(value.password, 7);

    const user = await prisma.user.update({
      where: { id },
      data: { ...value, password: hashedPassword },
    });

    res.status(200).send({ user });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleted = await prisma.user.delete({ where: { id } });
    if (!deleted) return res.status(404).send({ message: "User not found" });
    res.status(200).send({ deleted: true });
  } catch (error) {
    errorHandler(error, res);
  }
};

export {
  addUser,
  findAllUsers,
  findUserById,
  updateUserById,
  deleteUserById,
  activateUser,
  loginUser,
};
