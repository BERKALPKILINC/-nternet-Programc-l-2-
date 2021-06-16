import { Marka } from './../models/Marka';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kategori } from '../models/Kategori';
import { Siparis } from '../models/Siparis';
import { Urun } from '../models/Urun';
import { UrunGorsel } from '../models/UrunGorsel';
import { Uye } from '../models/Uye';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'https://localhost:44318/api/';
  siteUrl = 'https://localhost:44318/';

  constructor(public http: HttpClient) {}

  // Oturum İşlemleri
  tokenAl(kullaniciAdi: string, sifre: string) {
    var data =
      'username=' +
      kullaniciAdi +
      '&password=' +
      sifre +
      '&grant_type=password';

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post(this.apiUrl + '/token', data, { headers: reqHeader });
  }

  oturumKontrol() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  yetkiKontrol(yetkiler) {
    var uyeYetkileri: string[] = JSON.parse(localStorage.getItem('uyeYetkileri'));
    var sonuc: boolean = false;

    if (uyeYetkileri) {
      yetkiler.forEach(element => {
        if (uyeYetkileri.indexOf(element)>-1) {
          sonuc=true;
          return false;
        }
      });
    }

    return sonuc;
  }





  //Kategori Servis
  KategoriListe() {
    return this.http.get(this.apiUrl + 'kategoriliste');
  }

  KategoriById(KategoriId: number) {
    return this.http.get(this.apiUrl + 'kategoribyid/' + KategoriId);
  }

  KategoriEkle(kat: Kategori) {
    return this.http.post(this.apiUrl + 'kategoriekle', kat);
  }

  KategoriDuzenle(kat: Kategori) {
    return this.http.put(this.apiUrl + 'kategoriduzenle', kat);
  }

  KategoriSil(KategoriId: number) {
    return this.http.delete(this.apiUrl + 'kategorisil/' + KategoriId);
  }

  //Ürün Servis

  UrunListe() {
    return this.http.get(this.apiUrl + 'urunliste');
  }
//5
  UrunListeByKatId(katId: number) {
    return this.http.get(this.apiUrl + 'urunlistebykatid/' + katId);
  }
//5
  UrunById(UrunId: number) {
    return this.http.get(this.apiUrl + 'urunbyid/' + UrunId);
  }

  UrunEkle(urn: Urun) {
    return this.http.post(this.apiUrl + 'urunekle', urn);
  }

  UrunDuzenle(urn: Urun) {
    return this.http.put(this.apiUrl + 'urunduzenle', urn);
  }

  UrunSil(UrunId: number) {
    return this.http.delete(this.apiUrl + 'urunsil/' + UrunId);
  }

  UrunFotoGuncelle(UrunFoto: UrunGorsel) {
    return this.http.post(this.apiUrl + 'urunfotoguncelle', UrunFoto);
  }

  // Üye Servis

  UyeListe() {
    return this.http.get(this.apiUrl + 'uyeliste');
  }

  UyeById(UyeId: number) {
    return this.http.get(this.apiUrl + 'uyebyid/' + UyeId);
  }

  UyeEkle(uy: Uye) {
    return this.http.post(this.apiUrl + 'uyeekle', uy);
  }

  UyeDuzenle(uy: Uye) {
    return this.http.put(this.apiUrl + 'uyeduzenle', uy);
  }

  UyeSil(UyeId: number) {
    return this.http.delete(this.apiUrl + 'uyesil/' + UyeId);
  }

  // Sipariş Servis

  SiparisListe() {
    return this.http.get(this.apiUrl + 'siparisliste');
  }

  SiparisById(SiparisId: number) {
    return this.http.get(this.apiUrl + 'siparisbyid/' + SiparisId);
  }

  SiparisEkle(sprs: Siparis) {
    return this.http.post(this.apiUrl + 'siparisEkle', sprs);
  }

  SiparisDuzenle(sprs: Siparis) {
    return this.http.put(this.apiUrl + 'siparisduzenle', sprs);
  }

  SiparisSil(SiparisId: number) {
    return this.http.delete(this.apiUrl + 'siparissil/' + SiparisId);
  }


  //Marka
  MarkaListe() {
    return this.http.get(this.apiUrl + 'markaliste');
  }

  MarkaById(MarkaId: number) {
    return this.http.get(this.apiUrl + 'markabyid/' + MarkaId);
  }

  MarkaEkle(mrk: Marka) {
    return this.http.post(this.apiUrl + 'markaEkle', mrk);
  }

  MarkaDuzenle(mrk: Marka) {
    return this.http.put(this.apiUrl + 'markaduzenle', mrk);
  }

  MarkaSil(MarkaId: number) {
    return this.http.delete(this.apiUrl + 'markasil/' + MarkaId);
  }
}
