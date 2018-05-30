FROM node:8
# HTTP listener server
EXPOSE 8080
# WebSocket broadcast server
EXPOSE 8081
VOLUME [ "/app/tokens" ]
VOLUME [ "/app/certs" ]
WORKDIR /app
COPY . /app
RUN npm install
CMD [ "node", "index.js" ]
