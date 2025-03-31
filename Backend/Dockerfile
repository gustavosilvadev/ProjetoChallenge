# # Usando o SDK do .NET 9 para compilar o projeto
# FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
# WORKDIR /app

# # Copia o arquivo de projeto e restaura as dependências
# COPY *.csproj ./
# RUN dotnet restore

# # Copia os arquivos e compila a aplicação
# COPY . ./
# RUN dotnet publish -c Release -o /app/publish

# # Usando o runtime do .NET 9 para rodar a aplicação
# FROM mcr.microsoft.com/dotnet/aspnet:9.0
# WORKDIR /app
# COPY --from=build /app/publish .

# # Expõe a porta e inicia a aplicação
# EXPOSE 80
# ENTRYPOINT ["dotnet", "ProjetoChallenge.dll"]
# *************************************************************************

# FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
# WORKDIR /app
# EXPOSE 80

# FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
# WORKDIR /src

# # Corrigir o caminho para o .csproj baseado no contexto do Docker
# COPY ["ProjetoChallenge.csproj", "./"]

# RUN dotnet restore "ProjetoChallenge.csproj"

# RUN dotnet tool install --global dotnet-ef
# RUN dotnet ef migrations add InitialCreate
# RUN dotnet ef database update

# # Copiar o restante dos arquivos
# COPY . .

# # Agora o WORKDIR precisa ser para o local onde o .csproj realmente está
# WORKDIR "/src"
# RUN dotnet build "ProjetoChallenge.csproj" -c Release -o /app/build

# FROM build AS publish
# RUN dotnet publish "ProjetoChallenge.csproj" -c Release -o /app/publish

# FROM base AS final
# WORKDIR /app
# COPY --from=publish /app/publish .
# ENTRYPOINT ["dotnet", "ProjetoChallenge.dll"]

# Base para execução do projeto
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80

# Base para compilar o projeto
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copiar os arquivos do projeto para o container
COPY ["ProjetoChallenge.csproj", "./"]
RUN dotnet restore "ProjetoChallenge.csproj"

# Copiar todos os arquivos do projeto
COPY . .

# Definir o diretório de trabalho para onde está o .csproj
WORKDIR /src

# Instalar a ferramenta dotnet-ef e adicioná-la ao PATH
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

# Executar as migrations
# RUN dotnet ef migrations add UserProductCreate
# RUN dotnet ef database update

# Compilar o projeto
RUN dotnet build "ProjetoChallenge.csproj" -c Release -o /app/build

# Publicação do projeto
FROM build AS publish
RUN dotnet publish "ProjetoChallenge.csproj" -c Release -o /app/publish

# Finalizando a imagem para execução
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ProjetoChallenge.dll"]