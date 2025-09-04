# Suoritus: Laita tämä yml-filu kansioon, jonka nimi voisi olla esim. dockermongo. 
# Mene komentokehotteessa kansioon ja aja komento 'docker compose up -d'

FROM node:18

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production
COPY . .

CMD ["npm", "start"]

