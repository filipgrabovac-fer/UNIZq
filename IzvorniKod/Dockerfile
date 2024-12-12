# Stage 1: Build the frontend
FROM node:20 AS unizq-fe
WORKDIR /app
COPY src ./src
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN echo $VITE_GOOGLE_MAPS_API_KEY
RUN npm run build


# Stage 2: Build the backend
FROM gradle:8.5-jdk17 AS unizq-be
WORKDIR /app
COPY --from=unizq-fe /app/src ./src
COPY build.gradle settings.gradle gradlew ./
RUN gradle build 

# Stage 3: Run the application
FROM openjdk:17-jdk AS unizq
WORKDIR /app
COPY --from=unizq-be /app/build/libs/*.jar ./app.jar
EXPOSE 8080
CMD ["java", "-jar", "./app.jar"]