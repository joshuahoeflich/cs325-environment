#!/bin/sh
set -e
for i in `seq 1 100`; do npm test; done
