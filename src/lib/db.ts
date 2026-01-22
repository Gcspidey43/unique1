import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

// For Edge Runtime compatibility
let db: PrismaClient

if (typeof window === 'undefined') {
  if (process.env.NODE_ENV === 'production') {
    db = new PrismaClient()
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient()
    }
    db = global.prisma
  }
} else {
  // For client-side, you might want to throw an error or handle differently
  throw new Error('Prisma is not available on the client side')
}

export { db }