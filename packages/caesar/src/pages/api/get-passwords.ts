import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

async function getPasswordsHandler(req: NextApiRequest, res: NextApiResponse) {
  // check if user is signed in
  const session = await getSession({ req });
  if (!session) {
    res.status(400).json({
      error: 'Not authenticated.',
    });
    return;
  }

  await prisma.$connect();

  const passwords = await prisma.password.findMany({
    where: {
      userId: parseInt(session.user.id),
    },
  });

  await prisma.$disconnect();

  res.json(passwords);
}

export default getPasswordsHandler;
