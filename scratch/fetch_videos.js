fetch('https://toddsiq.com/').then(r => r.text()).then(html => {
  const regex = /https:[^"'\s]+\.mp4(\?v=\d+)?/g;
  const matches = html.match(regex);
  console.log(JSON.stringify([...new Set(matches)], null, 2));
}).catch(e => console.error(e));
