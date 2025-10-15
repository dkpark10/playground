export const statService = {
  send: (payload: Record<string, any>) => {
    fetch('http://stat-referrer.example.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // JSON 전송 명시
      },
      body: JSON.stringify(payload),
    });
  },
};
