import { type Endpoints, Request } from '@/types'

export default {
  createPayment: (): Request.Config => ({
    url: '/payment/create',
    method: Request.Methods.POST
  }),
  handleNotification: (): Request.Config => ({
    url: '/payment/notifications',
    method: Request.Methods.POST
  }),
  getPaymentStatus: (paymentId: string): Request.Config => ({
    url: `/payment/status/${paymentId}`,
    method: Request.Methods.GET
  })
} satisfies Endpoints['payment']
