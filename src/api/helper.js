import { uniqueByProperty } from '../util/helpers';

const base = 'http://172.16.0.142:3000/';

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

export async function multiFetch (urls = [], cb) {
  const history = [];
  const callbackCollector = function (id, received, total) {
    // push record into history
    history.push({ id, received, total });

    // distinct history by id
    const distinctHistory = uniqueByProperty(history, h => h.id);
    if (distinctHistory.length !== urls.length) return;

    // get total amount that is expected to be received
    const totalOfAllCals = distinctHistory
      .map(h => h.total)
      .reduce((acc, curr) => acc + curr);

    // get total amount of currently received
    const totalReceived = history
      .map(h => h.received)
      .reduce((acc, curr) => acc + curr);

    // send out actual callback
    cb(totalReceived, totalOfAllCals);
  };

  const calls = urls.map(url => progressFetch({ resource: url }, (rec, tot) => callbackCollector(url, rec, tot)));
  const values = await Promise.all(calls);

  return values;
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
