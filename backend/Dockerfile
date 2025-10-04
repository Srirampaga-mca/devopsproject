FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 

COPY start.sh .
RUN chmod +x ./start.sh
EXPOSE 5000
# CMD ["node", "server.js"]
CMD ["./start.sh"]