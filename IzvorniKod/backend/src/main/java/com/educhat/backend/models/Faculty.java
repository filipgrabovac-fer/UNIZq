package com.educhat.backend.models;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name = "faculty")
public class Faculty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "appAdminId", referencedColumnName = "id")
    private AppAdmin appAdmin;

    private String title;

}
