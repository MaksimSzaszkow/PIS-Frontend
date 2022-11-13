FROM node:12.18.1
WORKDIR /frontend
ADD . /frontend

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm", "start"]