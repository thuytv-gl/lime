# Micoservices boilerplate

## Requirements
- Architecture: microservices
- Deployment: containerized
- Language: Nodejs
- Database: Relational
- Commute Model: Asynchronous
- Container: Docker

## Suggested tech stack
- OS: Linux (or windows WSL)
- Database: Mysql
- Language: Nodejs + javascript
- Framework: ExpressJS
- Queue service: RabbitMQ
- Validation: ajv
- Test Framework: Cucumber + lcov
- Code lint: Eslint + Airbnb specs
- Logging: text file, format: [level][date][correlationId][targetFile]: content
- Api Gateway: Nginx

## Start testing
```
docker-compose up --build
```

go to [http://localhost:8080](http://localhost:8080) (swager ui entrypoint)  

placing new order
- supported clientId: 1 -> 10
- supported itemId: 1 -> 10

order status could be:
- ORDERD: when all informations are valid
- OOF: Item out of stock
- BIS: User balance in short (not enough to order)

## Services folder structure
```tree
.
├── app
│   ├── api
│   │   ├── http
│   │   │   ├── client          # restful client to other services
│   │   │   └── server          # restful server
│   │   ├── rabbitmq
│   │   │   ├── in              # broker consumers
│   │   │   └── out             # brocker publishers
│   │   └── sqlite              # database utilities
│   └── service
└── tests
    ├── data                    # mock data
    └── features
        ├── step_definitions    # cucumber steps definitions
        └── support             # services mocking
```
