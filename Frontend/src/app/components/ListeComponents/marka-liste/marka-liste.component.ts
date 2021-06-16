import { Marka } from './../../../models/Marka';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { MarkaDialogComponent } from '../../dialogs/marka-dialog/marka-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-marka-liste',
  templateUrl: './marka-liste.component.html',
  styleUrls: ['./marka-liste.component.scss']
})
export class MarkaListeComponent implements OnInit {
  dialogRef: MatDialogRef<MarkaDialogComponent>;
  confirmdialogRef: MatDialogRef<ConfirmDialogComponent>;
  marka: Marka[];
  markaId: number;
  secMarka: Marka;
  dataSource: any;
  displayedColumns = [
    'katId',
    'katAdi',
    'katUrunSay',
    'islemler',
  ];
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((p) => {
      console.log(p);
     if (p) {
       this.markaId = p.markaId;
       this.MarkaGetir();
     }
   });
  }

  MarkaGetir() {
    this.apiServis.MarkaById(this.markaId).subscribe((d: Marka) => {
      this.secMarka = d;
      console.log(d);
    });
  }

  Duzenle(kayit: Marka) {
    this.dialogRef = this.matDialog.open(MarkaDialogComponent, {
      width: '60%',
      data: {
        kayit: kayit,
        islem: 'duzenle',
      },
    });

    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        kayit.MarkaId = d.MarkaId;
        this.apiServis.MarkaDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.MarkaGetir();
          }
        });
      }
    });
  }

  Sil(kayit: Marka) {
    this.confirmdialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '60%',
    });
    this.confirmdialogRef.componentInstance.dialogMesaj =
      kayit.MarkaId +
      " Id'li " +
      kayit.MarkaAdi +
      '  Marka Silinecektir Onaylıyor Musunuz?';

    this.confirmdialogRef.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.KategoriSil(kayit.MarkaId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.MarkaGetir();
          }
        });
      }
    });
  }


}
