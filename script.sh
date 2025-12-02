#!/bin/bash

echo " 1. Subindo o Docker (Localstack)..."
# O -d significa "detached", ou seja, roda em segundo plano sem travar o terminal
docker-compose up -d

echo "2. Esperando 10 segundos para o Localstack acordar totalmente..."
sleep 10

echo "🏗️ 3. Criando a Infraestrutura (Terraform)..."
cd infra
terraform init
terraform apply -auto-approve
cd ..

echo "4. Instalando dependências do Serviço de Envio..."
cd lambdas/servico-envio
npm install
cd ../..

echo " 5. Instalando dependências do Serviço de Recebimento..."
cd lambdas/servico-recebimento
npm install
cd ../..

echo "Tudo pronto! O ambiente está configurado."