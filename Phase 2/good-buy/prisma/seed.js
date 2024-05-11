import fs from 'fs-extra'
import path from 'path'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const usersPath = path.join(process.cwd(), 'app/data/users.json')
const addressesPath = path.join(process.cwd(), 'app/data/addresses.json')
const sellersPath = path.join(process.cwd(), 'app/data/sellers.json')
const itemsPath = path.join(process.cwd(), 'app/data/items.json')
const salesPath = path.join(process.cwd(), 'app/data/sales.json')
const reviewsPath = path.join(process.cwd(), 'app/data/reviews.json')

async function seed() {
    try {
        const users = await fs.readJSON(usersPath)
        const addresses = await fs.readJSON(addressesPath)
        const sellers = await fs.readJSON(sellersPath)
        const items = await fs.readJSON(itemsPath)
        const sales = await fs.readJSON(salesPath)
        const reviews = await fs.readJSON(reviewsPath)

        // Start a transaction
        await prisma.$transaction([
            // Delete all existing entries in the database
            prisma.users.deleteMany(),
            prisma.addresses.deleteMany(),
            prisma.sellers.deleteMany(),
            prisma.items.deleteMany(),
            prisma.sales.deleteMany(),
            prisma.reviews.deleteMany(),

            // Seed users
            await prisma.users.createMany({ 
                data: users }),

            // Seed addresses
            await prisma.addresses.createMany({ 
                data: addresses }),

            // Seed sellers
            await prisma.sellers.createMany({ 
                data: sellers }),

            // seed items
            await prisma.items.createMany({
                data: items,
            }),

            // seed reviews
            await prisma.reviews.createMany({
                data: reviews,
            }),

            // seed sales
            await prisma.sales.createMany({
                data: sales.map((sale) => ({
                    ...sale,
                    quantity: Math.floor(Math.random() * 20) + 1,
                })),
            }),
        ])

        console.log('Seeding completed successfully.')
    } catch (error) {
        console.error('Failed to seed:', error)
    } finally {
        // Disconnect Prisma Client
        await prisma.$disconnect()
    }
}

seed()

