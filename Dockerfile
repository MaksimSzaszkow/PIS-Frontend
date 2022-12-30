FROM node:19-bullseye
WORKDIR /frontend
ADD . /frontend

RUN npm install -g serve
RUN npm install --legacy-peer-deps
RUN npm run build

EXPOSE 3000

ENTRYPOINT ["serve", "-s", "build", "-l", "3000"]
