import { createServerFn } from "@tanstack/react-start"
import { useAppSession } from "~/utils/session"
import { User } from "../types"
import * as fs from "node:fs";

const USERS_FILE = "src/data/users.json";

export const getUser = createServerFn({ method: 'GET' }).handler(async () => {
    // We need to auth on the server so we have access to secure cookies
    const session = await useAppSession()

    if (!session.data.userId) {
        return null
    }

    return {
        userId: session.data.userId,
    }
})

export const getUserInfo = createServerFn({ method: "GET" })
    .handler(async (): Promise<User | null> => {
        try {
            const users = await fs.promises.readFile(USERS_FILE, "utf-8");
            const session = await useAppSession()
            const parsedUsers = JSON.parse(users) as User[];
            const user = parsedUsers.find((u) => u.id === session.data.userId);
            if (!user) {
                return null;
            }
            return user;
        } catch (error) {
            console.error("Error reading users file:", error);
            return null;
        }
    });
