
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["ProjetoChallenge.csproj", "./"]
RUN dotnet restore "ProjetoChallenge.csproj"

COPY . .

WORKDIR /src

RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

RUN dotnet build "ProjetoChallenge.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ProjetoChallenge.csproj" -c Release -o /app/publish


FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ProjetoChallenge.dll"]