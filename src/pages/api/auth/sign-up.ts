import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { accountCreationSchema } from '@utils/patterns';
import { hash } from 'argon2';

const prisma = new PrismaClient();

async function signUpHandler(req: NextApiRequest, res: NextApiResponse) {
  // validate sign up information
  if (!accountCreationSchema.isValid(req.body)) {
    res.status(400).json({
      error: 'Malformed data.',
    });
    return;
  }

  await prisma.$connect();

  // check if user with email already exists
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    res.status(400).json({
      error: 'User with specified Email already exists.',
    });
    await prisma.$disconnect();
    return;
  }

  // if not, create a new user
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      password: await hash(req.body.password, {
        saltLength: 15,
      }),
    },
  });

  await prisma.$disconnect();

  res.status(200).end();
}

export default signUpHandler;
