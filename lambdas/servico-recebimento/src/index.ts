import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";
import jwt from "jsonwebtoken";

const client = new SQSClient({
  region: "us-east-1",
  endpoint: "http://localhost:4566",
  credentials: { accessKeyId: "test", secretAccessKey: "test" }
});

const QUEUE_URL = "http://localhost:4566/000000000000/fila-pedidos";

const validarToken = (token: string) => {
  try {
    return jwt.verify(token, "minha-senha-super-secreta"); 
  } catch (e) {
    console.error("Token Falso ou Expirado!");
    return null;
  }
};

const ouvirFila = async () => {
  console.log("Ouvindo a fila (Pressione Ctrl+C para parar)...");

  while (true) { 
    const command = new ReceiveMessageCommand({
      QueueUrl: QUEUE_URL,
      MaxNumberOfMessages: 1,
      WaitTimeSeconds: 5 
    });

    const response = await client.send(command);

    if (response.Messages) {
      for (const msg of response.Messages) {
        console.log("Mensagem Recebida!");
        
        const body = JSON.parse(msg.Body || "{}");
        const dadosDecodificados = validarToken(body.token);

        if (dadosDecodificados) {
          console.log("Sucesso! Processando dados:", dadosDecodificados);
          
          await client.send(new DeleteMessageCommand({
            QueueUrl: QUEUE_URL,
            ReceiptHandle: msg.ReceiptHandle
          }));
        }
      }
    }
  }
};

ouvirFila();