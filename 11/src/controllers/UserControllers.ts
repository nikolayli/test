import { Request, Response } from 'express';
import { Users } from '../entities/Users';

export const getUsers = async (req: Request, res: Response) => {
  const users = await Users.find();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const user = Users.create(req.body);
  await user.save();
  res.json(user);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await Users.findOne({ where: { id: parseInt(req.params.id) } });
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await Users.findOne({ where: { id: parseInt(req.params.id) } });
  if (user) {
    Users.merge(user, req.body);
    await user.save();
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const result = await Users.delete(req.params.id);
  res.json(result);
};