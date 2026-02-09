import { Sex } from "@/types/enum/sex.enum";
import { z } from "zod";

export const registerSchema = z.object({
  username: z.string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(30, { message: "Username must be at most 30 characters long" }),
  email: z.string()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters long" })
    .max(30, { message: "Email must be at most 30 characters long" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }).max(30, { message: "Password must be at most 30 characters long" }),
  nickname: z.string().min(3, { message: "Nickname must be at least 3 characters long" }).max(30, { message: "Nickname must be at most 30 characters long" }),
  phoneNumber: z.string().min(3, { message: "Phone number must be at least 3 characters long" }).max(20, { message: "Phone number must be at most 20 characters long" }),
  sex: z.enum([Sex.MALE, Sex.FEMALE, Sex.OTHER]),
  bio: z.string(),
});
