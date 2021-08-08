FROM node:latest

WORKDIR /var/www/app

CMD ["npm", "start"]

EXPOSE 3000
