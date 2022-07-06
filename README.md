# CMC Assignment

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
- Apigateway: Nginx

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