from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import urllib.parse
import os

#DATABASE_URL = "postgresql+psycopg2://postgres:Sachin@12345@lochost:5432/excel_interview_db"
DATABASE_URL = "postgresql+psycopg2://postgres:Sachin%4012345@localhost:5432/excel_interview_db"

engine = create_engine(DATABASE_URL,echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


# ✅ Test connection
try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT version();"))
        print("✅ Connected to:", result.fetchone())
except Exception as e:
    print("❌ Connection failed:", e)