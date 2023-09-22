import Joi from 'joi';
import { CreatePaymentBody } from '@/protocols';

export const paymentsSchema = Joi.object<CreatePaymentBody>({
  ticketId: Joi.number().integer().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.number().integer().required(),
    name: Joi.string().required(),
    expirationDate: Joi.date().required(),
    cvv: Joi.number().integer().required(),
  }).required(),
});
