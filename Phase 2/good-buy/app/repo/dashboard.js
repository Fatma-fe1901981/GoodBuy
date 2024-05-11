import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


class Dashboard {
    async getDashboardData(sellerId) {
        const id = parseInt(sellerId);

        // What to do????

        // OVER ALL COMMON STUFF 
        // 1. Get all items of the seller
        // 2. Get all sales of the seller
        // 3. Get all reviews of the seller

        // A. TOTAL ITEMS OVERALL
        // 1. Get all items of the seller

        // B. SALES VALUES AND COUNT
        // 1. Get all the sales values of the seller by item

        // C. TOTAL BUYERS
        // 1. Get all the buyers of the seller by item
        // 2. Calculate the average of sales by buyer

        // D. TOTAL SALES BY WEEK 
        // 1. Get all the sales of the seller by week
        // 2. Calculate the total sales value per week
        // 3. Calculate the total sales count per week
        // 4. Calculate the average of sales per week

        // E. TOTAL SALES PER MONTH
        // 1. Get all the sales of the seller by month
        // 2. Calculate the total sales value per month
        // 3. Calculate the total sales count per month
        // 4. Calculate the average of sales per month

        // F. TOTAL SALES PER YEAR
        // 1. Get all the sales of the seller by year
        // 2. Calculate the total sales value per year
        // 3. Calculate the total sales count per year
        // 4. Calculate the average of sales per year

        // G. TOTAL SALES PER CITY
        // 1. Get all the sales of the seller by buyer city
        // 2. Calculate the total sales value per city
        // 3. Calculate the total sales count per city
        // 4. Calculate the average of sales per city

        // H. TOTAL SALES PER COUNTRY
        // 1. Get all the sales of the seller by buyer country
        // 2. Calculate the total sales value per country
        // 3. Calculate the total sales count per country
        // 4. Calculate the average of sales per country


        // MUST BE SELLER THO
        // Get the sellerId from the prisma.sellers table
        const seller = await prisma.sellers.findUnique({ where: { id } })


        if (!seller || id !== seller.id) {
            return { error: 'You must be a seller to access this data' };
        }
        
        try {
            // OVER ALL
            // Get all items of the seller
            const items = await prisma.items.findMany({
                where: { sellerId: id }
            })

            // Get all sales of the seller
            const sales = await prisma.sales.findMany({
                where: { sellerId: id }
            })

            // A. TOTAL ITEMS OVERALL
            // Get all items of the seller
            const totalItems = items.length


            // B. SALES VALUES AND COUNT
            // Get all the sales values of the seller by item
            const totalSalesValue = sales.reduce((acc, sale) => {

                // Get the item that was sold
                const item = items.find(item => item.id === sale.itemId)

                // If item not found, return the acc, else return the  value (acc + price * quantity)
                if (!item) {
                    return acc;
                }
                else {
                    return acc + item.price * sale.quantity
                }
            }, 0)

            // Save the total sales value and the total sales count to return it later
            const totalSales = { count: sales.length, value: totalSalesValue }



            // C. TOTAL BUYERS
            // Get all the buyers of the seller by item using a map
            const totalNumberOfBuyers = new Map(sales.map(sale => sale.userId)).size

            const averageOfSalesByBuyer = 0
            // Calculate the average of sales by buyer
            if (totalNumberOfBuyers === 0) {
                averageOfSalesByBuyer = 0
            } else {
                averageOfSalesByBuyer = totalSalesValue / totalNumberOfBuyers
            }
            // ??????
            // Save the total number of buyers and the average of sales by buyer to return it later
            const totalBuyers = { count: totalNumberOfBuyers, average: averageOfSalesByBuyer }



            // D. TOTAL SALES BY WEEK
            // Get all the sales of the seller by week
            const totalSalesByWeek = sales.reduce((acc, sale) => {
                const week = new Date(sale.soldOn).getWeek()
                acc[week] = acc[week] || { count: 0, value: 0 }
                acc[week].count++
                acc[week].value += sale.quantity * items.find(item => item.id === sale.itemId).price
                return acc
            }, {})

            // Calculate the total sales value per week
            const totalSalesValueByWeek = Object.values(totalSalesByWeek).reduce((acc, week) => acc + week.value, 0)

            // Calculate the total sales count per week
            const totalSalesCountByWeek = Object.values(totalSalesByWeek).reduce((acc, week) => acc + week.count, 0)

            // Calculate the average of sales per week
            const averageOfSalesPerWeek = totalSalesValueByWeek / totalSalesCountByWeek

            // Save the total sales value per week, the total sales count per week and the average of sales per week to return it later
            const totalSalesPerWeek = { value: totalSalesValueByWeek, count: totalSalesCountByWeek, average: averageOfSalesPerWeek }



            // E. TOTAL SALES PER MONTH
            // Get all the sales of the seller by month
            const totalSalesByMonth = sales.reduce((acc, sale) => {
                const month = new Date(sale.soldOn).getMonth()
                acc[month] = acc[month] || { count: 0, value: 0 }
                acc[month].count++
                acc[month].value += sale.quantity * items.find(item => item.id === sale.itemId).price
                return acc
            }, {})

            // Calculate the total sales value per month
            const totalSalesValueByMonth = Object.values(totalSalesByMonth).reduce((acc, month) => acc + month.value, 0)

            // Calculate the total sales count per month
            const totalSalesCountByMonth = Object.values(totalSalesByMonth).reduce((acc, month) => acc + month.count, 0)

            // Calculate the average of sales per month
            const averageOfSalesPerMonth = totalSalesValueByMonth / totalSalesCountByMonth

            // Save the total sales value per month, the total sales count per month and the average of sales per month to return it later
            const totalSalesPerMonth = { value: totalSalesValueByMonth, count: totalSalesCountByMonth, average: averageOfSalesPerMonth }



            // F. TOTAL SALES PER YEAR
            // Get all the sales of the seller by year
            const totalSalesByYear = sales.reduce((acc, sale) => {
                const year = new Date(sale.soldOn).getFullYear()
                acc[year] = acc[year] || { count: 0, value: 0 }
                acc[year].count++
                acc[year].value += sale.quantity * items.find(item => item.id === sale.itemId).price
                return acc
            }, {})

            // Calculate the total sales value per year
            const totalSalesValueByYear = Object.values(totalSalesByYear).reduce((acc, year) => acc + year.value, 0)

            // Calculate the total sales count per year
            const totalSalesCountByYear = Object.values(totalSalesByYear).reduce((acc, year) => acc + year.count, 0)

            // Calculate the average of sales per year
            const averageOfSalesPerYear = totalSalesValueByYear / totalSalesCountByYear

            // Save the total sales value per year, the total sales count per year and the average of sales per year to return it later
            const totalSalesPerYear = { value: totalSalesValueByYear, count: totalSalesCountByYear, average: averageOfSalesPerYear }



            // SAVE ADDRESSES
            const addresses = await prisma.addresses.findMany();

            // G. TOTAL SALES PER CITY
            // Get all the sales of the seller by buyer city
            const totalSalesByCityOfBuyerAddress = await this.prisma.addresses.groupBy({
                by: ['city'],
                where: { userId: { in: sales.map((sale) => sale.userId) } },
                count: {
                    userId: true,
                },
            })

            // Calculate the total sales value per city
            const totalSalesValueByCity = Object.values(totalSalesByCityOfBuyerAddress).reduce((acc, city) => acc + city.value, 0)

            // Calculate the total sales count per city
            const totalSalesCountByCity = Object.values(totalSalesByCityOfBuyerAddress).reduce((acc, city) => acc + city.count, 0)

            // Calculate the average of sales per city
            const averageOfSalesPerCity = totalSalesValueByCity / totalSalesCountByCity

            // Save the total sales value per city, the total sales count per city and the average of sales per city to return it later
            const totalSalesPerCity = { value: totalSalesValueByCity, count: totalSalesCountByCity, average: averageOfSalesPerCity }



            // H. TOTAL SALES PER COUNTRY
            // Get all the sales of the seller by buyer country
            const totalSalesByCountry = await prisma.addresses.groupBy({
                by: ['country'],
                where: { userId: { in: sales.map((sale) => sale.userId) } },
                count: {
                    userId: true,
                },
            })

            // Calculate the total sales value per country
            const totalSalesValueByCountry = Object.values(totalSalesByCountry).reduce((acc, country) => acc + country.value, 0)

            // Calculate the total sales count per country
            const totalSalesCountByCountry = Object.values(totalSalesByCountry).reduce((acc, country) => acc + country.count, 0)

            // Calculate the average of sales per country
            const averageOfSalesPerCountry = totalSalesValueByCountry / totalSalesCountByCountry

            // Save the total sales value per country, the total sales count per country and the average of sales per country to return it later
            const totalSalesPerCountry = { value: totalSalesValueByCountry, count: totalSalesCountByCountry, average: averageOfSalesPerCountry }

            // FINAL SUMMARY
            const summary = {
                totalItems,
                totalSales,
                totalBuyers,
                totalSalesPerWeek,
                totalSalesPerMonth,
                totalSalesPerYear,
                totalSalesPerCity,
                totalSalesPerCountry
            }

            return summary

        } catch (error) {
            return { error: error.message }
        }
    }


}

export default new Dashboard();