import { Response } from "express";
import { Prisma } from "../../generated/prisma";

const errorHandler = (error: any, res: Response) => {
  if (error?.details) {
    const message = error.details
      .map((detail: any) => detail.message)
      .join(", ");
    return res.status(400).send({ message });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return res.status(400).send({
          message: `Bu ${error.meta?.target ?? "maydon"} allaqachon mavjud`,
        });
      case "P2025":
        return res.status(404).send({ message: "Yozuv topilmadi" });
      default:
        return res.status(400).send({ message: error.message });
    }
  }

  if (error instanceof Error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }

  console.error(error);
  return res.status(500).send({ message: "Ichki server xatosi" });
};

export { errorHandler };
