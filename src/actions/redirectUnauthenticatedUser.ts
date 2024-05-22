import { getSession } from "next-auth/react"

export const redirectUnauthenticatedUser = async () => {
  const session = await getSession();

  return !session && (
    {
      redirect: {
        destination: "/login",
        permanent: false,
      }
    }
  )
}

export default redirectUnauthenticatedUser;