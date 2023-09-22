import { Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function findTicket(userId: number): Promise<Ticket> {
  return await prisma.ticket.findFirst({ where: { AND: { Enrollment: { userId } } }, include: { TicketType: true } });
}

async function findTicketById(id: number) {
  return await prisma.ticket.findUnique({ where: { id }, include: { Enrollment: true, TicketType: true } });
}

async function findTicketTypes(): Promise<TicketType[]> {
  return await prisma.ticketType.findMany();
}

async function findTicketTypeById(id: number): Promise<TicketType> {
  return await prisma.ticketType.findUnique({ where: { id } });
}

async function create(data: CreateTicket): Promise<TicketAndType> {
  return await prisma.ticket.create({ data: { ...data, status: 'RESERVED' }, include: { TicketType: true } });
}

async function updateStatus(id: number) {
  return await prisma.ticket.update({ where: { id }, data: { status: 'PAID' } });
}

export type CreateTicket = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'status'>;

export type CreateTicketBody = {
  ticketTypeId: number;
};

export type TicketAndType = Ticket & { TicketType: TicketType };

export const ticketRepository = {
  findTicket,
  findTicketById,
  findTicketTypes,
  findTicketTypeById,
  create,
  updateStatus,
};
