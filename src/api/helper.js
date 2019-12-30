const base = 'http://localhost:3000/';

export default async function helper ({ resource, method = 'GET', body }) {
  const resp = await fetch(base + resource, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(resp => resp.json());

  return resp;
}
