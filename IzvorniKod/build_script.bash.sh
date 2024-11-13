#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

if [ -n "${JAVA_HOME}" ]
then
    echo "installing nvm..."


    # navigate to backend
    cd /backend

    # Define variables
    JAVA_VERSION="17"  # Specify your Java version
    INSTALL_DIR="java"
    JDK_URL="https://github.com/adoptium/temurin17-binaries/releases/latest/download/OpenJDK17U-jdk_x64_linux_hotspot.tar.gz"


    # Create the installation directory
    mkdir -p $INSTALL_DIR

    # Download the JDK tarball
    echo "Downloading OpenJDK ${JAVA_VERSION} from Adoptium..."
    curl -L -o openjdk.tar.gz https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.8+7/OpenJDK17U-jdk_x64_linux_hotspot_17.0.8_7.tar.gz

    # Extract the tarball
    echo "Extracting OpenJDK..."
    tar -xvzf openjdk.tar.gz -C $INSTALL_DIR --strip-components=1

    # Clean up the tarball
    rm openjdk.tar.gz

    echo 'export JAVA_HOME=/backend/java' >> ~/.bashrc
    echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc
    source ~/.bashrc

    echo "Java installed successfully"

    chmod +x ./gradlew 
    cd ..
fi

# Define directories
FRONTEND_DIR="./frontend"
BACKEND_DIR="./backend"
SPRING_STATIC_DIR="../backend/src/main/resources/"

# Define directories

echo "Starting frontend build..."

# # Install NVM (Node Version Manager)
# echo "Installing NVM..."

# # Download and install NVM (Node Version Manager) script
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# # Manually source NVM from the installed location (since .bashrc isn't loaded in a non-interactive shell)
# export NVM_DIR="$HOME/.nvm" 
#loading nvm
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  
# # Install the latest LTS version of Node.js (which includes npm)
# echo "Installing Node.js and npm..."
# nvm install --lts

# Verify Node.js and npm installation
echo "Verifying installation..."
node -v
npm -v


# Navigate to frontend
cd $FRONTEND_DIR

echo "Installing dependencies..."
npm install

# Build the frontend (TypeScript compile + Vite build)
echo "Building frontend..."
npm run build

# Check if the build succeeded
if [ ! -d "dist" ]; then
echo "Frontend build failed. Exiting..."
exit 1
fi

# Copy frontend build to Spring Boot static directory
echo "Copying frontend build to backend static directory..."
cd $SPRING_STATIC_DIR 
mkdir static
cd ../../../../frontend

mv dist/* $SPRING_STATIC_DIR/static/

rm -r dist/
