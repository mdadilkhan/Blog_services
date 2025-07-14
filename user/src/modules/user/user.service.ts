import User, { IUser } from "./user.model";

export const getUser = async (email: string): Promise<IUser | null> => {
  const user = await User.findOne({ email });
  return user;
};

export const createUser = async (data: Partial<IUser>): Promise<IUser> => {
  const result = await User.create(data);
  return result;
};

export const getUserDetails = async (id: string): Promise<IUser | null> => {
  const user = await User.findById(id);
  return user;
};

export const updateProfile=async(userId:string,updates:Partial<IUser>):Promise<void>=>{
 const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

  if (!updatedUser) {
    // throw your custom error
    throw new Error("User not found or update failed");
  }
}



export const uploadProfilePic = async (userId: string, imageUrl: string): Promise<void> => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { image: imageUrl }, // 👈 Only update the `image` field
    { new: true }
  );

  if (!updatedUser) {
    throw new Error("User not found or update failed");
  }
};

