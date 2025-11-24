# Serverless Async Flow — Cafeteria Message System

Este projeto é um estudo prático para aprender **Node.js**, **TypeScript**, **AWS Lambda**, **SQS (fila)**, **Localstack** e **Terraform**, simulando o fluxo de pedidos de uma cafeteria.

A ideia é criar uma comunicação **assíncrona** entre duas Lambdas por meio de uma fila, onde:

- A **Lambda 1** recebe um “pedido” (via Postman)  
- Envia o pedido para a **fila (SQS)**  
- A **Lambda 2** consome essa mensagem e “processa” o pedido  

Tudo localmente usando **Localstack**, sem custo e sem depender da AWS real.

## Estrutura do Projeto
```
serverless-async-flow
│
├── lambdas/
│   ├── order-request-lambda/
│   └── order-processor-lambda/
│
├── infra/
├── localstack/
├── tsconfig.base.json
├── package.json
└── README.md
```

## Tech Stack

- Node.js + TypeScript  
- AWS Lambda  
- AWS SQS  
- Terraform  
- Localstack  
- Postman  
- Docker  

## Fluxo de Funcionamento

1. POST → Lambda 1  
2. Lambda 1 → envia mensagem pra fila  
3. Fila → entrega pra Lambda 2  
4. Lambda 2 → processa/loga o pedido  