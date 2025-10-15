import { signUp } from '../auth'
import { createUser } from '@/lib/auth-helpers'

jest.mock('@/lib/auth-helpers', () => ({
  createUser: jest.fn(),
}))

describe('auth actions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('signUp', () => {
    it('should successfully create a user', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      }

      ;(createUser as jest.Mock).mockResolvedValue(mockUser)

      const formData = new FormData()
      formData.append('email', 'test@example.com')
      formData.append('password', 'password123')
      formData.append('name', 'Test User')

      const result = await signUp(formData)

      expect(result.success).toBe(true)
      expect(result.user).toEqual({
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      })
      expect(createUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      })
    })

    it('should return error for invalid email', async () => {
      const formData = new FormData()
      formData.append('email', 'invalid-email')
      formData.append('password', 'password123')

      const result = await signUp(formData)

      expect(result.success).toBe(false)
      expect(typeof result.error).toBe('string')
      expect(createUser).not.toHaveBeenCalled()
    })

    it('should return error for short password', async () => {
      const formData = new FormData()
      formData.append('email', 'test@example.com')
      formData.append('password', 'short')

      const result = await signUp(formData)

      expect(result.success).toBe(false)
      expect(typeof result.error).toBe('string')
      expect(createUser).not.toHaveBeenCalled()
    })

    it('should handle user creation errors', async () => {
      ;(createUser as jest.Mock).mockRejectedValue(new Error('Usuário já existe'))

      const formData = new FormData()
      formData.append('email', 'existing@example.com')
      formData.append('password', 'password12345')

      const result = await signUp(formData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Usuário já existe')
    })

    it('should work without optional name field', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: null,
      }

      ;(createUser as jest.Mock).mockResolvedValue(mockUser)

      const formData = new FormData()
      formData.append('email', 'test@example.com')
      formData.append('password', 'password12345')

      const result = await signUp(formData)

      expect(result.success).toBe(true)
      expect(createUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password12345',
        name: undefined,
      })
    })
  })
})
