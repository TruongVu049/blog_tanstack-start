import { createServerFn } from "@tanstack/react-start"
import { useAppSession } from "~/utils/session"
import { redirect } from "@tanstack/react-router"

export const logoutFn = createServerFn().handler(async () => {
    const session = await useAppSession()

    session.clear()

    throw redirect({
        href: '/',
        reloadDocument: true,
    })
})