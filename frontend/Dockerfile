FROM node

WORKDIR /frontend

COPY package.json /frontend/

RUN npm install

RUN npm install -g expo-cli

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

CMD ["expo" , "start"]