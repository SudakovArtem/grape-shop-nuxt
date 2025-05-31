import type { Request } from '@/types'

export interface PaymentEndpoints {
  createPayment: () => Request.Config
  handleNotification: () => Request.Config
  getPaymentStatus: (paymentId: string) => Request.Config
}
