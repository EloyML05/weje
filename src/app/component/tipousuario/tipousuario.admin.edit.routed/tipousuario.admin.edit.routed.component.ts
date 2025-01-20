import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TipousuarioService } from '../../../service/tipousuario.service';
import { ITipousuario } from '../../../model/tipousuario.interface';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

declare let bootstrap: any;

@Component({
  selector: 'app-Tipousuario-admin-edit-routed',
  templateUrl: './tipousuario.admin.edit.routed.component.html',
  styleUrls: ['./tipousuario.admin.edit.routed.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class TipousuarioAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  oTipousuarioForm: FormGroup | undefined = undefined;
  oTipousuario: ITipousuario | null = null;
  message: string = '';
  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oTipousuarioService: TipousuarioService,
    private oRouter: Router
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oTipousuarioForm?.markAllAsTouched();
  }

  createForm() {
    this.oTipousuarioForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      creditoOdebito: new FormControl('', [
        Validators.required,
        Validators.pattern('^[01]$'),
      ]),
      comentarios: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      realOnominal: new FormControl('', [
        Validators.required,
        Validators.pattern('^[01]$'),
      ]),
    });
  }

  onReset() {
    this.oTipousuarioService.get(this.id).subscribe({
      next: (oTipousuario: ITipousuario) => {
        this.oTipousuario = oTipousuario;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    this.oTipousuarioForm?.controls['id'].setValue(this.oTipousuario?.id);
    this.oTipousuarioForm?.controls['descripcion'].setValue(
      this.oTipousuario?.descripcion
    );
   
  }

  get() {
    this.oTipousuarioService.get(this.id).subscribe({
      next: (oTipousuario: ITipousuario) => {
        this.oTipousuario = oTipousuario;
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
    this.oRouter.navigate(['/admin/Tipousuario/view/' + this.oTipousuario?.id]);
  };

  onSubmit() {
    if (!this.oTipousuarioForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oTipousuarioService.update(this.oTipousuarioForm?.value).subscribe({
        next: (oTipousuario: ITipousuario) => {
          this.oTipousuario = oTipousuario;
          this.updateForm();
          this.showModal(
            'Tipousuario ' + this.oTipousuario.id + ' actualizado'
          );
        },
        error: (error) => {
          this.showModal('Error al actualizar el Tipousuario');
          console.error(error);
        },
      });
    }
  }
}
