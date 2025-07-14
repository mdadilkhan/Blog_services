import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";
import jwt from "jsonwebtoken";
import config from "../../config";
import EntityNotFoundError from "../../errors/EntityNotFoundError";
import { getPresignedPutUrl } from "../../S3";
import BadRequestError from "../../errors/BadRequestError";
import User from "./user.model";

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, name, image } = req.body;

    let user = await userService.getUser(email);

    if (!user) {
      user = await userService.createUser({ email, name, image });
    }
    const payload = {
      id: user._id, // Convert MongoDB _id to string
      email: user.email,
      name: user.name,
      image: user.image,
      // Don't include sensitive data
    };

    const token = jwt.sign(payload, config.secretKey, {
      expiresIn: "5d",
      issuer: config.issuer,
    });
    console.log("before res", token);
    res.status(200).json({
      message: "Login success",
      user,
      token,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const getProfileDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log("req.user >>", req.user);

    // 1. Safely extract email with type checking
    const email = req.user?.email;
    if (!email) {
      throw new EntityNotFoundError({
        message: "Email is required",
        statusCode: 400,
        code: "ERR_NF",
      });
    }

    // 2. Get user data
    const user = await userService.getUser(email);
    if (!user) {
      throw new EntityNotFoundError({
        message: "User not found",
        statusCode: 404,
        code: "ERR_NF",
      });
    }

    // 3. Return success response (fixed res.json(200) syntax error)
    res.status(200).json({
      message: "Profile retrieved successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("clicked>>");

  try {
    const userId = req.params.id;
    console.log(userId);

    if (!userId) {
      throw new EntityNotFoundError({
        message: "User id not found",
        statusCode: 400,
        code: "ERR_NF",
      });
    }

    const user = await userService.getUserDetails(userId);
    console.log(user);
    if (!user) {
      throw new EntityNotFoundError({
        message: "User not found",
        statusCode: 404,
        code: "ERR_NF",
      });
    }
    console.log("end>>");
    res.status(200).json({ message: "Ok", data: user });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    console.log(req.user);
    
    
    const { name, instagram, github, linkedin, bio } = req.body;
    const userId = req.user?.id;


    if (!userId) {
      throw new EntityNotFoundError({
        message: "User id is required",
        statusCode: 400,
        code: "ERR_NF",
      });
    }
    const user = {
      name,
      instagram,
      github,
      linkedin,
      bio,
    };
    await userService.updateProfile(userId, user);
    
    res.status(200).json({
      message: "User Updated successfully",
    });
  } catch (error) {
    next(error);
  }
};


export const getUploadUrl=async(req:Request,res:Response,next:NextFunction)=>{
    try {
      const {contentType}=req.body;

      if(!contentType){
        throw new BadRequestError({message:"contentType and folder is required",statusCode:400,code:"ERR_BR"})
      }
      const folder='blog-app/profilePic'
      const { uploadUrl, key,publicUrl }=await getPresignedPutUrl({contentType,folder})
      res.status(200).json({message:'success',data:{uploadUrl,key,publicUrl}})

    } catch (error) {
       next(error)
    }

}


export const uploadProfilePic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.user?.id; // Make sure middleware adds `req.user`
    const { url } = req.body;

    if (!url || !id) {
      throw new BadRequestError({
        message: "Image URL and user ID are required",
        statusCode: 400,
        code: "ERR_BR",
      });
    }

    await userService.uploadProfilePic(id, url);

    res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
