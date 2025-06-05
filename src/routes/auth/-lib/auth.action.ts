import { createServerFn } from "@tanstack/react-start";
import * as fs from "node:fs";
import type { SignInData, RegisterData } from "./types";
import { v4 as uuidv4 } from "uuid";
import { User } from "~/lib/types";
import { useAppSession } from "~/utils/session";

const USERS_FILE = "src/data/users.json";

/**
 * Reads users from the JSON file
 */
export const signIn = createServerFn({ method: "POST" }).validator((data: SignInData) => data).handler(async ({ data }): Promise<User | null> => {
  try {
    const users = await fs.promises.readFile(USERS_FILE, "utf-8");
    const parsedUsers = JSON.parse(users) as User[];
    const user = parsedUsers.find((u) => u.username === data.username && u.password === data.password);
    if (!user) {
      throw new Error("Username or password is incorrect");
    }

    const session = await useAppSession()

    // Store the user's email in the session
    await session.update({
      userId: user.id
    })

    return user;
  } catch (error) {
    console.error("Error reading users file:", error);
    return null;
  }
});


/**
 * Writes users to the JSON file
 */
export const register = createServerFn({ method: "POST" })
  .validator((data: RegisterData) => data)
  .handler(async ({ data }) => {
    try {
      // Read the existing users from the file
      const usersData = await fs.promises.readFile(USERS_FILE, "utf-8");
      const parsedUsers = JSON.parse(usersData) as User[];

      // find if user already exists
      const userExists = parsedUsers.find((u) => u.username === data.username);
      if (userExists) {
        throw new Error("User already exists");
      }

      // Create a new user with a unique ID
      const newUser: User = {
        id: uuidv4(),
        fullName: data.fullName,
        username: data.username,
        password: data.password,
        createdAt: new Date().toISOString(),
      };

      // Add the new user to the list
      const updatedUsers = [...parsedUsers, newUser];

      // Write the updated users back to the file
      await fs.promises.writeFile(
        USERS_FILE,
        JSON.stringify(updatedUsers, null, 2),
        "utf-8"
      );

      return newUser;
    } catch (error) {
      console.error("Failed to register user:", error);
      throw new Error("Failed to register user");
    }
  });
