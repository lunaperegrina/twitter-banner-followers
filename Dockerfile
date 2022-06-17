FROM node:18-alpine3.15

LABEL maintainer="pedroperegrinaa"

WORKDIR /src

COPY . .

RUN apk add --no-cache git
CMD ["git","--version"]


RUN apk add --no-cache bash
CMD ["bash","--version"]


RUN npm install -g pnpm
RUN pnpm install

CMD ["pnpm", "start"]
# RUN pnpm dev