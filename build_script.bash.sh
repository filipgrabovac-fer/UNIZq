#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Define directories
FRONTEND_DIR="./frontend"
BACKEND_DIR="./backend"
SPRING_STATIC_DIR="../backend/src/main/resources/"

echo "Starting frontend build..."

# Navigate to frontend
cd $FRONTEND_DIR

# Download the latest Node.js (LTS) tarball
echo "Downloading Node.js..."
curl -sL https://nodejs.org/dist/latest-v18.x/node-v18.x.x-linux-x64.tar.xz -o nodejs.tar.xz

# Create installation directory
mkdir -p "$INSTALL_DIR"

# Extract the Node.js tarball
echo "Extracting Node.js..."
tar -xf nodejs.tar.xz -C "$INSTALL_DIR" --strip-components=1

# Remove the tarball after extraction
rm nodejs.tar.xz

# Add Node.js binary to the PATH by modifying .bashrc (or .zshrc for zsh users)
echo "Adding Node.js and npm to your PATH..."
echo 'export PATH="$HOME/nodejs/bin:$PATH"' >> ~/.bashrc

# Apply the changes to the current shell session
source ~/.bashrc

# Verify installation
echo "Verifying installation..."
node -v
npm -v

echo "Node.js and npm installation completed successfully!"
# Install dependencies if node_modules does not exist
echo "Installing frontend dependencies..."

# Install NVM (Node Version Manager)
echo "Installing NVM..."

# Download and install NVM (Node Version Manager) script
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# Manually source NVM from the installed location (since .bashrc isn't loaded in a non-interactive shell)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Install the latest LTS version of Node.js (which includes npm)
echo "Installing Node.js and npm..."
nvm install --lts

# Verify Node.js and npm installation
echo "Verifying installation..."
node -v
npm -v

echo "Node.js and npm installed successfully using NVM!"

# Install frontend dependencies
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

# Navigate to backend
cd ../backend

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
