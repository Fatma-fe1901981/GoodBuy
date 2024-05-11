import Dashboard from '../../../repo/dashboard.js';

export async function GET(request, { params }) {
    const id = params.id;
    const dashboard = await Dashboard.getDashboardData(id);
    return {
        status: 200,
        body: dashboard
    };
}


// import repo from "../../repo/items-seller-customer";
// export async function GET(request, { params }) {
//     const productId = params.id;
//     const product = await repo.getProductById(productId);
//     return Response.json(product, { status: 200 });
// }

// export async function PUT(request, { params }) {
//     const productid = params.id;
//     const product = await request.json();
//     const updatedproduct = await repo.updateproduct(productid, product);
//     return Response.json(updatedproduct);
// }
// export async function DELETE(request, { params }) {
//     const { id } = params;
//     const product = await repo.deleteproduct(id);
//     return Response.json(product, { status: 200 });
// }

