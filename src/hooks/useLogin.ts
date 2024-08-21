import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { CallbackHook } from './types';

export function useLogin(): CallbackHook<
  (username: string, password: string) => Promise<void>
> {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const doLogin = useCallback(
    (username: string, password: string) => {
      setLoading(true);
      return fetch('/api/manager/login', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
        .then((response) => {
          if (response.ok) {
            return router.replace('/home');
          }
          throw response.text();
        })
        .finally(() => setLoading(false));
    },
    [router]
  );

  return [doLogin, loading];
}
