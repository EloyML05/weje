import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormGroup,  
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUsuario } from '../../../model/usuario.interface';
import { UsuarioService } from '../../../service/usuario.service';
import { TipousuarioService } from '../../../service/tipousuario.service';
import { ITipousuario } from '../../../model/tipousuario.interface';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-usuario.admin.create.routed',
  templateUrl: './usuario.admin.create.routed.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  styleUrls: ['./usuario.admin.create.routed.component.css'],
})
export class UsuarioAdminCreateRoutedComponent implements OnInit {

  id: number = 0;
  oUsuarioForm: FormGroup | undefined = undefined;
  oUsuario: IUsuario | null = null;
  strMessage: string = '';

  listaTipousuario: ITipousuario[] = [];
  myModal: any;

  form: FormGroup = new FormGroup({});

  constructor(
    private oUsuarioService: UsuarioService,
    private oRouter: Router,
    private oTipousuarioService: TipousuarioService
  ) {}

  ngOnInit() {
    this.createForm();
    this.oUsuarioForm?.markAllAsTouched();
    this.getDorp();
  }

  createForm() {
    this.oUsuarioForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      apellido1: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      apellido2: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      tipousuario: new FormControl('', [Validators.required, Validators.min(1)]),
    });
  }

  updateForm() {
    this.oUsuarioForm?.controls['nombre'].setValue('');
    this.oUsuarioForm?.controls['apellido1'].setValue('');
    this.oUsuarioForm?.controls['apellido2'].setValue('');
    this.oUsuarioForm?.controls['email'].setValue('');
    this.oUsuarioForm?.controls['tipousuario'].setValue('');
  }

  showModal(mensaje: string) {
    this.strMessage = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }
  getDorp(){
this.oTipousuarioService.getAll().subscribe({
  next: (data) => {
    this.listaTipousuario = data;
  console.log(this.listaTipousuario);
  },
  error: (err) => {
    console.log(err);
  },
})
  }

  onReset() {
    this.updateForm();
    return false;
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/usuario/view/' + this.oUsuario?.id]);
  }

  onSubmit() {
    if (this.oUsuarioForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {      
      this.oTipousuarioService.getOne(this.oUsuarioForm?.value.tipousuario).subscribe({
        next: (data: ITipousuario) => {
data.usuarios=
          this.oUsuarioForm?.controls['tipousuario'].setValue(data);
          console.log(data);
          console.log(this.oUsuarioForm?.value);
          this.oUsuarioService.create(this.oUsuarioForm?.value).subscribe({
            next: (oUsuario: IUsuario) => {
              this.oUsuario = oUsuario;
              console.log(this.oUsuario);
              this.showModal(
                'Usuario creado con el id: ' + this.oUsuario.id
              );
            },
            error: (err) => {
              this.showModal('Error al crear el usuario');
              console.log(err);
            },
          });
        },
        error: (err) => {
          this.showModal('Error al crear el usuario');
          console.log(err);
        },
      })
      
      this.oUsuarioService.create(this.oUsuarioForm?.value).subscribe({
        next: (oUsuario: IUsuario) => {
          this.oUsuario = oUsuario;
          this.showModal('Usuario creado con el id: ' + this.oUsuario.id);
        },
        error: (err) => {
          this.showModal('Error al crear el usuario');
          console.log(err);
        },
      });
    }
  }



}
