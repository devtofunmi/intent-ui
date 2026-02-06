export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.body;
  const client_id = process.env.VITE_GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    return res.status(500).json({ error: 'GitHub credentials not configured in environment' });
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('GitHub Token Exchange Error:', error);
    return res.status(500).json({ error: 'Failed to exchange code for token' });
  }
}
