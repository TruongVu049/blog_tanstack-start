// src/services/session.server.ts
import { useSession } from '@tanstack/react-start/server'
import { User } from '~/lib/types'

type SessionUser = {
  userId: User['id']
}

export function useAppSession() {
  return useSession<SessionUser>({
    password: 'ChangeThisBeforeShippingToProdOrYouWillBeFired',
  })
}
