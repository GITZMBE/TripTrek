

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();

  return new Response(JSON.stringify({ data: body }), { status: 200 });
};