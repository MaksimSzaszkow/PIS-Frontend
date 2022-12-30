FROM node:19-bullseye
WORKDIR /frontend
ADD . /frontend

RUN npm install -g serve && npm install
RUN npm run build

EXPOSE 3000

ENTRYPOINT ["serve", "-s", "build", "-l", "3000"]
