# BioBora Database Schema

This document describes the database schema for the BioBora multi-tenant link-in-bio platform.

## Overview

The database is designed to support a multi-tenant SaaS application where users can create multiple bio pages with customizable links and track analytics.

## Models

### User
The main tenant entity representing registered users.

**Fields:**
- `id`: Unique identifier (CUID)
- `email`: Unique email address
- `name`: Optional user name
- `password`: Hashed password (for email/password auth)
- `authProvider`: Authentication method (EMAIL or GOOGLE)
- `planType`: Subscription plan (FREE or PRO)
- `createdAt`: Registration timestamp
- `updatedAt`: Last update timestamp

**Relations:**
- Has many `Bio` pages
- Has one optional `Subscription`

### Subscription
Manages user subscription and billing information.

**Fields:**
- `id`: Unique identifier
- `userId`: Reference to User
- `planType`: Current plan (FREE or PRO)
- `stripeCustomerId`: Stripe customer ID
- `stripeSubscriptionId`: Stripe subscription ID
- `currentPeriodStart`: Billing period start
- `currentPeriodEnd`: Billing period end
- `cancelAtPeriodEnd`: Cancellation flag
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Bio
Individual bio pages created by users.

**Fields:**
- `id`: Unique identifier
- `userId`: Owner reference
- `slug`: Unique URL slug
- `title`: Page title
- `description`: Optional page description
- `customDomain`: Optional custom domain (PRO feature)
- `layout`: Layout type (CLASSIC or MODERN)
- `backgroundColor`: Hex color code
- `textColor`: Hex color code
- `buttonColor`: Hex color code
- `buttonTextColor`: Hex color code
- `fontFamily`: Font family name
- `avatarUrl`: Optional avatar image URL
- `showPoweredBy`: Show "Powered by BioBora" (hidden for PRO)
- `isPublished`: Publication status
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

**Relations:**
- Belongs to one `User`
- Has many `Link` items
- Has many `PageView` analytics
- Has many `EmailCapture` records

### Link
Individual links displayed on a bio page.

**Fields:**
- `id`: Unique identifier
- `bioId`: Parent bio reference
- `title`: Link display title
- `url`: Target URL
- `type`: Link type (link, whatsapp, social, etc.)
- `icon`: Optional icon identifier
- `position`: Sort order
- `isActive`: Visibility flag
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

**Relations:**
- Belongs to one `Bio`
- Has many `Click` analytics

### PageView
Analytics for bio page visits.

**Fields:**
- `id`: Unique identifier
- `bioId`: Page reference
- `ipAddress`: Visitor IP (optional, for privacy)
- `userAgent`: Browser user agent
- `referer`: Referring URL
- `country`: Visitor country (from IP geolocation)
- `city`: Visitor city (from IP geolocation)
- `createdAt`: Visit timestamp

### Click
Analytics for link clicks.

**Fields:**
- `id`: Unique identifier
- `linkId`: Clicked link reference
- `ipAddress`: Visitor IP (optional)
- `userAgent`: Browser user agent
- `referer`: Referring URL
- `country`: Visitor country
- `city`: Visitor city
- `createdAt`: Click timestamp

### EmailCapture
Captured emails from bio page contact forms.

**Fields:**
- `id`: Unique identifier
- `bioId`: Page reference
- `email`: Captured email address
- `name`: Optional visitor name
- `message`: Optional message
- `createdAt`: Capture timestamp

## Enums

### AuthProvider
- `EMAIL`: Email/password authentication
- `GOOGLE`: Google OAuth authentication

### PlanType
- `FREE`: Free tier with limitations
- `PRO`: Premium tier with full features

### LayoutType
- `CLASSIC`: Classic layout style
- `MODERN`: Modern layout style

## Indexes

Strategic indexes are placed on:
- `Bio.userId` - For fast user bio lookups
- `Bio.slug` - For fast public page access
- `Link.bioId` - For efficient link queries
- `PageView.bioId` and `PageView.createdAt` - For analytics queries
- `Click.linkId` and `Click.createdAt` - For analytics queries
- `EmailCapture.bioId` and `EmailCapture.createdAt` - For email list queries

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up your database URL in `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/biobora"
```

3. Generate Prisma Client:
```bash
npx prisma generate
```

4. Create and run migrations:
```bash
npx prisma migrate dev --name init
```

## Prisma Client Usage

Import the shared Prisma Client instance:

```typescript
import { prisma } from '@/lib/prisma'

// Example: Get user with their bios
const user = await prisma.user.findUnique({
  where: { email: 'user@example.com' },
  include: { bios: true }
})
```

The Prisma Client instance is configured to work properly in Next.js development mode with hot reloading.
