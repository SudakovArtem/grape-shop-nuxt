import type { nuxtContext } from '@nuxt/types'
import type { Endpoints } from '@/types'
import user from './UserEndpoints'
import product from './ProductEndpoints'
import cart from './CartEndpoints'
import order from './OrderEndpoints'
import category from './CategoryEndpoints'
import upload from './UploadEndpoints'
import ArticleEndpoints from '@configs/modules/Endpoints/ArticleEndpoints'
import PaymentEndpoints from '@configs/modules/Endpoints/PaymentEndpoints'

export default (context: nuxtContext) => {
  const endpoints: Endpoints = {
    user,
    product,
    cart,
    order,
    category,
    upload,
    article: ArticleEndpoints,
    payment: PaymentEndpoints
  }

  context.$configs.endpoints = endpoints
}
