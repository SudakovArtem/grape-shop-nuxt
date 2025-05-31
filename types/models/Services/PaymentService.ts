import type { CreatePaymentDto, PaymentObject, YooKassaNotificationDto } from '@/types'

export interface PaymentService {
  createPayment: (body: CreatePaymentDto) => Promise<PaymentObject>
  handleNotification: (body: YooKassaNotificationDto) => Promise<unknown>
  getPaymentStatus: (paymentId: string) => Promise<PaymentObject>
}
