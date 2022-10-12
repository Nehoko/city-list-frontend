docker run \
    -itd \
    --rm \
    --name city-list-frontend \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3000:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    city-list-frontend:dev
