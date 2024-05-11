import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class Dashboard {
    async getDashboardData(sellerId) {
        // What to do????

        // A. SALES VALUES AND COUNT
        // 1. Get all items of the seller
        // 2. Get all sales of the seller 
        // 3. Get all reviews of the seller
        // 4. Get all the sales values of the seller by item

        // B. TOTAL BUYERS
        // 1. Get all the buyers of the seller by item
        // 2. Calculate the average of sales by buyer


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




            // Get all the buyers of the seller by item using a map
            const totalNumberOfBuyers = new Map(sales.map(sale => sale.userId)).size
            
            // Calculate the average of sales by buyer
            if (totalNumberOfBuyers === 0 ) {
                averageOfSalesByBuyer = 0
            } else {
                averageOfSalesByBuyer = totalSalesValue / totalNumberOfBuyers
            }
            // ??????
            // Save the total number of buyers and the average of sales by buyer to return it later
            const totalBuyers = { count: totalNumberOfBuyers, average: averageOfSalesByBuyer }

        } catch (error) {
            return { error: error.message }
        }
    }


}

export default Dashboard;