# rabbitmq-nodejs


## Requirement
* docker
* docker-compose
* nodejs

## Running the app

Clone project
```shell
$ git clone https://github.com/hafizhsb/rabbitmq-nodejs.git
```
Install Dependencies
```shell
$ npm install
```

To run rabbitMQ server execute:

```shell
$ docker-compose up
```
or (running in background)
```shell
$ docker-compose up -d
```

To run example code execute:

```shell
$ cd foldername
$ node init.js
$ node producer.js
$ node consumer.js
```
