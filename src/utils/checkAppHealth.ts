interface Response {
  message?: string;
  version?: string;
}

export default function checkAppHealth() {
  return new Promise<Response>((resolve, reject) =>
    fetch('/api/health')
      .then((data) => data.json())
      .then((data) => resolve(data))
      .catch(() => reject(false))
  );
}
