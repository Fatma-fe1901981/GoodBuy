import repo from "../../../../repo/items-seller-customer";


export async function POST(request) {
    const item = await request.json();
    const newItem = await repo.getItems(item);
    return Response.json(newItem, { status: 201 });
  }
  export async function PUT(request, { params }) {
    const itemId = params.id;
    const item = await request.json();
    const updatedItem = await repo.updateItem(itemId, item);
    return Response.json(updatedItem);
  }