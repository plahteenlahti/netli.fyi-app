#!/bin/sh
gpg --quiet --batch --yes --decrypt --passphrase="$APPSTORE_AUTHKEY" --output ../ios/authkey.json ../ios/authkey.json.gpg