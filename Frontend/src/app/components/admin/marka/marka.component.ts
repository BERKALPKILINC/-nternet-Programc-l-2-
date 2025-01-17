import { Marka } from './../../../models/Marka';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { MarkaDialogComponent } from '../../dialogs/marka-dialog/marka-dialog.component';

@Component({
  selector: 'app-marka',
  templateUrl: './marka.component.html',
  styleUrls: ['./marka.component.scss']
})
export class MarkaComponent implements OnInit {

  dialogRef: MatDialogRef<MarkaDialogComponent>;
  confirmdialogRef: MatDialogRef<ConfirmDialogComponent>;
  markalar: Marka[];
  dataSource: any;
  displayedColumns = [
    'MarkaId',
    'MarkaAdi',
    'islemler',
  ];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.MarkaListe();
  }

  MarkaListe() {
    this.apiServis.MarkaListe().subscribe((d: Marka[]) => {
      this.markalar = d;
      this.dataSource = new MatTableDataSource(this.markalar);
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
    var yeniKayit: Marka = new Marka();
    this.dialogRef = this.matDialog.open(MarkaDialogComponent, {
      width: '60%',
      data: {
        kayit: yeniKayit,
        islem: 'ekle',
      },
    });
    this.dialogRef.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.MarkaEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.MarkaListe();
          }
        });
      }
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

        kayit.MarkaAdi = d.MarkaAdi;

        this.apiServis.MarkaDuzenle(kayit).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.MarkaListe();
          }
        });
      }
    });
  }

  Sil(kayit: Marka) {
    this.confirmdialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '60%',
    });
    this.confirmdialogRef.componentInstance.dialogMesaj = kayit.MarkaAdi + '  Kategorisi Silinecektir Onaylıyor Musunuz?';

    this.confirmdialogRef.afterClosed().subscribe(d=>{
      if (d) {
        this.apiServis.MarkaSil(kayit.MarkaId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.MarkaListe();
          }
        });
      }
    });
  }

}
