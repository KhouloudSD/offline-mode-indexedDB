package khouloud.intern.internV1;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

@Service
@Transactional

public class FormService {

    private final FormRepository formRepository;

    @Autowired
    public FormService(FormRepository formRepository){
        this.formRepository= formRepository;
    }

    public Form addForm (Form form){
        return formRepository.save(form);
    }

    public  Form findFormById(long id){
        return formRepository.findFormById((int)id)
                .orElseThrow(() -> new FormNotFoundException("form by id " + id + " was not found"));
    }

    public List<Form> findAllForms() {
        return formRepository.findAll();
    }
    public void  deleteForm (long id){
        formRepository.deleteFormById(id);
    }

}
