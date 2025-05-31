import type { nuxtContext } from '@nuxt/types'
import type {
  CreatePaymentDto,
  PaymentObject,
  YooKassaNotificationDto,
  PaymentService as IPaymentService
} from '@/types'

export default (context: nuxtContext) => {
  class PaymentService implements IPaymentService {
    private static PAYMENT_METHODS = context.$api.payment

    async createPayment(body: CreatePaymentDto): Promise<PaymentObject> {
      const response = await PaymentService.PAYMENT_METHODS.createPayment(body)
      return response
    }

    async handleNotification(body: YooKassaNotificationDto): Promise<unknown> {
      const response = await PaymentService.PAYMENT_METHODS.handleNotification(body)
      return response
    }

    async getPaymentStatus(paymentId: string): Promise<PaymentObject> {
      const response = await PaymentService.PAYMENT_METHODS.getPaymentStatus(paymentId)
      return response
    }
  }

  context.$services.payment = new PaymentService()
}
