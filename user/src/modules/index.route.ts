import { Router } from "express";
import express from 'express'
import userRoutes from "./user/user.route";

const api:Router=express.Router()



api.use('/user',userRoutes)




export default api