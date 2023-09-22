import { Payment } from '@prisma/client';
import { prisma } from '@/config';

async function find() {
  return prisma.payment.findMany();
}

export const paymentRepository = {};
