# Stage 1: Build the frontend
FROM node:20 AS unizq-fe
WORKDIR /app
COPY frontend/ ./
COPY src ./src
ARG VITE_GOOGLE_MAPS_API_KEY
ENV VITE_GOOGLE_MAPS_API_KEY=${VITE_GOOGLE_MAPS_API_KEY}
RUN npm install
RUN npm run build


# Stage 2: Build the backend
FROM gradle:8.5-jdk17 AS unizq-be
WORKDIR /app
COPY --from=unizq-fe /app/src ./src
COPY build.gradle settings.gradle gradlew ./
RUN gradle build 

# Stage 3: Run the application
FROM openjdk:21-jdk AS unizq
WORKDIR /app
ARG VERTEXAI_CLIENT_ID
ENV VERTEXAI_CLIENT_ID=${VERTEXAI_CLIENT_ID}
ARG VERTEXAI_CLIENT_SECRET
ENV VERTEXAI_CLIENT_SECRET=${VERTEXAI_CLIENT_SECRET}
ARG VERTEXAI_PROJECT_ID
ENV VERTEXAI_PROJECT_ID=${VERTEXAI_PROJECT_ID}
ARG VERTEXAI_REFRESH_TOKEN
ENV VERTEXAI_REFRESH_TOKEN=${VERTEXAI_REFRESH_TOKEN}
COPY vertex-ai-secret.json ./vertex-ai-secret.json
# Write to the JSON file
RUN echo "{ \
    \"account\": \"\", \
    \"client_id\": \"${VERTEXAI_CLIENT_ID}\", \
    \"client_secret\": \"${VERTEXAI_CLIENT_SECRET}\", \
    \"quota_project_id\": \"${VERTEXAI_PROJECT_ID}\", \
    \"refresh_token\": \"${VERTEXAI_REFRESH_TOKEN}\", \
    \"type\": \"authorized_user\", \
    \"universe_domain\": \"googleapis.com\" \
}" > ./vertex-ai-secret.json
COPY --from=unizq-be /app/build/libs/*.jar ./app.jar
EXPOSE 8080
CMD ["java", "-jar", "./app.jar"]