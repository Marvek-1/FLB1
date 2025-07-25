#!/bin/bash

echo "🚀 Deploying FlameBorn Testnet to Production..."
echo ""

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t flameborn-testnet:latest .

if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully"
else
    echo "❌ Docker build failed"
    exit 1
fi

# Run the container
echo "🔥 Starting FlameBorn Testnet container..."
docker run -d \
    --name flameborn-testnet \
    -p 8000:8000 \
    -v $(pwd)/data:/app/data \
    --restart unless-stopped \
    flameborn-testnet:latest

if [ $? -eq 0 ]; then
    echo "✅ FlameBorn Testnet deployed successfully!"
    echo ""
    echo "🌐 Access your testnet at: http://localhost:8000"
    echo "📚 API Documentation: http://localhost:8000/docs"
    echo "🔥 Ubuntu Philosophy: I am because we are"
else
    echo "❌ Deployment failed"
    exit 1
fi
