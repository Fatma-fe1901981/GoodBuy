import Dashboard from '../../../repo/dashboard.js';

export async function GET(request, { params }) {
  message = "Hello World";
  return Response.json(message, { status: 200 })


    // const { id } = params.id;
    // const dashboard = await new Dashboard().getDashboardData(id);
    // return {
    //     status: 200,
    //     body: dashboard
    // };
}

export async function PUT(request, { params }) {

}
