export async function GET() {
  return Response.json({
    message: "Protected admin API is working",
  })
}