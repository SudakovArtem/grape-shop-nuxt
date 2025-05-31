import type { CreatePaymentDto, CreatePaymentResponse, PaymentObject, YooKassaNotificationDto } from '@/types'

export interface PaymentService {
  createPayment: (body: CreatePaymentDto) => Promise<CreatePaymentResponse>
  handleNotification: (body: YooKassaNotificationDto) => Promise<unknown>
  getPaymentStatus: (paymentId: string) => Promise<PaymentObject>
}
