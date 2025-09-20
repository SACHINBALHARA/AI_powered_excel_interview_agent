from sqlalchemy.orm import Session
from .models import Candidate, InterviewQuestion
  # Explicit imports for clarity
from .schemas import CandidateCreate
from . import schemas
from . import models
from sqlalchemy.orm import Session

def get_candidate_by_email(db: Session, email: str):
    return db.query(Candidate).filter(Candidate.email == email).first()

def create_candidate(db: Session, candidate_create: schemas.CandidateCreate):
    candidate = models.Candidate(
        name=candidate_create.name,
        email=candidate_create.email,
        phone=candidate_create.phone,
        domain=candidate_create.domain,
        experience=candidate_create.experience,
    )
    db.add(candidate)
    db.commit()
    db.refresh(candidate)
    return candidate


def create_question(db: Session, category: str, question_text: str):
    db_question = InterviewQuestion(category=category, question_text=question_text)
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question
