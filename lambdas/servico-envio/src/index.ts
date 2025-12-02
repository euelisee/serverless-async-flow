import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import jwt from "jsonwebtoken";

const client = new SQSClient({
  region: "us-east-1",
  endpoint: "http://localhost:4566",
  credentials: { accessKeyId: "test", secretAccessKey: "test" }
});

const testeRetorno = async() => {
    return {mensagem: "Mensagem de teste feito com sucesso!!!!"};
}

const main = async () => {
  try {
    console.log("Buscando dados...");
    const mensagem = await testeRetorno();

    const segredo = "minha-senha-super-secreta";
    const token = jwt.sign(mensagem, segredo, { expiresIn: '1h' });
    console.log("Token gerado:", token);

    const command = new SendMessageCommand({
      QueueUrl: "http://localhost:4566/000000000000/fila-pedidos",
      MessageBody: JSON.stringify({ token: token }) 
    });

    await client.send(command);
    console.log("Mensagem enviada para a fila com sucesso!");

  } catch (erro) {
    console.error("Erro:", erro);
  }
};

main();