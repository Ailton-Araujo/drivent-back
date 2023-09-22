import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paymentService } from '@/services/payments-service';

export async function getPaymentByTicket(req: Request, res: Response) {
  return res.status(httpStatus.OK).send();
}

export async function createPaymentToTicket(_req: Request, res: Response) {
  return res.status(httpStatus.OK).send();
}
