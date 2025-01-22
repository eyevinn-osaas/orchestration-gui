#!/bin/sh

if [ ! -z "$OSC_HOSTNAME" ]; then
  echo "Running in OSC"
  export NEXTAUTH_SECRET="7b92cf5245045abdafaa694ec77c8c7d"
  export NEXTAUTH_URL="https://$OSC_HOSTNAME"
  export UI_LANG="en"

  if [ -z "$MONGODB_URI" ]; then
    export MONGODB_URI="mongodb://localhost:27017/"
  fi
fi

exec "$@"
