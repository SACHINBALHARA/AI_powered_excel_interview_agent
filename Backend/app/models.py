from sqlalchemy import Column, String, Integer, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base

import uuid
from datetime import datetime
from sqlalchemy.sql import func

Base = declarative_base()

class Candidate(Base):
    __tablename__ = "candidates"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String, nullable=True)
    experience_years = Column(String, nullable=False)
    domain = Column(String, nullable=False)
    tnc_accepted = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class InterviewQuestion(Base):
    __tablename__ = "interview_questions"
    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, index=True, nullable=False)
    question_text = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
