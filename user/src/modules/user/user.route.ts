import express from 'express'
import { Router } from "express";
import { getProfileDetails, userLogin,getUserUserDetails,updateProfile, getUploadUrl, uploadProfilePic } from './user.controller';
import authenticateUser from '../../middleware/authenticate-user';




const userRoutes:Router=express.Router()


userRoutes.post('/login', userLogin)
userRoutes.get('/getProfileDetails',authenticateUser,getProfileDetails)
userRoutes.post('/updateProfileDetails',authenticateUser,updateProfile)
userRoutes.post("/getUrl",authenticateUser,getUploadUrl);
userRoutes.post("/uploadProfilePic",authenticateUser,uploadProfilePic);
userRoutes.get('/getUserDetails/:id',getUserUserDetails)


export default userRoutes;