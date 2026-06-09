// Vercel Serverless Function: IP Geolocation Proxy
// 由 Vercel 服务器代为查询 IP 归属地，绕过 GFW 限制
export default async function handler(req, res) {
  // 从 Vercel 请求头获取访问者真实 IP
  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    '';

  // 只接受 IPv4（免费 API 对 IPv6 定位不准）
  const ipv4 = ip.replace('::ffff:', '').replace(/^::1$/, '');

  const apis = [
    {
      url: `https://ipapi.co/${ipv4}/json/`,
      parse: (d) => ({ country: d.country_name, city: d.city }),
    },
    {
      url: `https://freeipapi.com/api/json/${ipv4}`,
      parse: (d) => ({ country: d.countryName, city: d.cityName }),
    },
  ];

  for (const api of apis) {
    try {
      const r = await fetch(api.url);
      const d = await r.json();
      const result = api.parse(d);
      if (result.city) {
        return res.status(200).json({ country: result.country, city: result.city });
      }
    } catch {
      continue;
    }
  }

  return res.status(200).json({ country: '', city: '' });
}
