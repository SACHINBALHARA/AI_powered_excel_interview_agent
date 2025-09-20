from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the AI powered Excel Interviewer API"}

def test_generate_questions_post():
    response = client.post("/generate-questions/", json={"domain": "Excel", "experience_years": 3})
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) > 0

def test_create_and_read_candidate():
    candidate = {
        "email": "test@example.com",
        "name": "Test User",
        "phone": "1234567890",
        "experience_years": 3,
        "domain": "Excel"
    }
    create_response = client.post("/candidates/", json=candidate)
    print(create_response.status_code)
    print(create_response.json())  # This will show validation or error details
    assert create_response.status_code == 200

    candidate_id = created_data["id"]
    read_resp = client.get(f"/candidates/{candidate_id}")
    assert read_resp.status_code == 200
    assert read_resp.json()["email"] == candidate["email"]
