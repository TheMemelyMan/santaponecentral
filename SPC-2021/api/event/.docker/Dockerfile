# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /event

# copy csproj and restore as distinct layers
COPY /event/. /event/
RUN dotnet restore

# copy everything else and build app
RUN dotnet publish *.Api -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build /app /app
ENTRYPOINT ["/app/Event.Api"]