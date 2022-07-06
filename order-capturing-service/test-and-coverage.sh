#!/bin/bash

wait_for_service() {
  local url=$1

  local status_code=$(curl --write-out %{http_code} --silent --output /dev/null "$url")
  echo "status code: $status_code $url"

  while [[ "$status_code" -ne 200 ]]; do
    sleep 1
    let status_code=$(curl --write-out %{http_code} --silent --output /dev/null "$url")
  done
   
}

npm run coverage &
wait_for_service http://localhost:3000/ping
curl -xPOST http://localhost:3000/sigterm
