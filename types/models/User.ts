export namespace User {
  export enum Types {
    CANDIDATE = 'candidate',
    COMPANY = 'company'
  }

  export type SocialMedia = {
    telegram: string
    vk: string
    hh: string
  }

  export interface LoginData {
    email: string
    ogrn: string
    password: string
    agreement: boolean
  }

  export interface LoginDto extends Record<string, unknown> {
    email: string
    password: string
  }

  export interface RegisterData {
    email: string
    password: string
    passwordRepeat: string
    ogrn: string
    fullName: string
    phone: string
    agreement: boolean
  }

  export interface RegisterDto extends Record<string, unknown> {
    email: string
    password: string
    name: string
    phone?: string
    address?: string
  }

  export interface ForgotPasswordDto extends Record<string, unknown> {
    email: string
  }

  export interface ResetPasswordDto extends Record<string, unknown> {
    token: string
    newPassword: string
  }

  export interface UpdateProfileDto extends Record<string, unknown> {
    name?: string
    phone?: string
    address?: string
    avatar?: string
  }

  export interface CooperationDto {
    name: string
    email: string
    phone: string
    description: string
    agreement: boolean
  }

  export interface Model {
    id: number
    email: string
    name: string
    address: string | null
    phone: string | null
    avatar: string | null
    role: 'admin' | 'user'
    createdAt: string
  }

  export interface Session {
    accessToken: string
  }
}
