import { PrismaClient } from '@prisma/client';
import { passwordCreationSchema } from '@utils/patterns';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

async function signUpHandler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  // check if password is valid
  const valid = await passwordCreationSchema.isValid(data);
  if (!valid) {
    res.status(400).json({
      error: 'Malformed data.',
    });
    return;
  }

  // check if user is signed in
  const session = await getSession({ req });
  if (!session) {
    res.status(400).json({
      error: 'Not authenticated.',
    });
    return;
  }

  await prisma.$connect();

  await prisma.password.create({
    data: {
      name: data.name,
      login: data.login,
      website: data.website,
      password: data.password,
      userId: parseInt(session.user.id),
    },
  });

  await prisma.$disconnect();

  res.status(200).end();
}

export default signUpHandler;
