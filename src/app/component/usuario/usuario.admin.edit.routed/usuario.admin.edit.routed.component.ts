import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../service/usuario.service';
import { IUsuario } from '../../../model/usuario.interface';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TipousuarioService } from '../../../service/tipousuario.service';
import { ITipousuario } from '../../../model/tipousuario.interface';


declare let bootstrap: any;

@Component({
  selector: 'app-usuario-admin-edit-routed',
  templateUrl: './usuario.admin.edit.routed.component.html',
  styleUrls: ['./usuario.admin.edit.routed.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    MatSelectModule
  ],
})
export class UsuarioAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  oUsuarioForm: FormGroup | undefined = undefined;
  oUsuario: IUsuario | null = null;
  message: string = '';
listaTipousuario: ITipousuario[] = [];
  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oUsuarioService: UsuarioService,
    private oRouter: Router,
    private oTipousuarioService: TipousuarioService
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oUsuarioForm?.markAllAsTouched();
    this.getDorp();
  }
  getDorp() {
    this.oTipousuarioService.getAll().subscribe({
      next: (data) => {
        this.listaTipousuario = data;
        console.log(this.listaTipousuario);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  createForm() {
    this.oUsuarioForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
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
      password: new FormControl('' , [
        Validators.required,
        Validators.minLength(3),
      ]),
      tipousuario: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }

  onReset() {
    this.oUsuarioService.get(this.id).subscribe({
      next: (oUsuario: IUsuario) => {
        this.oUsuario = oUsuario;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    this.oUsuarioForm?.controls['id'].setValue(this.oUsuario?.id);
    this.oUsuarioForm?.controls['nombre'].setValue(this.oUsuario?.nombre);
    this.oUsuarioForm?.controls['apellido1'].setValue(this.oUsuario?.apellido1);
    this.oUsuarioForm?.controls['apellido2'].setValue(this.oUsuario?.apellido2);
    this.oUsuarioForm?.controls['email'].setValue(this.oUsuario?.email);
    this.oUsuarioForm?.controls['password'].setValue(this.oUsuario?.password);
    this.oUsuarioForm?.controls['tipousuario'].setValue(
      this.oUsuario?.tipousuario.id
    );
  }

  get() {
    this.oUsuarioService.get(this.id).subscribe({
      next: (oUsuario: IUsuario) => {
        this.oUsuario = oUsuario;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  showModal(mensaje: string) {
    this.message = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/usuario/view/' + this.oUsuario?.id]);
  };

  onSubmit() {
    if (!this.oUsuarioForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oTipousuarioService.getOne(this.oUsuarioForm?.value.tipousuario).subscribe((data: ITipousuario) => {
        data.usuarios = [];
        console.log(data);
        this.oUsuarioForm?.controls['tipousuario'].setValue(data);
        this.oUsuarioService.update(this.oUsuarioForm?.value).subscribe({
          next: (oUsuario: IUsuario) => {
            this.oUsuario = oUsuario;
            this.updateForm();
            this.showModal('Usuario ' + this.oUsuario.id + ' actualizado');
          },
          error: (error) => {
            this.showModal('Error al actualizar el usuario');
            console.error(error);
          },
        });
      })
      
     
    }
  }
}
