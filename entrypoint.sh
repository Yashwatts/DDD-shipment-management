#!/bin/sh
set -e

echo "Running shipment migrations..."
npm run migration:run --shipment

echo "Starting application..."
npm run start:dev