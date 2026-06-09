// Vercel Edge Function — 服务端代理 IP 查询，绕开 GFW
export const runtime = 'edge';

export default async function handler(request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '';

  try {
    const r = await fetch(`https://freeipapi.com/api/json/${ip}`);
    const d = await r.json();
    const country = d.countryName || '';
    const city = d.cityName || '';
    return new Response(JSON.stringify({ country, city }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch {
    return new Response(JSON.stringify({ country: '', city: '' }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
