import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class ItemsSellerCustomer {
    //1-get all items
    //2-get items by category
    //3-get item by id
    //3-update items [id]
    //4-get items by seller
    //5-add item
    async getItems() {
        try {
            return await prisma.items.findMany()
        } catch (error) {
            return { error: error.message }
        }
    }

    async getItemsByCategory(category) {
        try {
            return await prisma.items.findMany({
                where: { category: category }
            })
        } catch (error) {
            return { error: error.message }
        }
    }

    async updateItem(data) {
        try {
            return await prisma.items.update({ 
                where: { id: data.id }, 
                data: data
            })
        } catch (error) {
            return { error: error.message }
        }
    }

    async getItem(itemId) {
        try {
            const reviews = await prisma.reviews.findUnique({
                where: { id: itemId }
            })
        
            const item = await prisma.items.findUnique({
                where: { id: itemId }
            })
            
            return { item, reviews }
        } catch (error) {
            return { error: error.message }
        }
    }

    async getItemsBySeller(sellerId) {
        try {
            return await prisma.items.findMany({
                where: { sellerId: sellerId }
            })
        } catch (error) {
            return { error: error.message }
        }
    }

}

export default new ItemsSellerCustomer();