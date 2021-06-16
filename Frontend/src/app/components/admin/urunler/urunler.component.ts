import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { Urun } from 'src/app/models/Urun';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { GorselyukleDialogComponent } from '../../dialogs/gorselyukle-dialog/gorselyukle-dialog.component';
import { UrunDialogComponent } from '../../dialogs/urun-dialog/urun-dialog.component';


@Component({
  selector: 'app-urunler',
  templateUrl: './urunler.component.html',
  styleUrls: ['./urunler.component.css'],
})
export class UrunlerComponent implements OnInit {
  dialogRef: MatDialogRef<UrunDialogComponent>;
  confirmdialogRef: MatDialogRef<ConfirmDialogComponent>;
  gorselDialogRef: MatDialogRef<GorselyukleDialogComponent>;
  urunler: Urun[];
  dataSource: any;
  displayedColumns = [
    'UrunFoto',
    'UrunKodu',
    'UrunAdi',
    'UrunAdet',
    'UrunFiyat',
    'UrunMarkaId',
    'UrunKategoriId',
    'islemler',
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) {}

  ngOnInit() {
    this.UrunListele();
  }

  UrunListele() {
    this.apiServis.UrunListe().subscribe((d: Urun[]) => {
      this.urunler = d;
      this.dataSource = new MatTableDataSource(this.urunler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  UrunFiltrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Ekle() {
    var yeniKayit: Urun = new Urun();
    this.dialogRef = this.matDialog.open(UrunDialogComponent, {
      width: '60%',
      data: {
        kayit: yeniKayit,
        islem: 'ekle',
      },
    });
    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.UrunEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunListele();
          }
        });
      }
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
            this.UrunListele();
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
            this.UrunListele();
          }
        });
      }
    });
  }

  GorselGuncelle(kayit: Urun) {
    this.gorselDialogRef = this.matDialog.open(GorselyukleDialogComponent, {
      width: '40%',
      data: kayit,
    });

    this.gorselDialogRef.afterClosed().subscribe(d=>{
      if (d) {
        d.UrunKodu=kayit.UrunKodu;
        this.apiServis.UrunFotoGuncelle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UrunListele();
          }
        });
      }
    });
  }
}
