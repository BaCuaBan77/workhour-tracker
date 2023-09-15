import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
}