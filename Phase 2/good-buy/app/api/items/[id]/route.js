import repo from "../../../repo/items-seller-customer";

export async function GET(request) {
  //const items = await repo.getItems();
  //return Response.json(items);
  return Response.json("hello", { status: 200 });
}

export async function POST(request) {
  const item = await request.json();
  const newItem = await repo.getItems(item);
  return Response.json(newItem, { status: 201 });
}
