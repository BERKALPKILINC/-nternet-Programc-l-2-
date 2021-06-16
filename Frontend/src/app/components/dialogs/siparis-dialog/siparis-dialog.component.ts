import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Siparis } from 'src/app/models/Siparis';

@Component({
  selector: 'app-siparis-dialog',
  templateUrl: './siparis-dialog.component.html',
  styleUrls: ['./siparis-dialog.component.css']
})
export class SiparisDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Siparis;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<SiparisDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder,
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;

    if (this.islem == 'ekle') {
      this.dialogBaslik = 'Sipariş Ekle';
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = 'Sipariş Düzenle';
    }

    this.frm=this.FormOlustur();
   }

  ngOnInit() {
  }

  FormOlustur() {
    return this.frmBuild.group({

      SiparisId: [this.yeniKayit.SiparisId],
      SiparisKod: [this.yeniKayit.SiparisKod],
      SiparisUyeId: [this.yeniKayit.SiparisUyeId],
      SiparisTarih: [this.yeniKayit.SiparisTarih],
      SiparisUrunId: [this.yeniKayit.SiparisUrunId],
      SiparisUrunKod: [this.yeniKayit.SiparisUrunKod],
      SiparisAdres: [this.yeniKayit.SiparisAdres],
      SiparisTelefon: [this.yeniKayit.SiparisTelefon],
      SiparisMail: [this.yeniKayit.SiparisMail],
      SiparisUrunAdi: [this.yeniKayit.SiparisUrunAdi],
      SiparisUyeAdi: [this.yeniKayit.SiparisUyeAdi],
      SiparisUyeSoyadi: [this.yeniKayit.SiparisUyeSoyadi],
      SiparisUrunFiyat: [this.yeniKayit.SiparisUrunFiyat],
      SiparisUrunAdet: [this.yeniKayit.SiparisUrunAdet],
      SiparisUrunMarkaAdi: [this.yeniKayit.SiparisUrunMarkaAdi],
      SiparisUrunKategoriAdi: [this.yeniKayit.SiparisUrunKategoriAdi],
    });
  }

}
