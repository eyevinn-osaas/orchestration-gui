interface IObject {
  connected?: boolean;
  url?: string;
}

interface Response {
  database?: IObject;
  agileApi?: IObject;
  message?: string;
}

export default function checkApiConnections() {
  return new Promise<Response>((resolve, reject) =>
    fetch('/api/syshealth')
      .then((data) => data.json())
      .then((data) => resolve(data))
      .catch(() => reject(false))
  );
}
