"""
FlameBorn Testnet with Neon Postgres Integration
Ubuntu Healthcare Tokenization Platform
"""

from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from pydantic import BaseModel, Field
from datetime import datetime, timedelta
from typing import List, Optional
import os
import random
import uuid
import logging

# Import Neon configuration and models
from neon_config import get_db, get_database_info, test_connection
from neon_models import (
    UbuntuUser, UbuntuValidator, ValidatorHeartbeat, HealthcareAction,
    UbuntuTransaction, UbuntuCommunityMetrics, ProverbWisdom,
    MostarAIInteraction, NetworkOracle, create_tables
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="🔥 FlameBorn Ubuntu Testnet",
    description="Ubuntu Healthcare Tokenization Platform - I am because we are",
    version="0.0.1-alpha-neon",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Models
class UbuntuUserCreate(BaseModel):
    wallet_address: str = Field(..., min_length=42, max_length=42)
    role: str = Field(..., regex="^(healer|guardian|community)$")
    name: str = Field(..., min_length=2, max_length=100)
    location: str = Field(..., max_length=100)
    country: str = Field(default="", max_length=50)

class UbuntuUserResponse(BaseModel):
    id: int
    uuid: str
    wallet_address: str
    role: str
    name: str
    location: str
    country: str
    verification_status: str
    flb_balance: float
    ubuntu_score: float
    created_at: datetime
    is_validator: bool
    is_active: bool

    class Config:
        from_attributes = True

class HealthcareActionCreate(BaseModel):
    action_type: str = Field(..., regex="^(birth_verification|health_education|treatment|emergency)$")
    title: str = Field(..., min_length=5, max_length=200)
    description: str = Field(..., min_length=10, max_length=1000)
    location: str = Field(..., max_length=100)
    impact_score: float = Field(..., ge=0.1, le=10.0)

class HealthcareActionResponse(BaseModel):
    id: int
    action_type: str
    title: str
    description: str
    location: str
    impact_score: float
    flb_earned: float
    verification_status: str
    created_at: datetime
    ubuntu_blessing: Optional[str]

    class Config:
        from_attributes = True

class ValidatorCreate(BaseModel):
    wallet_address: str = Field(..., min_length=42, max_length=42)
    stake_amount: float = Field(..., ge=1000.0)
    validator_key: str = Field(..., min_length=10)

class ValidatorResponse(BaseModel):
    id: int
    validator_key: str
    stake_amount: float
    status: str
    uptime_percentage: float
    total_blocks_validated: int
    last_heartbeat: datetime
    ubuntu_consensus_score: float

    class Config:
        from_attributes = True

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    """Initialize database and seed data"""
    try:
        # Create tables
        create_tables()
        
        # Test connection
        connection_info = test_connection()
        logger.info(f"Database connection: {connection_info}")
        
        # Seed initial data
        db = next(get_db())
        await seed_ubuntu_data(db)
        
        logger.info("🔥 FlameBorn Ubuntu Testnet started successfully!")
        logger.info("Ubuntu Philosophy: I am because we are")
        
    except Exception as e:
        logger.error(f"Startup failed: {e}")
        raise

async def seed_ubuntu_data(db: Session):
    """Seed initial Ubuntu community data"""
    
    # Check if data already exists
    if db.query(UbuntuUser).count() > 0:
        return
    
    # Create Ubuntu proverbs
    ubuntu_proverbs = [
        {
            "proverb_text": "Umuntu ngumuntu ngabantu",
            "origin_country": "South Africa",
            "origin_tribe": "Zulu",
            "english_translation": "A person is a person through other persons",
            "ubuntu_meaning": "Our humanity is affirmed through recognizing the humanity of others",
            "category": "community"
        },
        {
            "proverb_text": "Motho ke motho ka batho",
            "origin_country": "South Africa", 
            "origin_tribe": "Sotho",
            "english_translation": "A person is a person because of other people",
            "ubuntu_meaning": "Individual identity and success comes through community support",
            "category": "community"
        },
        {
            "proverb_text": "Harambee",
            "origin_country": "Kenya",
            "origin_tribe": "Kikuyu",
            "english_translation": "Let us all pull together",
            "ubuntu_meaning": "Collective effort leads to community prosperity",
            "category": "healthcare"
        }
    ]
    
    for proverb_data in ubuntu_proverbs:
        proverb = ProverbWisdom(**proverb_data)
        db.add(proverb)
    
    # Create test Ubuntu users
    test_users = [
        {
            "wallet_address": "0x1234567890abcdef1234567890abcdef12345678",
            "role": "healer",
            "name": "Dr. Amara Okafor",
            "location": "Lagos",
            "country": "Nigeria",
            "verification_status": "verified",
            "flb_balance": 2500.0,
            "ubuntu_score": 95.5,
            "is_validator": True
        },
        {
            "wallet_address": "0xabcdef1234567890abcdef1234567890abcdef12",
            "role": "guardian",
            "name": "Mama Fatima Kone",
            "location": "Nairobi",
            "country": "Kenya",
            "verification_status": "verified",
            "flb_balance": 1800.0,
            "ubuntu_score": 88.2
        },
        {
            "wallet_address": "0x9876543210fedcba9876543210fedcba98765432",
            "role": "community",
            "name": "Ubuntu Collective Cape Town",
            "location": "Cape Town",
            "country": "South Africa",
            "verification_status": "verified",
            "flb_balance": 3200.0,
            "ubuntu_score": 92.8
        }
    ]
    
    for user_data in test_users:
        user = UbuntuUser(**user_data)
        db.add(user)
    
    db.commit()
    
    # Create validator for first user
    validator = UbuntuValidator(
        user_id=1,
        validator_key="ubuntu_validator_genesis_001",
        stake_amount=15000.0,
        status="active",
        uptime_percentage=99.8,
        total_blocks_validated=1247,
        ubuntu_consensus_score=96.5
    )
    db.add(validator)
    
    # Create sample healthcare actions
    healthcare_actions = [
        {
            "user_id": 1,
            "action_type": "birth_verification",
            "title": "Ubuntu Birth Registration - Baby Mandela",
            "description": "Successfully registered and celebrated the birth of baby Mandela in rural clinic. Community gathered to welcome new Ubuntu member.",
            "location": "Lagos, Nigeria",
            "impact_score": 9.5,
            "flb_earned": 150.0,
            "verification_status": "verified",
            "ubuntu_blessing": "A new flame joins our Ubuntu community. I am because we are."
        },
        {
            "user_id": 2,
            "action_type": "health_education",
            "title": "Maternal Health Ubuntu Workshop",
            "description": "Conducted comprehensive maternal health education for 75 expecting mothers, sharing Ubuntu wisdom and modern healthcare practices.",
            "location": "Nairobi, Kenya",
            "impact_score": 8.8,
            "flb_earned": 132.0,
            "verification_status": "verified",
            "ubuntu_blessing": "Knowledge shared strengthens our Ubuntu bonds."
        }
    ]
    
    for action_data in healthcare_actions:
        action = HealthcareAction(**action_data)
        db.add(action)
    
    db.commit()
    logger.info("🔥 Ubuntu seed data created successfully!")

# Routes
@app.get("/")
async def root():
    """Welcome to FlameBorn Ubuntu Testnet"""
    db_info = get_database_info()
    return {
        "message": "🔥 FlameBorn Ubuntu Testnet - Neon Powered 🔥",
        "version": "0.0.1-alpha-neon",
        "ubuntu_philosophy": "I am because we are",
        "database": db_info,
        "status": "The flame cannot whisper. It must roar.",
        "endpoints": {
            "health": "/health",
            "ping": "/ping",
            "manifest": "/.well-known/manifest.json",
            "docs": "/docs",
            "ubuntu_stats": "/ubuntu/stats"
        }
    }

@app.get("/ping")
async def ping():
    """Network heartbeat"""
    return {
        "status": "alive",
        "network": "FlameBorn-Ubuntu-Testnet",
        "ubuntu": "I am because we are",
        "timestamp": datetime.utcnow().isoformat(),
        "flame_status": "🔥 burning bright with Ubuntu spirit",
        "neon_powered": True
    }

@app.get("/.well-known/manifest.json")
async def manifest():
    """Ubuntu protocol manifest"""
    return {
        "network": "FlameBorn-Ubuntu-Testnet",
        "version": "0.0.1-alpha-neon",
        "oracle": True,
        "validator": True,
        "ubuntu_philosophy": "I am because we are",
        "consensus": "Ubuntu-PoS",
        "database": "neon-postgres",
        "token": {
            "symbol": "FLAME",
            "name": "FlameBorn Ubuntu Token",
            "decimals": 18,
            "total_supply": 1000000000,
            "ubuntu_distribution": "Community-first allocation"
        },
        "chain_id": "flameborn-ubuntu-testnet-1",
        "features": {
            "healthcare_tokenization": True,
            "ubuntu_consensus": True,
            "validator_network": True,
            "birth_registration": True,
            "impact_mining": True,
            "community_governance": True,
            "proverb_wisdom": True,
            "mostar_ai_integration": True
        },
        "ubuntu_principles": [
            "I am because we are",
            "Collective prosperity through individual success",
            "Healthcare as a human right",
            "Community validation and support",
            "Traditional wisdom meets modern technology"
        ]
    }

# Ubuntu User Management
@app.post("/ubuntu/users", response_model=UbuntuUserResponse)
async def create_ubuntu_user(user: UbuntuUserCreate, db: Session = Depends(get_db)):
    """Register new Ubuntu community member"""
    
    # Check if user already exists
    existing_user = db.query(UbuntuUser).filter(
        UbuntuUser.wallet_address == user.wallet_address
    ).first()
    
    if existing_user:
        raise HTTPException(
            status_code=400, 
            detail="Ubuntu member already exists in our community"
        )
    
    # Create new Ubuntu user
    db_user = UbuntuUser(
        **user.dict(),
        flb_balance=100.0,  # Welcome bonus
        ubuntu_score=10.0   # Starting Ubuntu score
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    logger.info(f"New Ubuntu member joined: {user.name} from {user.location}")
    return db_user

@app.get("/ubuntu/users", response_model=List[UbuntuUserResponse])
async def get_ubuntu_users(
    skip: int = 0, 
    limit: int = 100, 
    role: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get Ubuntu community members"""
    
    query = db.query(UbuntuUser).filter(UbuntuUser.is_active == True)
    
    if role:
        query = query.filter(UbuntuUser.role == role)
    
    users = query.offset(skip).limit(limit).all()
    return users

@app.get("/ubuntu/users/{wallet_address}", response_model=UbuntuUserResponse)
async def get_ubuntu_user(wallet_address: str, db: Session = Depends(get_db)):
    """Get specific Ubuntu community member"""
    
    user = db.query(UbuntuUser).filter(
        UbuntuUser.wallet_address == wallet_address,
        UbuntuUser.is_active == True
    ).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="Ubuntu member not found")
    
    return user

@app.put("/ubuntu/users/{wallet_address}/verify")
async def verify_ubuntu_user(wallet_address: str, db: Session = Depends(get_db)):
    """Verify Ubuntu community member"""
    
    user = db.query(UbuntuUser).filter(
        UbuntuUser.wallet_address == wallet_address
    ).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="Ubuntu member not found")
    
    user.verification_status = "verified"
    user.flb_balance += 500.0  # Verification bonus
    user.ubuntu_score += 25.0  # Ubuntu score boost
    user.updated_at = datetime.utcnow()
    
    db.commit()
    
    return {
        "status": "verified",
        "bonus_flb": 500.0,
        "ubuntu_score_boost": 25.0,
        "ubuntu_blessing": "Your flame burns bright in our Ubuntu community",
        "message": "Welcome to the verified Ubuntu healthcare network",
        "philosophy": "I am because we are"
    }

# Healthcare Actions
@app.post("/ubuntu/healthcare-actions", response_model=HealthcareActionResponse)
async def create_healthcare_action(
    action: HealthcareActionCreate, 
    wallet_address: str,
    db: Session = Depends(get_db)
):
    """Record Ubuntu healthcare action"""
    
    # Find user
    user = db.query(UbuntuUser).filter(
        UbuntuUser.wallet_address == wallet_address,
        UbuntuUser.is_active == True
    ).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="Ubuntu member not found")
    
    # Calculate FLB earned based on impact score and role
    role_multiplier = {"healer": 1.5, "guardian": 1.2, "community": 1.0}
    flb_earned = action.impact_score * 15 * role_multiplier.get(user.role, 1.0)
    
    # Create healthcare action
    db_action = HealthcareAction(
        user_id=user.id,
        **action.dict(),
        flb_earned=flb_earned,
        ubuntu_blessing=f"Ubuntu recognizes your {action.action_type} impact. I am because we are."
    )
    
    db.add(db_action)
    
    # Update user balance and Ubuntu score
    user.flb_balance += flb_earned
    user.ubuntu_score += action.impact_score * 2
    user.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(db_action)
    
    logger.info(f"Healthcare action recorded: {action.title} by {user.name}")
    return db_action

@app.get("/ubuntu/healthcare-actions", response_model=List[HealthcareActionResponse])
async def get_healthcare_actions(
    skip: int = 0,
    limit: int = 100,
    action_type: Optional[str] = None,
    verification_status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Get Ubuntu healthcare actions"""
    
    query = db.query(HealthcareAction)
    
    if action_type:
        query = query.filter(HealthcareAction.action_type == action_type)
    
    if verification_status:
        query = query.filter(HealthcareAction.verification_status == verification_status)
    
    actions = query.order_by(desc(HealthcareAction.created_at)).offset(skip).limit(limit).all()
    return actions

@app.put("/ubuntu/healthcare-actions/{action_id}/verify")
async def verify_healthcare_action(
    action_id: int, 
    verifier_wallet: str,
    db: Session = Depends(get_db)
):
    """Verify Ubuntu healthcare action"""
    
    # Find action
    action = db.query(HealthcareAction).filter(HealthcareAction.id == action_id).first()
    if not action:
        raise HTTPException(status_code=404, detail="Healthcare action not found")
    
    # Find verifier
    verifier = db.query(UbuntuUser).filter(
        UbuntuUser.wallet_address == verifier_wallet,
        UbuntuUser.verification_status == "verified"
    ).first()
    
    if not verifier:
        raise HTTPException(status_code=403, detail="Only verified Ubuntu members can verify actions")
    
    # Verify action
    action.verification_status = "verified"
    action.verified_by = verifier.id
    action.verified_at = datetime.utcnow()
    action.flb_earned *= 1.3  # Verification bonus
    
    # Update user balance
    user = db.query(UbuntuUser).filter(UbuntuUser.id == action.user_id).first()
    if user:
        bonus = action.flb_earned * 0.3
        user.flb_balance += bonus
        user.ubuntu_score += 5.0
        user.updated_at = datetime.utcnow()
    
    db.commit()
    
    return {
        "status": "verified",
        "verification_bonus": action.flb_earned * 0.3,
        "ubuntu_recognition": "Your healthcare impact is verified by our Ubuntu community",
        "verifier": verifier.name,
        "philosophy": "I am because we are - Ubuntu validation strengthens us all"
    }

# Validator Management
@app.post("/ubuntu/validators", response_model=ValidatorResponse)
async def create_ubuntu_validator(validator: ValidatorCreate, db: Session = Depends(get_db)):
    """Register Ubuntu validator"""
    
    # Find user
    user = db.query(UbuntuUser).filter(
        UbuntuUser.wallet_address == validator.wallet_address,
        UbuntuUser.verification_status == "verified"
    ).first()
    
    if not user:
        raise HTTPException(
            status_code=404, 
            detail="Only verified Ubuntu members can become validators"
        )
    
    # Check if already validator
    existing_validator = db.query(UbuntuValidator).filter(
        UbuntuValidator.user_id == user.id
    ).first()
    
    if existing_validator:
        raise HTTPException(status_code=400, detail="User is already an Ubuntu validator")
    
    # Create validator
    db_validator = UbuntuValidator(
        user_id=user.id,
        validator_key=validator.validator_key,
        stake_amount=validator.stake_amount,
        ubuntu_consensus_score=50.0  # Starting consensus score
    )
    
    db.add(db_validator)
    
    # Update user status
    user.is_validator = True
    user.flb_balance += 1000.0  # Validator bonus
    user.ubuntu_score += 30.0
    user.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(db_validator)
    
    logger.info(f"New Ubuntu validator: {user.name}")
    return db_validator

@app.get("/ubuntu/validators", response_model=List[ValidatorResponse])
async def get_ubuntu_validators(db: Session = Depends(get_db)):
    """Get Ubuntu validators"""
    
    validators = db.query(UbuntuValidator).filter(
        UbuntuValidator.status == "active"
    ).all()
    
    return validators

@app.post("/ubuntu/validators/{wallet_address}/heartbeat")
async def ubuntu_validator_heartbeat(wallet_address: str, db: Session = Depends(get_db)):
    """Ubuntu validator heartbeat"""
    
    # Find validator
    user = db.query(UbuntuUser).filter(
        UbuntuUser.wallet_address == wallet_address,
        UbuntuUser.is_validator == True
    ).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="Ubuntu validator not found")
    
    validator = db.query(UbuntuValidator).filter(
        UbuntuValidator.user_id == user.id
    ).first()
    
    if not validator:
        raise HTTPException(status_code=404, detail="Validator profile not found")
    
    # Record heartbeat
    heartbeat = ValidatorHeartbeat(
        validator_id=validator.id,
        block_height=random.randint(15000, 20000),
        network_health=random.uniform(95.0, 99.9),
        ubuntu_message="I am because we are - Ubuntu consensus active"
    )
    
    db.add(heartbeat)
    
    # Update validator
    validator.last_heartbeat = datetime.utcnow()
    validator.total_blocks_validated += 1
    validator.uptime_percentage = min(100.0, validator.uptime_percentage + 0.1)
    validator.ubuntu_consensus_score = min(100.0, validator.ubuntu_consensus_score + 0.5)
    
    db.commit()
    
    return {
        "status": "heartbeat_received",
        "uptime": validator.uptime_percentage,
        "consensus_score": validator.ubuntu_consensus_score,
        "ubuntu_pulse": "Your validator flame pulses strong in our Ubuntu network",
        "last_heartbeat": validator.last_heartbeat.isoformat(),
        "philosophy": "I am because we are"
    }

# Ubuntu Statistics
@app.get("/ubuntu/stats")
async def get_ubuntu_stats(db: Session = Depends(get_db)):
    """Get comprehensive Ubuntu network statistics"""
    
    # User statistics
    total_users = db.query(UbuntuUser).filter(UbuntuUser.is_active == True).count()
    healers = db.query(UbuntuUser).filter(
        UbuntuUser.role == "healer", 
        UbuntuUser.is_active == True
    ).count()
    guardians = db.query(UbuntuUser).filter(
        UbuntuUser.role == "guardian", 
        UbuntuUser.is_active == True
    ).count()
    community_members = db.query(UbuntuUser).filter(
        UbuntuUser.role == "community", 
        UbuntuUser.is_active == True
    ).count()
    
    # Validator statistics
    total_validators = db.query(UbuntuValidator).filter(
        UbuntuValidator.status == "active"
    ).count()
    
    # Healthcare statistics
    total_healthcare_actions = db.query(HealthcareAction).count()
    verified_actions = db.query(HealthcareAction).filter(
        HealthcareAction.verification_status == "verified"
    ).count()
    
    birth_verifications = db.query(HealthcareAction).filter(
        HealthcareAction.action_type == "birth_verification"
    ).count()
    
    # Token statistics
    total_flb_balances = db.query(UbuntuUser).with_entities(UbuntuUser.flb_balance).all()
    total_supply = sum([balance[0] for balance in total_flb_balances])
    
    # Ubuntu score calculation
    avg_ubuntu_score = db.query(func.avg(UbuntuUser.ubuntu_score)).scalar() or 0
    
    ubuntu_network_score = min(100, (
        (verified_actions * 20) +
        (birth_verifications * 25) +
        (total_validators * 15) +
        (healers * 10) +
        (guardians * 8) +
        (community_members * 5)
    ) / 10)
    
    # Network health
    network_health = "excellent" if ubuntu_network_score > 80 and total_validators >= 5 else \
                    "good" if ubuntu_network_score > 60 and total_validators >= 3 else \
                    "fair" if ubuntu_network_score > 40 and total_validators >= 1 else \
                    "initializing"
    
    return {
        "network_name": "FlameBorn-Ubuntu-Testnet",
        "database": "neon-postgres",
        "ubuntu_philosophy": "I am because we are",
        
        # Community composition
        "community": {
            "total_users": total_users,
            "healers": healers,
            "guardians": guardians,
            "community_members": community_members,
            "verified_users": db.query(UbuntuUser).filter(
                UbuntuUser.verification_status == "verified"
            ).count()
        },
        
        # Validator network
        "validators": {
            "total_validators": total_validators,
            "active_validators": total_validators,
            "avg_uptime": db.query(func.avg(UbuntuValidator.uptime_percentage)).scalar() or 0,
            "avg_consensus_score": db.query(func.avg(UbuntuValidator.ubuntu_consensus_score)).scalar() or 0
        },
        
        # Healthcare impact
        "healthcare": {
            "total_actions": total_healthcare_actions,
            "verified_actions": verified_actions,
            "birth_verifications": birth_verifications,
            "verification_rate": (verified_actions / total_healthcare_actions * 100) if total_healthcare_actions > 0 else 0
        },
        
        # Token economics
        "tokens": {
            "total_flb_supply": round(total_supply, 2),
            "circulating_supply": round(total_supply * 0.85, 2),
            "avg_balance": round(total_supply / total_users, 2) if total_users > 0 else 0
        },
        
        # Ubuntu metrics
        "ubuntu_metrics": {
            "network_ubuntu_score": round(ubuntu_network_score, 2),
            "avg_individual_ubuntu_score": round(avg_ubuntu_score, 2),
            "community_bonds_strength": min(100, (healers + guardians) * 5),
            "collective_prosperity_index": round((total_supply / 1000) + ubuntu_network_score, 2)
        },
        
        # Network health
        "network_health": network_health,
        "consensus": "Ubuntu-PoS",
        "block_time": 5.0,
        "tps": random.randint(40, 55),
        "uptime": 99.8,
        
        # Ubuntu wisdom
        "ubuntu_message": "I am because we are - Ubuntu philosophy in action",
        "flame_status": "🔥 roaring with Ubuntu spirit",
        "last_updated": datetime.utcnow().isoformat()
    }

# Oracle Services
@app.get("/oracle/ubuntu-price")
async def get_ubuntu_flb_price():
    """Ubuntu FLAME token price oracle"""
    
    base_price = 0.00125
    variation = (random.random() - 0.5) * 0.0002
    current_price = base_price + variation
    change_24h = (random.random() - 0.5) * 20
    
    return {
        "symbol": "FLAME",
        "name": "FlameBorn Ubuntu Token",
        "price_usd": round(current_price, 8),
        "price_change_24h": round(change_24h, 2),
        "volume_24h": random.randint(15000, 75000),
        "market_cap": round(current_price * 850000000, 2),
        "ubuntu_backing": "Community healthcare impact",
        "last_updated": datetime.utcnow().isoformat(),
        "oracle_source": "FlameBorn-Ubuntu-Oracle",
        "ubuntu_blessing": "Ubuntu prosperity flows through our community"
    }

@app.get("/oracle/ubuntu-wisdom")
async def get_ubuntu_wisdom(db: Session = Depends(get_db)):
    """Get random Ubuntu proverb wisdom"""
    
    proverb = db.query(ProverbWisdom).filter(
        ProverbWisdom.is_active == True
    ).order_by(func.random()).first()
    
    if proverb:
        proverb.usage_count += 1
        db.commit()
        
        return {
            "proverb": proverb.proverb_text,
            "origin": f"{proverb.origin_tribe}, {proverb.origin_country}",
            "translation": proverb.english_translation,
            "ubuntu_meaning": proverb.ubuntu_meaning,
            "category": proverb.category,
            "wisdom_source": "African Ubuntu Tradition",
            "philosophy": "I am because we are"
        }
    
    return {
        "proverb": "Umuntu ngumuntu ngabantu",
        "origin": "Zulu, South Africa",
        "translation": "A person is a person through other persons",
        "ubuntu_meaning": "Our humanity is affirmed through recognizing the humanity of others",
        "category": "community",
        "philosophy": "I am because we are"
    }

# Health Check
@app.get("/health")
async def health_check(db: Session = Depends(get_db)):
    """Comprehensive health check"""
    
    try:
        # Test database connection
        db.execute("SELECT 1")
        db_status = "connected"
        
        # Test basic queries
        user_count = db.query(UbuntuUser).count()
        validator_count = db.query(UbuntuValidator).count()
        
        db_info = get_database_info()
        
        return {
            "status": "healthy",
            "database": db_status,
            "database_info": db_info,
            "ubuntu_protocol": "active",
            "flame_status": "🔥 roaring with Ubuntu spirit",
            "network": "FlameBorn-Ubuntu-Testnet",
            "version": "0.0.1-alpha-neon",
            "uptime": "99.8%",
            "community_size": user_count,
            "validator_network": validator_count,
            "ubuntu_message": "I am because we are - the flame burns bright",
            "neon_powered": True,
            "timestamp": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        raise HTTPException(
            status_code=503, 
            detail=f"Ubuntu network unhealthy: {str(e)}"
        )

# Development endpoints
@app.post("/dev/seed-ubuntu-data")
async def seed_more_ubuntu_data(db: Session = Depends(get_db)):
    """Seed additional Ubuntu test data"""
    
    # Create more users
    countries = ["Nigeria", "Kenya", "South Africa", "Ghana", "Uganda", "Tanzania"]
    roles = ["healer", "guardian", "community"]
    
    for i in range(20):
        user = UbuntuUser(
            wallet_address=f"0x{''.join([random.choice('0123456789abcdef') for _ in range(40)])}",
            role=random.choice(roles),
            name=f"Ubuntu Member {i+1}",
            location=f"City {i+1}",
            country=random.choice(countries),
            verification_status="verified" if random.random() > 0.3 else "pending",
            flb_balance=random.uniform(100, 5000),
            ubuntu_score=random.uniform(10, 100)
        )
        db.add(user)
    
    # Create more healthcare actions
    action_types = ["birth_verification", "health_education", "treatment", "emergency"]
    for i in range(50):
        action = HealthcareAction(
            user_id=random.randint(1, 23),  # Including original 3 users
            action_type=random.choice(action_types),
            title=f"Ubuntu Healthcare Action {i+1}",
            description=f"Community healthcare impact action #{i+1} - Ubuntu philosophy in practice",
            location=f"Location {i+1}",
            impact_score=random.uniform(1.0, 10.0),
            flb_earned=random.uniform(15, 150),
            verification_status="verified" if random.random() > 0.4 else "pending",
            ubuntu_blessing="Ubuntu recognizes your healthcare impact. I am because we are."
        )
        db.add(action)
    
    db.commit()
    
    return {
        "message": "Ubuntu test data seeded successfully",
        "users_added": 20,
        "healthcare_actions_added": 50,
        "ubuntu_blessing": "Our Ubuntu community grows stronger with each member",
        "philosophy": "I am because we are"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
