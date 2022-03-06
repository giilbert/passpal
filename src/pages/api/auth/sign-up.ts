import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { accountCreationSchema } from '@utils/patterns';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function signUpHandler(req: NextApiRequest, res: NextApiResponse) {
  if (!accountCreationSchema.isValid(req.body)) {
    res.status(400).json({
      error: 'Malformed data.',
    });
    return;
  }

  await prisma.$connect();

  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      password: await hash(req.body.password, 12),
    },
  });

  await prisma.$disconnect();

  res.status(200).end();
}

export default signUpHandler;
