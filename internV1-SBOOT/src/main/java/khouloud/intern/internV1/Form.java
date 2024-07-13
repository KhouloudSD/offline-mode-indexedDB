package khouloud.intern.internV1;


import jakarta.persistence.*;
import lombok.*;

import javax.annotation.processing.Generated;
import java.io.Serializable;

@Data
@Entity
@Table(name ="T_Form" , uniqueConstraints = {@UniqueConstraint(columnNames = {"email"})})
@EqualsAndHashCode(callSuper = false)
@Getter
@Setter
public class Form implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private long id;
    private String email;
    private String username;

    public Form() {}

    public Form(long id, String email, String username) {
        this.id = id;
        this.email = email;
        this.username = username;
    }



}
