import { Prisma } from '@prisma/client'

export type UserWithBios = Prisma.UserGetPayload<{
  include: { bios: true }
}>

export type BioWithLinks = Prisma.BioGetPayload<{
  include: { links: true }
}>

export type BioWithRelations = Prisma.BioGetPayload<{
  include: {
    links: true
    pageViews: true
    emailCaptures: true
    user: true
  }
}>

export type LinkWithClicks = Prisma.LinkGetPayload<{
  include: { clicks: true }
}>
