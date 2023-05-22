import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { calendarId } = req.query;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const now = new Date().toISOString();

  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${now}`,
    );

    res.status(200).json({ events: data?.items || [] });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
}
