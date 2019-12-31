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

export async function progressFetch ({ resource, method = 'GET', body }, cb) {
  const response = await fetch(base + resource, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const reader = response.body.getReader();
  const totalLength = +response.headers.get('Content-Length');
  cb(0, totalLength);

  // receive the data
  let receivedLength = 0;
  let chunks = [];

  // read the data
  while (true) {
    const { done, value } = await reader.read();

    // stop if done
    if (done) break;

    chunks.push(value);
    receivedLength += value.length;

    // callback
    cb(receivedLength, totalLength);
  }

  // concatenate chunks into single array
  let all = new Uint8Array(receivedLength);
  let pos = 0;
  chunks.forEach(c => {
    all.set(c, pos);
    pos += c.length;
  });

  // decode into a string
  const str = new TextDecoder('utf-8').decode(all);
  return JSON.parse(str);
}
