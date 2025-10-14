import { createUser, getUserByEmail, getUserById } from '../auth-helpers'
import { prisma } from '../prisma'
import { hash } from 'bcryptjs'

jest.mock('../prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}))

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
}))

describe('auth-helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createUser', () => {
    it('should create a new user with hashed password', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedpassword',
        name: 'Test User',
        authProvider: 'EMAIL',
        planType: 'FREE',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
      ;(hash as jest.Mock).mockResolvedValue('hashedpassword')
      ;(prisma.user.create as jest.Mock).mockResolvedValue(mockUser)

      const result = await createUser({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      })

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      })
      expect(hash).toHaveBeenCalledWith('password123', 10)
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: 'test@example.com',
          password: 'hashedpassword',
          name: 'Test User',
          authProvider: 'EMAIL',
          planType: 'FREE',
        },
      })
      expect(result).toEqual(mockUser)
    })

    it('should throw error if user already exists', async () => {
      const existingUser = {
        id: '1',
        email: 'existing@example.com',
        password: 'hashedpassword',
        name: 'Existing User',
      }

      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(existingUser)

      await expect(
        createUser({
          email: 'existing@example.com',
          password: 'password123',
        })
      ).rejects.toThrow('User already exists')

      expect(hash).not.toHaveBeenCalled()
      expect(prisma.user.create).not.toHaveBeenCalled()
    })
  })

  describe('getUserByEmail', () => {
    it('should return user by email', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      }

      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)

      const result = await getUserByEmail('test@example.com')

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      })
      expect(result).toEqual(mockUser)
    })

    it('should return null if user not found', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)

      const result = await getUserByEmail('nonexistent@example.com')

      expect(result).toBeNull()
    })
  })

  describe('getUserById', () => {
    it('should return user by id', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      }

      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser)

      const result = await getUserById('1')

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      })
      expect(result).toEqual(mockUser)
    })

    it('should return null if user not found', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)

      const result = await getUserById('nonexistent-id')

      expect(result).toBeNull()
    })
  })
})
