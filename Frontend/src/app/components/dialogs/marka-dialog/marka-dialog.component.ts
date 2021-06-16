import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Marka } from 'src/app/models/Marka';

@Component({
  selector: 'app-marka-dialog',
  templateUrl: './marka-dialog.component.html',
  styleUrls: ['./marka-dialog.component.scss']
})
export class MarkaDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Marka;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<MarkaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;

    if (this.islem == 'ekle') {
      this.dialogBaslik = 'Marka Ekle';
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = 'Marka Düzenle';
    }

    this.frm=this.FormOlustur();
   }

  ngOnInit() {
  }

  FormOlustur() {
    return this.frmBuild.group({

      MarkaId: [this.yeniKayit.MarkaId],
      MarkaAdi: [this.yeniKayit.MarkaAdi],
    });
  }

}
