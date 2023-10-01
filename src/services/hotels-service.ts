import {
  enrollmentNotFoundError,
  hotelsNotFoundError,
  ticketNotFoundError,
  ticketNotPaidError,
  ticketNotOfferHotel,
} from '@/errors';
import { enrollmentRepository, hotelsRepository, ticketRepository } from '@/repositories';

async function getHotels(userId: number) {
  const enrollments = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollments) throw enrollmentNotFoundError();
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollments.id);
  if (!ticket) throw ticketNotFoundError();
  const hotels = await hotelsRepository.getHotels();
  if (hotels.length === 0) throw hotelsNotFoundError();
  if (ticket.status === 'RESERVED') throw ticketNotPaidError();
  if (ticket.TicketType.isRemote === true) throw ticketNotOfferHotel();
  if (ticket.TicketType.includesHotel === false) throw ticketNotOfferHotel();

  return hotels;
}

async function getHotelById(userId: number, hotelId: number) {
  const enrollments = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollments) throw enrollmentNotFoundError();
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollments.id);
  if (!ticket) throw ticketNotFoundError();
  const hotel = await hotelsRepository.getHotelById(hotelId);
  if (!hotel) throw hotelsNotFoundError();
  if (ticket.status === 'RESERVED') throw ticketNotPaidError();
  if (ticket.TicketType.isRemote === true) throw ticketNotOfferHotel();
  if (ticket.TicketType.includesHotel === false) throw ticketNotOfferHotel();

  return hotel;
}

export const hotelsService = { getHotels, getHotelById };
