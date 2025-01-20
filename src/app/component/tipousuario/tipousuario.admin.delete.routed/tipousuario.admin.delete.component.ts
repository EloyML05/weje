import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ITipousuario } from '../../../model/tipousuario.interface';
import { TipousuarioService } from '../../../service/tipousuario.service';

declare let bootstrap: any;

@Component({
  selector: 'app-Tipousuario-admin-delete-routed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tipousuario.admin.delete.component.html',
  styleUrl: './tipousuario.admin.delete.component.css',
})
export class TipousuarioAdminDeleteRoutedComponent implements OnInit {
  oTipousuario: ITipousuario;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oTipousuarioService: TipousuarioService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) {
    this.oTipousuario = {} as ITipousuario;
  }

  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oTipousuarioService.get(id).subscribe({
      next: (oTipousuario: ITipousuario) => {
        this.oTipousuario = oTipousuario;
      },
      error: (err: any) => {
        this.showModal('Error al cargar el Tipousuario');
      },
    });
  }

  showModal(mensaje: string) {
    this.strMessage = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  delete(): void {
    this.oTipousuarioService.delete(this.oTipousuario!.id).subscribe({
      next: (data: any) => {
        this.showModal(
          'Tipousuario con id ' + this.oTipousuario!.id + ' ha sido borrado'
        );
      },
      error: (error: any) => {
        this.showModal('Error al borrar el Tipousuario');
      },
    });
  }

  cancel(): void {
    this.oRouter.navigate(['/admin/Tipousuario/plist']);
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/Tipousuario/plist']);
  };
}
