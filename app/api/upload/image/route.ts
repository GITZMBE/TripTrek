import { put } from "@vercel/blob";

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();
  const upload = await put(body.name, body, { access: 'public' });

  return new Response(JSON.stringify(upload));
};