# ProjetoChallenge - Instalação e Configuração

Este repositório contém um projeto full stack composto por um backend em .NET Core 9.0 e um frontend em ReactJS 19.1.0. Ambas as partes estão contidas na pasta `ProjetoChallenge` e utilizam Docker para facilitar a execução dos containers.

## Estrutura do Projeto

```
ProjetoChallenge/
├── Backend/            # Backend em .NET Core 9.0 (Web API)
│   ├── Dockerfile      # Arquivo de configuração do Docker
│   ├── src/            # Código-fonte da API
├── frontend-application/ # Frontend em ReactJS ^19.1.0
│   ├── src/            # Código-fonte do React
├── docker-compose.yml  # Arquivo de orquestração do Docker
```

## Requisitos
Antes de iniciar a instalação, certifique-se de ter os seguintes softwares instalados:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (para rodar o frontend localmente)
- [.NET SDK 9.0](https://dotnet.microsoft.com/en-us/download) (para rodar o backend localmente)

## Configuração do Backend

### Executando com Docker
1. Acesse a pasta `Backend`:
   ```sh
   cd ProjetoChallenge/Backend
   ```
2. Construa a imagem do backend:
   ```sh
   docker build -t projetochallenge-backend .
   ```
3. Rode o container:
   ```sh
   docker run -p 5000:5000 projetochallenge-backend
   ```

### Executando localmente
1. Instale as dependências:
   ```sh
   dotnet restore
   ```
2. Rode a aplicação:
   ```sh
   dotnet run
   ```

A API estará rodando em `http://localhost:5000`

## Configuração do Frontend

### Criando um Dockerfile para o frontend-application
Para containerizar o frontend, crie um arquivo `Dockerfile` dentro da pasta `frontend-application` com o seguinte conteúdo:

```
# Usando uma imagem do Node.js
FROM node:20-alpine
 
WORKDIR /app
 
COPY package*.json ./
 
RUN npm install
 
COPY . .
 
EXPOSE 3000
 
CMD ["npm", "start"]
```

### Executando com Docker
1. Acesse a pasta `frontend-application`:
   ```sh
   cd ProjetoChallenge/frontend-application
   ```
2. Construa a imagem do frontend:
   ```sh
   docker build -t projeto_challenge_frontend .
   ```
3. Rode o container:
   ```sh
   docker run -p 3000:3000 projeto_challenge_frontend
   ```

### Executando localmente
1. Acesse a pasta `Frontend`:
   ```sh
   cd ProjetoChallenge/Frontend
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Rode a aplicação:
   ```sh
   npm start
   ```

A aplicação estará rodando em `http://localhost:3000`

## Executando com Docker Compose

Se quiser rodar tanto o backend quanto o frontend com Docker Compose, use os seguintes comandos na raiz do projeto (`ProjetoChallenge/`):

```sh
docker-compose up --build
```

Isso iniciará ambos os containers definidos no `docker-compose.yml`.

## Contribuição
Para contribuir com o projeto:
1. Faça um fork deste repositório.
2. Crie um branch para a sua feature (`git checkout -b minha-feature`).
3. Faça commit das suas alterações (`git commit -m 'Minha feature'`).
4. Envie para o repositório remoto (`git push origin minha-feature`).
5. Abra um pull request.

---


