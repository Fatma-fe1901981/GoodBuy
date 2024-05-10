import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class ItemsSellerCustomer {
    async getItems() {
        try {
            return await prisma.items.findMany()
        } catch (error) {
            return { error: error.message }
        }
    }

    async getSeller() {
        try {
            return await prisma.seller.findMany()
        } catch (error) {
            return { error: error.message }
        }
    }

    async createItem(data) {
        try {
            return await prisma.items.create({ data })
        } catch (error) {
            return { error: error.message }
        }
    }

    async updateItem(data) {
        try {
            return await prisma.items.update({ where: { id: data.id }, data })
        } catch (error) {
            return { error: error.message }
        }
    }



}
