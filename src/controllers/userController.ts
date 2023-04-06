import { Request, Response } from 'express';
import User from "../models/userModel";
import bcrypt from "bcryptjs";

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const passwordNew = await bcrypt.hash(password, 10);
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        password: passwordNew,
      },
      { new: true }
    );
   
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export default {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  };
  