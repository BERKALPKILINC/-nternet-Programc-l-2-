import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Sonuc } from 'src/app/models/Sonuc';
import { Urun } from 'src/app/models/Urun';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { UrunDialogComponent } from '../../dialogs/urun-dialog/urun-dialog.component';

@Component({
  selector: 'app-urun-liste',
  templateUrl: './urun-liste.component.html',
  styleUrls: ['./urun-liste.component.css'],
})
export class UrunListeComponent implements OnInit {
  dialogRef: MatDialogRef<UrunDialogComponent>;
  confirmdialogRef: MatDialogRef<ConfirmDialogComponent>;
  urun: Urun[];
  urunId: number;
  secUrun: Urun;



  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((p) => {
      console.log(p);
      if (p) {
        this.urunId = p.urunId;
        this.UrunGetir();
      }
    });
  }

  UrunGetir() {
    this.apiServis.UrunById(this.urunId).subscribe((d: Urun) => {
      this.secUrun = d;
    });
  }


  Duzenle(kayit: Urun) {
    this.dialogRef = this.matDialog.open(UrunDialogComponent, {
      width: '60%',
      data: {
        kayit: kayit,
        islem: 'duzenle',
      },
    });

    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        kayit.UrunKodu = d.UrunKodu;
        kayit.UrunAdi = d.UrunAdi;
        kayit.UrunAdet = d.UrunAdet;
        kayit.UrunFiyat = d.UrunFiyat;
        kayit.UrunMarkaId = d.UrunMarkaId;
        kayit.UrunKategoriId = d.UrunKategoriId;
        kayit.UrunFoto = d.UrunFoto;
        this.apiServis.UrunDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunGetir();
          }
        });
      }
    });
  }

  Sil(kayit: Urun) {
    this.confirmdialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '60%',
    });
    this.confirmdialogRef.componentInstance.dialogMesaj =
      kayit.UrunKodu +
      ' Kodlu ' +
      kayit.UrunAdi +
      '  Ürünü Silinecektir Onaylıyor Musunuz?';

    this.confirmdialogRef.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.UrunSil(kayit.UrunId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunGetir();
          }
        });
      }
    });
  }
}
