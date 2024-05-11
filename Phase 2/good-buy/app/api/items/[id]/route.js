import repo from "../../../repo/items-seller-customer";

export async function GET(request) {
  const items = await repo.getItems();
  return Response.json(items);
  //return Response.json("hello", { status: 200 });
}

