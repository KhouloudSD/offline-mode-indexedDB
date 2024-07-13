package khouloud.intern.internV1;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FormRepository extends JpaRepository<Form, Long> {
    void deleteFormById(long id);


    Optional<Form> findFormById(int id);
}
