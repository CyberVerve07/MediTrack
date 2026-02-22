package com.meditrack.model;

import java.time.LocalDate;
import java.util.List;

public class Patient {

    private String id;
    private String name;
    private String avatarId;
    private String dateOfBirth;
    private String gender;
    private String contact;
    private String address;
    private List<String> medicalHistory;
    private String admissionDate;
    private String dischargeDate;
    private String status; // Admitted, Discharged, ICU
    private String roomNumber;
    private String ward;

    public Patient() {
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAvatarId() { return avatarId; }
    public void setAvatarId(String avatarId) { this.avatarId = avatarId; }
    public String getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(String dateOfBirth) { this.dateOfBirth = dateOfBirth; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public List<String> getMedicalHistory() { return medicalHistory; }
    public void setMedicalHistory(List<String> medicalHistory) { this.medicalHistory = medicalHistory; }
    public String getAdmissionDate() { return admissionDate; }
    public void setAdmissionDate(String admissionDate) { this.admissionDate = admissionDate; }
    public String getDischargeDate() { return dischargeDate; }
    public void setDischargeDate(String dischargeDate) { this.dischargeDate = dischargeDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }
    public String getWard() { return ward; }
    public void setWard(String ward) { this.ward = ward; }
}
