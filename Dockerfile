# Usando o SDK do .NET 9 para compilar o projeto
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copia o arquivo de projeto e restaura as dependências
COPY *.csproj ./
RUN dotnet restore

# Copia os arquivos e compila a aplicação
COPY . ./
RUN dotnet publish -c Release -o /app/publish

# Usando o runtime do .NET 9 para rodar a aplicação
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .

# Expõe a porta e inicia a aplicação
EXPOSE 80
ENTRYPOINT ["dotnet", "ProjetoChallenge.dll"]
