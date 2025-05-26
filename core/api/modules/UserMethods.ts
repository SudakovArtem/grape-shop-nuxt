import type { nuxtContext } from '@nuxt/types'
import type { Request, Response, User, UserApi } from '@/types'
import getParams from '@/core/utils/getParams'

export default (context: nuxtContext) => {
  class UserMethods implements UserApi {
    private static USER_ENDPOINTS = context.$configs.endpoints.user

    async login(body: User.LoginDto): Promise<User.Session> {
      const config = UserMethods.USER_ENDPOINTS.login()
      const result = await context.$services.useAPI.request<User.Session>({ config, body })
      return result
    }

    async register(body: User.RegisterDto): Promise<User.Model> {
      const config = UserMethods.USER_ENDPOINTS.register()
      const result = await context.$services.useAPI.request<User.Model>({ config, body })
      return result
    }

    async getUsers(settings: Request.Params): Promise<Response.WithMeta<User.Model[]>> {
      const paramNames: Record<string, string | string[]> = {
        pageNumber: 'page',
        pageSize: 'limit',
        email: 'email',
        sortBy: 'sortBy'
      }
      const params: Request.Params = getParams(settings, paramNames)

      const config = UserMethods.USER_ENDPOINTS.getUsers(params)
      const result = await context.$services.useAPI.request<Response.WithMeta<User.Model[]>>({ config })
      return result
    }

    async getUserById(id: string): Promise<User.Model> {
      const config = UserMethods.USER_ENDPOINTS.getUserById(id)
      const result = await context.$services.useAPI.request<User.Model>({ config })
      return result
    }

    async getProfile(): Promise<User.Model> {
      const config = UserMethods.USER_ENDPOINTS.getProfile()
      const result = await context.$services.useAPI.request<User.Model>({ config })
      return result
    }

    async updateProfile(body: User.UpdateProfileDto): Promise<User.Model> {
      const config = UserMethods.USER_ENDPOINTS.updateProfile()
      const result = await context.$services.useAPI.request<User.Model>({ config, body })
      return result
    }

    async updateUser(id: string, body: User.UpdateProfileDto): Promise<User.Model> {
      const config = UserMethods.USER_ENDPOINTS.updateUser(id)
      const result = await context.$services.useAPI.request<User.Model>({ config, body })
      return result
    }

    async deleteUser(id: string): Promise<unknown> {
      const config = UserMethods.USER_ENDPOINTS.deleteUser(id)
      const result = await context.$services.useAPI.request({ config })
      return result
    }

    async forgotPassword(body: User.ForgotPasswordDto): Promise<{ message: string }> {
      const config = UserMethods.USER_ENDPOINTS.forgotPassword()
      const result = await context.$services.useAPI.request<{ message: string }>({ config, body })
      return result
    }

    async resetPassword(body: User.ResetPasswordDto): Promise<{ message: string }> {
      const config = UserMethods.USER_ENDPOINTS.resetPassword()
      const result = await context.$services.useAPI.request<{ message: string }>({ config, body })
      return result
    }
  }

  context.$api.user = new UserMethods()
}
