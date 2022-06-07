FROM node:lts

#RUN apk add --no-cache --update curl bash
WORKDIR ./

ARG PORT=3001
ENV PORT=$PORT

COPY package* ./
# Install the npm packages
RUN npm install

COPY . .

EXPOSE $PORT

CMD ["npm", "start"]