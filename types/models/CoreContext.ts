import type {
  ApiClientService,
  UserService,
  UserAdapter,
  Validations,
  Endpoints,
  AbortService,
  UserApi,
  ProductService,
  ProductApi,
  ArticleService,
  ArticleApi
} from '@/types'
import type { Constants } from '@configs/modules/Constants.ts'

export namespace CoreContext {
  export interface Api {
    user: UserApi
    product: ProductApi
    article: ArticleApi
  }

  export interface Services {
    useAPI: ApiClientService
    abort: AbortService
    user: UserService
    product: ProductService
    article: ArticleService
  }

  export interface Adapters {
    user: UserAdapter
  }

  export interface Configs {
    validations: Validations.Model
    endpoints: Endpoints
    constants: Constants
  }
}
