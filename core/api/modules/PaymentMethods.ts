import type { nuxtContext } from '@nuxt/types'
import type {
  PaymentApi,
  CreatePaymentDto,
  CreatePaymentResponse,
  PaymentObject,
  YooKassaNotificationDto
} from '@/types'

export default (context: nuxtContext) => {
  class PaymentMethods implements PaymentApi {
    private static PAYMENT_ENDPOINTS = context.$configs.endpoints.payment

    async createPayment(body: CreatePaymentDto): Promise<CreatePaymentResponse> {
      const config = PaymentMethods.PAYMENT_ENDPOINTS.createPayment()
      const result = await context.$services.useAPI.request<CreatePaymentResponse, CreatePaymentDto>({ config, body })
      return result
    }

    async handleNotification(body: YooKassaNotificationDto): Promise<unknown> {
      const config = PaymentMethods.PAYMENT_ENDPOINTS.handleNotification()
      const result = await context.$services.useAPI.request<unknown, YooKassaNotificationDto>({ config, body })
      return result
    }

    async getPaymentStatus(paymentId: string): Promise<PaymentObject> {
      const config = PaymentMethods.PAYMENT_ENDPOINTS.getPaymentStatus(paymentId)
      const result = await context.$services.useAPI.request<PaymentObject>({ config })
      return result
    }
  }

  context.$api.payment = new PaymentMethods()
}
