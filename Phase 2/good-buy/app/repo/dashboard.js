import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class Dashboard {
    async getDashboardData(sellerId) {
        // What to do????
        // 1. Get all items of the seller
        // 2. Get all sales of the seller 
        // 3. Get all reviews of the seller
        // 4. Get all the sales values of the seller by item

        try {
            // Get all items of the seller
            const items = await prisma.items.findMany({
                where: { sellerId: sellerId }
            })

            // Get all sales of the seller
            const sales = await prisma.sales.findMany({
                where: { sellerId: sellerId }
            })

            // Get all reviews of the seller
            const reviews = await prisma.reviews.findMany({
                where: { sellerId: sellerId }
            })

            // Get all the sales values of the seller by item
            const totalSalesValue = sales.reduce((acc, sale) => {

                // Get the item that was sold
                const item = items.find(item => item.id === sale.itemId)

                // If item not found, return the acc, else return the  value (acc + price * quantity)
                if(!item) {
                    return acc;
                }
                else { 
                    return acc + item.price * sale.quantity
                }
            }, 0)

            // Save the total sales value and the total sales count to return it later
            const totalSales = { count: sales.length, value: totalSalesValue }




        } catch (error) {
            return { error: error.message }
        }
    }


}

export default Dashboard;