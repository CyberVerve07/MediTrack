package com.meditrack.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {
    @Id
    private String id;
    
    private String name;
    private String avatarId;
    private String dateOfBirth;
    private String gender;
    private String contact;
    private String address;

    @ElementCollection
    private List<String> medicalHistory;
    
    private String admissionDate;
    private String dischargeDate;
    private String status; // Admitted, Discharged, ICU
    private String roomNumber;
    private String ward;
}
