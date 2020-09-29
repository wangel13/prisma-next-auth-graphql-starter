import { PrismaClient } from '@prisma/client'
import { MicroRequest } from 'apollo-server-micro/dist/types'
import { ServerResponse } from 'http'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  res: ServerResponse
  req: MicroRequest
}

export function createContext({ res, req }): Context {
  return { prisma, res, req }
}
