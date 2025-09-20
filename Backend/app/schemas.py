from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional
from uuid import UUID

class CandidateBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str]
    experience_years: str
    domain: str

class CandidateCreate(CandidateBase):
    pass
    

class CandidateResponse(CandidateBase):
    id: UUID
    tnc_accepted: bool
    
    # Updated for Pydantic v2: replace Config class with model_config
    model_config = ConfigDict(from_attributes=True)

from pydantic import BaseModel

class QuestionResponse(BaseModel):
    id: int
    category: str
    question: str

    class Config:
        from_attributes = True

class QuestionRequest(BaseModel):
    domain: str
    experience_years: int
    