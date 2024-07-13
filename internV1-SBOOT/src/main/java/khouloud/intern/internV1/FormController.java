package khouloud.intern.internV1;


import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Form")
public class FormController {
    @Autowired

    private final FormService formService;
    public  FormController(FormService formService) {
        this.formService = formService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Form>> getAllForms(){
        List <Form> forms = formService.findAllForms();
        return new ResponseEntity<>(forms, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Form> addForm(@RequestBody Form form){
        Form newForm= formService.addForm(form);
        return new ResponseEntity<>(newForm, HttpStatus.CREATED);
    }
}
