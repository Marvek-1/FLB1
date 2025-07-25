"""
FlameBorn Neon Database Models
Ubuntu Healthcare Tokenization Platform
"""

from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey, Index
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from neon_config import Base
from datetime import datetime
import uuid

class UbuntuUser(Base):
    """Ubuntu Community Member Model"""
    __tablename__ = "ubuntu_users"
    
    id = Column(Integer, primary_key=True, index=True)
    uuid = Column(String, unique=True, default=lambda: str(uuid.uuid4()), index=True)
    wallet_address = Column(String, unique=True, index=True, nullable=False)
    role = Column(String, nullable=False)  # healer, guardian, community
    name = Column(String, nullable=False)
    location = Column(String)
    country = Column(String)
    verification_status = Column(String, default="pending")  # pending, verified, rejected
    flb_balance = Column(Float, default=0.0)
    ubuntu_score = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow, server_default=func.now())
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=func.now())
    is_validator = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    healthcare_actions = relationship("HealthcareAction", back_populates="user")
    validator_profile = relationship("UbuntuValidator", back_populates="user", uselist=False)
    transactions_sent = relationship("UbuntuTransaction", foreign_keys="UbuntuTransaction.from_user_id", back_populates="sender")
    transactions_received = relationship("UbuntuTransaction", foreign_keys="UbuntuTransaction.to_user_id", back_populates="receiver")
    
    # Indexes for performance
    __table_args__ = (
        Index('idx_user_role_location', 'role', 'location'),
        Index('idx_user_verification', 'verification_status', 'is_active'),
    )

class UbuntuValidator(Base):
    """Ubuntu Network Validator Model"""
    __tablename__ = "ubuntu_validators"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("ubuntu_users.id"), unique=True)
    validator_key = Column(String, unique=True, nullable=False)
    stake_amount = Column(Float, nullable=False)
    status = Column(String, default="active")  # active, inactive, slashed
    uptime_percentage = Column(Float, default=0.0)
    total_blocks_validated = Column(Integer, default=0)
    last_heartbeat = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow, server_default=func.now())
    ubuntu_consensus_score = Column(Float, default=0.0)
    
    # Relationship
    user = relationship("UbuntuUser", back_populates="validator_profile")
    heartbeats = relationship("ValidatorHeartbeat", back_populates="validator")
    
    # Indexes
    __table_args__ = (
        Index('idx_validator_status', 'status', 'last_heartbeat'),
    )

class ValidatorHeartbeat(Base):
    """Validator Heartbeat Tracking"""
    __tablename__ = "validator_heartbeats"
    
    id = Column(Integer, primary_key=True, index=True)
    validator_id = Column(Integer, ForeignKey("ubuntu_validators.id"))
    timestamp = Column(DateTime, default=datetime.utcnow, server_default=func.now())
    block_height = Column(Integer)
    network_health = Column(Float)
    ubuntu_message = Column(String, default="I am because we are")
    
    # Relationship
    validator = relationship("UbuntuValidator", back_populates="heartbeats")

class HealthcareAction(Base):
    """Ubuntu Healthcare Impact Actions"""
    __tablename__ = "healthcare_actions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("ubuntu_users.id"))
    action_type = Column(String, nullable=False)  # birth_verification, health_education, treatment, emergency
    title = Column(String, nullable=False)
    description = Column(Text)
    location = Column(String)
    impact_score = Column(Float, nullable=False)
    flb_earned = Column(Float, default=0.0)
    verification_status = Column(String, default="pending")  # pending, verified, rejected
    verified_by = Column(Integer, ForeignKey("ubuntu_users.id"))
    verified_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow, server_default=func.now())
    ubuntu_blessing = Column(Text)
    
    # Relationships
    user = relationship("UbuntuUser", back_populates="healthcare_actions", foreign_keys=[user_id])
    verifier = relationship("UbuntuUser", foreign_keys=[verified_by])
    
    # Indexes
    __table_args__ = (
        Index('idx_action_type_status', 'action_type', 'verification_status'),
        Index('idx_action_created', 'created_at'),
    )

class UbuntuTransaction(Base):
    """Ubuntu Network Transactions"""
    __tablename__ = "ubuntu_transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    tx_hash = Column(String, unique=True, index=True, nullable=False)
    from_user_id = Column(Integer, ForeignKey("ubuntu_users.id"))
    to_user_id = Column(Integer, ForeignKey("ubuntu_users.id"))
    amount = Column(Float, nullable=False)
    tx_type = Column(String, nullable=False)  # mint, transfer, burn, stake, reward
    status = Column(String, default="pending")  # pending, confirmed, failed
    block_height = Column(Integer)
    gas_used = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow, server_default=func.now())
    confirmed_at = Column(DateTime)
    ubuntu_purpose = Column(String)  # Purpose of transaction in Ubuntu context
    
    # Relationships
    sender = relationship("UbuntuUser", foreign_keys=[from_user_id], back_populates="transactions_sent")
    receiver = relationship("UbuntuUser", foreign_keys=[to_user_id], back_populates="transactions_received")
    
    # Indexes
    __table_args__ = (
        Index('idx_tx_status_type', 'status', 'tx_type'),
        Index('idx_tx_created', 'created_at'),
    )

class UbuntuCommunityMetrics(Base):
    """Ubuntu Community Health Metrics"""
    __tablename__ = "ubuntu_community_metrics"
    
    id = Column(Integer, primary_key=True, index=True)
    metric_date = Column(DateTime, default=datetime.utcnow, server_default=func.now())
    total_users = Column(Integer, default=0)
    total_healers = Column(Integer, default=0)
    total_guardians = Column(Integer, default=0)
    total_community_members = Column(Integer, default=0)
    total_validators = Column(Integer, default=0)
    total_healthcare_actions = Column(Integer, default=0)
    verified_healthcare_actions = Column(Integer, default=0)
    total_flb_supply = Column(Float, default=0.0)
    ubuntu_score = Column(Float, default=0.0)
    network_health = Column(String, default="initializing")
    birth_verifications_today = Column(Integer, default=0)
    community_bonds_strength = Column(Float, default=0.0)
    
    # Indexes
    __table_args__ = (
        Index('idx_metrics_date', 'metric_date'),
    )

class ProverbWisdom(Base):
    """African Proverbs and Ubuntu Wisdom"""
    __tablename__ = "proverb_wisdom"
    
    id = Column(Integer, primary_key=True, index=True)
    proverb_text = Column(Text, nullable=False)
    origin_country = Column(String)
    origin_tribe = Column(String)
    english_translation = Column(Text)
    ubuntu_meaning = Column(Text)
    category = Column(String)  # healthcare, community, wisdom, birth, healing
    usage_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow, server_default=func.now())
    is_active = Column(Boolean, default=True)

class MostarAIInteraction(Base):
    """Mostar AI Conversation History"""
    __tablename__ = "mostar_ai_interactions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("ubuntu_users.id"))
    session_id = Column(String, index=True)
    user_message = Column(Text, nullable=False)
    ai_response = Column(Text, nullable=False)
    response_type = Column(String)  # groq_api, ubuntu_fallback, proverb_wisdom
    ubuntu_context = Column(String)  # healthcare, community, validation, education
    created_at = Column(DateTime, default=datetime.utcnow, server_default=func.now())
    
    # Relationship
    user = relationship("UbuntuUser")
    
    # Indexes
    __table_args__ = (
        Index('idx_ai_session', 'session_id', 'created_at'),
    )

class NetworkOracle(Base):
    """Network Oracle Data"""
    __tablename__ = "network_oracle"
    
    id = Column(Integer, primary_key=True, index=True)
    oracle_type = Column(String, nullable=False)  # price, network, ubuntu_metrics
    data_key = Column(String, nullable=False)
    data_value = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, server_default=func.now())
    source = Column(String)
    confidence_score = Column(Float, default=1.0)
    
    # Indexes
    __table_args__ = (
        Index('idx_oracle_type_key', 'oracle_type', 'data_key'),
        Index('idx_oracle_timestamp', 'timestamp'),
    )

# Create all tables
def create_tables():
    """Create all tables in Neon database"""
    Base.metadata.create_all(bind=engine)
    print("🔥 Ubuntu database tables created successfully!")
    print("Ubuntu Philosophy: I am because we are")

if __name__ == "__main__":
    from neon_config import engine
    create_tables()
