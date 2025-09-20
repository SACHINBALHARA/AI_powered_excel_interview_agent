from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from . import models, schemas, crud, database
from .schemas import QuestionRequest

from .ai_agent import generate_weighted_excel_questions

# Create tables (run once on startup)
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# Dependency injection of DB session (recommended pattern)
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "Welcome to the AI powered Excel Interviewer API"}

@app.post("/candidates/", response_model=schemas.CandidateResponse)
def create_candidate(candidate: schemas.CandidateCreate, db: Session = Depends(get_db)):
    db_candidate = crud.get_candidate_by_email(db, email=candidate.email)
    if db_candidate:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_candidate(db=db, candidate=candidate)

@app.get("/candidates/{candidate_id}", response_model=schemas.CandidateResponse)
def read_candidate(candidate_id: str, db: Session = Depends(get_db)):
    candidate = db.query(models.Candidate).filter(models.Candidate.id == candidate_id).first()
    if candidate is None:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return candidate

@app.get("/generate-questions/", response_model=List[schemas.QuestionResponse])
def generate_questions(domain: str = Query(...), experience_years: int = Query(..., ge=0), db: Session = Depends(get_db)):
    # Important: Wrap generate_weighted_excel_questions call with retry/backoff in ai_agent.py for API reliability
    questions = generate_weighted_excel_questions(db=db, num_questions=12)
    return questions

@app.post("/generate-questions/", response_model=List[schemas.QuestionResponse])
def generate_questions_post(request: QuestionRequest, db: Session = Depends(get_db)):
    # Use request.domain and request.experience_years as needed
    # For now, ignoring them and generating default number of questions
    questions = generate_weighted_excel_questions(db=db, num_questions=12)
    return questions

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
