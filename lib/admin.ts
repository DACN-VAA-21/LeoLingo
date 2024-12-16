import { auth } from "@clerk/nextjs/server";

const adminIds = ["user_2mnNkksJwXq56ljbPbJuaqOiQet"];

export const isAdmin = () => {
  const { userId } = auth();
  if (!userId) {
    return false;
  }
  return adminIds.indexOf(userId) !== -1;
};
