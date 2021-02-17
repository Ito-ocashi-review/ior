FROM node:14

RUN mkdir /ior

WORKDIR /ior
COPY . /ior

RUN yarn install

EXPOSE 8000
CMD sh -c "yarn install && yarn dev"