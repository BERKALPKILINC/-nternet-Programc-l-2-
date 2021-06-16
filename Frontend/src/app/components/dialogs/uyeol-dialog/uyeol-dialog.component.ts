import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Uye } from 'src/app/models/Uye';

@Component({
  selector: 'app-uyeol-dialog',
  templateUrl: './uyeol-dialog.component.html',
  styleUrls: ['./uyeol-dialog.component.css']
})
export class UyeolDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Uye;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UyeolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;

    if (this.islem == 'ekle') {
      this.dialogBaslik = 'Üye Ol';
    }


    this.frm=this.FormOlustur();
   }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      UyeId: [this.yeniKayit.UyeId],
      UyeAdi: [this.yeniKayit.UyeAdi],
      UyeSoyadi: [this.yeniKayit.UyeSoyadi],
      UyeKA: [this.yeniKayit.UyeKA],
      UyeKS: [this.yeniKayit.UyeKS],
      UyeTel: [this.yeniKayit.UyeTel],
      UyeMail: [this.yeniKayit.UyeMail],
      UyeAdres: [this.yeniKayit.UyeAdres],
      UyeYetki: [this.yeniKayit.UyeYetki],
    });
  }

}
