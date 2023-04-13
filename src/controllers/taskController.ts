import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const taskCtrl = {
  create: async (req: Request, res: Response) => {
    try {
      const { title, description }: { title: string; description: string } =
        req.body;

      const task = await prisma.task.create({ data: { title, description } });

      if (!task) {
        return res.status(400).json({ err: "Task creation failed" });
      }

      res.json(task);
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getAll: async (_req: Request, res: Response) => {
    try {
      const tasks = await prisma.task.findMany();

      res.json(tasks);
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const { id: taskId } = req.params;

      const task = await prisma.task.findFirst({ where: { id: taskId } });

      res.json(task);
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  deleteById: async (req: Request, res: Response) => {
    try {
      const { id: taskId } = req.params;

      await prisma.task.delete({ where: { id: taskId } });

      res.json({ msg: "Task deleted" });
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
  updateOne: async (req: Request, res: Response) => {
    try {
      const { id: taskId } = req.params;
      const { title, description }: { title: string; description: string } =
        req.body;

      const newTask = await prisma.task.update({
        where: { id: taskId },
        data: { title, description },
      });

      res.json(newTask);
    } catch (err: any) {
      return res.status(500).json({ err: err.message });
    }
  },
};
