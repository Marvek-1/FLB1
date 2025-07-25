#!/bin/bash

echo "🔥 Starting FlameBorn Ubuntu Testnet with Neon Postgres..."
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📚 Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Set environment variables if .env exists
if [ -f ".env" ]; then
    echo "🔐 Loading environment variables..."
    export $(cat .env | xargs)
fi

# Create database tables
echo "🗄️  Initializing Ubuntu database..."
python -c "from neon_models import create_tables; create_tables()"

# Start the server
echo "🚀 Starting FlameBorn Ubuntu Testnet..."
echo "🌐 Server will be available at: http://localhost:8000"
echo "📚 API Documentation: http://localhost:8000/docs"
echo "🔥 Ubuntu Philosophy: I am because we are"
echo ""

uvicorn neon_main:app --host 0.0.0.0 --port 8000 --reload
