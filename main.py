from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


router = APIRouter()

# Dummy storage for demonstration, you can replace it with a database
patients_storage: Dict[int, dict] = {}

class PatientBase(BaseModel):
    first_name: str
    last_name: str
    pesel: str
    street: str
    city: str
    zip_code: str

class PatientCreate(PatientBase):
    pass

class PatientUpdate(PatientBase):
    pass

class Patient(PatientBase):
    id: int

@router.get("/", response_model=list[Patient])
async def get_patients():
    return list(patients_storage.values())

@router.get("/{patient_id}", response_model=Patient)
async def get_patient(patient_id: int):
    patient = patients_storage.get(patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

@router.post("/", response_model=Patient)
async def create_patient(patient: PatientCreate):
    patient_id = len(patients_storage) + 1
    patient_data = patient.dict()
    patient_data["id"] = patient_id
    patients_storage[patient_id] = patient_data
    return patient_data

@router.put("/{patient_id}", response_model=Patient)
async def update_patient(patient_id: int, patient: PatientUpdate):
    if patient_id not in patients_storage:
        raise HTTPException(status_code=404, detail="Patient not found")
    patients_storage[patient_id].update(patient.dict())
    return patients_storage[patient_id]

@router.delete("/{patient_id}")
async def delete_patient(patient_id: int):
    if patient_id not in patients_storage:
        raise HTTPException(status_code=404, detail="Patient not found")
    del patients_storage[patient_id]
    return {"message": "Patient deleted successfully"}

app.include_router(router, prefix="/patients")
