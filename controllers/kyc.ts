import { Request, Response } from "express";
import { getUserByEmail, getUserById, updateUser } from "../service/user";
import fs from "fs/promises"

