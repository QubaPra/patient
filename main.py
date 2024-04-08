from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import databases
import sqlalchemy

database = databases.Database("sqlite:///./clinic.db")
metadata = sqlalchemy.MetaData()

patients = sqlalchemy.Table(
    "patients",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("first_name", sqlalchemy.String),
    sqlalchemy.Column("last_name", sqlalchemy.String),
    sqlalchemy.Column("pesel", sqlalchemy.String),
    sqlalchemy.Column("street", sqlalchemy.String),
    sqlalchemy.Column("city", sqlalchemy.String),
    sqlalchemy.Column("zip_code", sqlalchemy.String),
)

engine = sqlalchemy.create_engine("sqlite:///./clinic.db")
metadata.create_all(engine)

app = FastAPI()

class PatientIn(BaseModel):
    first_name: str
    last_name: str
    pesel: str
    street: str
    city: str
    zip_code: str

@app.post("/patients/")
async def create_patient(patient: PatientIn):
    query = patients.insert().values(**patient.dict())
    last_record_id = await database.execute(query)
    return {"id": last_record_id, **patient.dict()}

@app.get("/patients/")
async def get_patients():
    query = patients.select()
    return await database.fetch_all(query)

@app.get("/patients/{patient_id}")
async def get_patient(patient_id: int):
    query = patients.select().where(patients.c.id == patient_id)
    patient = await database.fetch_one(query)
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

@app.put("/patients/{patient_id}")
async def update_patient(patient_id: int, patient: PatientIn):
    query = (
        patients.update()
        .where(patients.c.id == patient_id)
        .values(**patient.dict())
    )
    await database.execute(query)
    return {"id": patient_id, **patient.dict()}

@app.delete("/patients/{patient_id}")
async def delete_patient(patient_id: int):
    query = patients.delete().where(patients.c.id == patient_id)
    await database.execute(query)
    return {"message": "Patient deleted successfully"}

