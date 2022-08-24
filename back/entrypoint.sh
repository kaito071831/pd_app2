#!/bin/bash
set -e

rm -f /pdapi/tmp/pids/server.pid

exec "$@"
