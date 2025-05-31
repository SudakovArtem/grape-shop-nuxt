export interface CreatePaymentDto {
  value: string
  orderId: string
  userId: string
}

export interface PaymentAmount {
  value: string
  currency: string
}

export interface PaymentConfirmation {
  type: string
  confirmation_url: string
  return_url: string
}

export interface PaymentRecipient {
  account_id: string
  gateway_id: string
}

export interface PaymentMethod {
  type: string
  id: string
  saved: boolean
  status: string
}

export interface PaymentObject {
  id: string
  status: 'pending' | 'waiting_for_capture' | 'succeeded' | 'canceled'
  paid: boolean
  amount: PaymentAmount
  created_at: string
  description: string
  confirmation: PaymentConfirmation
  metadata: Record<string, any>
  test: boolean
  recipient: PaymentRecipient
  payment_method: PaymentMethod
  refundable: boolean
}

export interface CreatePaymentResponse {
  payment: PaymentObject
}

export interface YooKassaNotificationDto {
  type: string
  event: 'payment.succeeded' | 'payment.waiting_for_capture' | 'payment.canceled' | 'refund.succeeded'
  object: PaymentObject
}

export interface PaymentApi {
  createPayment: (body: CreatePaymentDto) => Promise<CreatePaymentResponse>
  handleNotification: (body: YooKassaNotificationDto) => Promise<unknown>
  getPaymentStatus: (paymentId: string) => Promise<PaymentObject>
}
