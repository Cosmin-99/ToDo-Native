FROM node 

WORKDIR /backend

COPY package.json /backend/

RUN npm install

RUN npm install -g nodemon && npm install -g concurrently && npm install -g typescript

COPY . /backend/

EXPOSE 5000

CMD ["npm", "run", "dev-watch"]