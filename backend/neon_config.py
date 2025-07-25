"""
FlameBorn Neon Database Configuration
Ubuntu Philosophy: "I am because we are"
"""

import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Neon Database Configuration
NEON_DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://neondb_owner:your_password@ep-example.us-east-1.aws.neon.tech/neondb?sslmode=require"
)

# For local development fallback
LOCAL_DATABASE_URL = "sqlite:///./flameborn_testnet.db"

# Determine which database to use
if NEON_DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = NEON_DATABASE_URL
    logger.info("🔥 Using Neon Postgres for FlameBorn Ubuntu Network")
else:
    DATABASE_URL = LOCAL_DATABASE_URL
    logger.info("🔥 Using SQLite for local FlameBorn development")

# Create engine with Neon-optimized settings
if DATABASE_URL.startswith("postgresql://"):
    engine = create_engine(
        DATABASE_URL,
        poolclass=NullPool,  # Neon handles connection pooling
        echo=False,  # Set to True for SQL debugging
        connect_args={
            "sslmode": "require",
            "application_name": "flameborn-testnet-ubuntu"
        }
    )
else:
    engine = create_engine(
        DATABASE_URL,
        echo=True,
        connect_args={"check_same_thread": False}
    )

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create base class for models
Base = declarative_base()

def get_database_info():
    """Get database connection information"""
    return {
        "database_type": "postgresql" if DATABASE_URL.startswith("postgresql://") else "sqlite",
        "database_url": DATABASE_URL.split("@")[1] if "@" in DATABASE_URL else "local",
        "ubuntu_message": "I am because we are - Ubuntu database connection active"
    }

def test_connection():
    """Test database connection"""
    try:
        with engine.connect() as connection:
            result = connection.execute("SELECT 1 as ubuntu_test")
            return {"status": "connected", "ubuntu_flame": "burning bright"}
    except Exception as e:
        logger.error(f"Database connection failed: {e}")
        return {"status": "failed", "error": str(e)}

# Dependency for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
