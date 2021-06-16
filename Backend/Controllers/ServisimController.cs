using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using WebApplication1.Models;
using WebApplication1.ViewModel;

namespace Sporties.Controllers
{
    public class ServisController : ApiController
    {
        berkalpEntities db = new berkalpEntities();
        SonucModel sonuc = new SonucModel();

        #region Kategori

        [HttpGet]
        [Route("api/kategoriliste")]
        public List<KategoriModel> KategoriListe()
        {
            List<KategoriModel> liste = db.Kategori.Select(x => new KategoriModel()
            {

                KategoriId = x.KategoriId,
                KategoriAdi = x.KategoriAdi,
               

            }
            ).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/kategoribyid/{katId}")]
        public KategoriModel KategoriById(int katId)
        {
            KategoriModel kayit = db.Kategori.Where(s => s.KategoriId == katId).Select(x => new KategoriModel()
            {
                KategoriId = x.KategoriId,
                KategoriAdi = x.KategoriAdi,

            }).FirstOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/kategoriekle")]
        public SonucModel KategoriEkle(KategoriModel model)
        {
            if (db.Kategori.Count(s => s.KategoriAdi == model.KategoriAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kategori Kayıtlıdır.";
                return sonuc;
            }

            Kategori yeni = new Kategori();
            yeni.KategoriAdi = model.KategoriAdi;
            db.Kategori.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Başarıyla Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/kategoriduzenle")]
        public SonucModel KategoriDuzenle(KategoriModel model)
        {
            Kategori kayit = db.Kategori.Where(s => s.KategoriId == model.KategoriId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Kategori Yok";
                return sonuc;
            }

            kayit.KategoriAdi = model.KategoriAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Başarıyla Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/kategorisil/{katId}")]
        public SonucModel KategoriSil(int katId)
        {
            Kategori kayit = db.Kategori.Where(s => s.KategoriId == katId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Kategori Yok";
                return sonuc;
            }

            if (db.Urun.Count(s => s.UrunKategoriId == katId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu Kategorinin İçerisinde Ürünler Var Kategori Silinemedi";
                return sonuc;
            }

            db.Kategori.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Silindi";
            return sonuc;
        }

        #endregion

        #region Urun

        [HttpGet]
        [Route("api/urunliste")]
        public List<UrunModel> UrunListe()
        {
            List<UrunModel> liste = db.Urun.Select(x => new UrunModel()
            {

                UrunId = x.UrunId,
                UrunAdi = x.UrunAdi,
                UrunFiyat = x.UrunFiyat,
                UrunAdet = x.UrunAdet,
                UrunKodu = x.UrunKodu,
                UrunFoto = x.UrunFoto,
                UrunKategoriId = x.UrunKategoriId,
                UrunMarkaId = x.UrunMarkaId,
      

            }
            ).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/urunbyid/{urunId}")]
        public UrunModel UrunById(int urunId)
        {
            UrunModel kayit = db.Urun.Where(s => s.UrunId == urunId).Select(x => new UrunModel()
            {
                UrunId = x.UrunId,
                UrunAdi = x.UrunAdi,
                UrunFiyat = x.UrunFiyat,
                UrunAdet = x.UrunAdet,
                UrunKodu = x.UrunKodu,
                UrunFoto = x.UrunFoto,
                UrunKategoriId = x.UrunKategoriId,
                UrunMarkaId = x.UrunMarkaId,

            }).FirstOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/urunekle")]
        public SonucModel UrunEkle(UrunModel model)
        {
            if (db.Urun.Count(s => s.UrunAdi == model.UrunAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Ürün Kayıtlıdır.";
                return sonuc;
            }

            Urun yeni = new Urun();
            yeni.UrunAdi = model.UrunAdi;
            yeni.UrunFiyat = model.UrunFiyat;
            yeni.UrunAdet = model.UrunAdet;
            yeni.UrunKodu = model.UrunKodu;
            yeni.UrunFoto = model.UrunFoto;
            yeni.UrunKategoriId = model.UrunKategoriId;
            yeni.UrunMarkaId = model.UrunMarkaId;
         
            db.Urun.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ürün Başarıyla Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/urunduzenle")]
        public SonucModel UrunDuzenle(UrunModel model)
        {
            Urun kayit = db.Urun.Where(s => s.UrunId == model.UrunId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Ürün Yok";
                return sonuc;
            }


            kayit.UrunAdi = model.UrunAdi;
            kayit.UrunFiyat = model.UrunFiyat;
            kayit.UrunAdet = model.UrunAdet;
            kayit.UrunKodu = model.UrunKodu;
            kayit.UrunFoto = model.UrunFoto;
            kayit.UrunKategoriId = model.UrunKategoriId;
            kayit.UrunMarkaId = model.UrunMarkaId;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Ürün Başarıyla Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/urunsil/{urunId}")]
        public SonucModel UrunSil(int urunId)
        {
            Urun kayit = db.Urun.Where(s => s.UrunId == urunId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Ürün Yok";
                return sonuc;
            }




            db.Urun.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Ürün Silindi";
            return sonuc;
        }

        #endregion

        #region Marka

        [HttpGet]
        [Route("api/markaliste")]
        public List<MarkaModel> MarkaListe()
        {
            List<MarkaModel> liste = db.Marka.Select(x => new MarkaModel()
            {

                MarkaId = x.MarkaId,
                MarkaAdi = x.MarkaAdi,


            }
            ).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/markabyid/{markaId}")]
        public MarkaModel MarkaById(int markaId)
        {
            MarkaModel kayit = db.Marka.Where(s => s.MarkaId == markaId).Select(x => new MarkaModel()
            {
                MarkaId = x.MarkaId,
                MarkaAdi = x.MarkaAdi,
            }).FirstOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/markaEkle")]
        public SonucModel UrunEkle(MarkaModel model)
        {
            if (db.Marka.Count(s => s.MarkaAdi == model.MarkaAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Marka Kayıtlıdır.";
                return sonuc;
            }

            Marka yeni = new Marka();

            yeni.MarkaAdi = model.MarkaAdi;

            db.Marka.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Marka Başarıyla Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/markaduzenle")]
        public SonucModel MarkaDuzenle(MarkaModel model)
        {
            Marka kayit = db.Marka.Where(s => s.MarkaId == model.MarkaId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Marka Yok";
                return sonuc;
            }

            kayit.MarkaAdi = model.MarkaAdi;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Marka Başarıyla Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/markasil/{markaId}")]
        public SonucModel MarkaSil(int markaId)
        {
            Marka kayit = db.Marka.Where(s => s.MarkaId == markaId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Marka Yok";
                return sonuc;
            }




            db.Marka.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Marka Silindi";
            return sonuc;
        }

        #endregion

        #region Uye

        [HttpGet]
        [Route("api/uyeliste")]
        public List<UyeModel> UyeListe()
        {
            List<UyeModel> liste = db.Uye.Select(x => new UyeModel()
            {

                UyeId = x.UyeId,
                UyeAdi = x.UyeAdi,
                UyeSoyadi = x.UyeSoyadi,
                UyeKA = x.UyeKA,
                UyeKS = x.UyeKS,
                UyeTel = x.UyeTel,
                UyeMail = x.UyeMail,
                UyeAdres = x.UyeAdres,
                UyeYetki = x.UyeYetki,


            }
            ).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/uyebyid/{uyeId}")]
        public UyeModel UyeById(int UyeId)
        {
            UyeModel kayit = db.Uye.Where(s => s.UyeId == UyeId).Select(x => new UyeModel()
            {
                UyeId = x.UyeId,
                UyeAdi = x.UyeAdi,
                UyeSoyadi = x.UyeSoyadi,
                UyeKA = x.UyeKA,
                UyeKS = x.UyeKS,
                UyeTel = x.UyeTel,
                UyeMail = x.UyeMail,
                UyeAdres = x.UyeAdres,
                UyeYetki = x.UyeYetki,
            }).FirstOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/uyeekle")]
        public SonucModel UyeEkle(UyeModel model)
        {
            if (db.Uye.Count(s => s.UyeKA == model.UyeKA) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Üye Kayıtlıdır.";
                return sonuc;
            }

            Uye yeni = new Uye();

            yeni.UyeAdi = model.UyeAdi;
            yeni.UyeSoyadi = model.UyeSoyadi;
            yeni.UyeKA = model.UyeKA;
            yeni.UyeKS = model.UyeKS;
            yeni.UyeTel = model.UyeTel;
            yeni.UyeMail = model.UyeMail;
            yeni.UyeAdres = model.UyeAdres;
            yeni.UyeYetki = model.UyeYetki;

            db.Uye.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Başarıyla Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/uyeduzenle")]
        public SonucModel UyeDuzenle(UyeModel model)
        {
            Uye kayit = db.Uye.Where(s => s.UyeId == model.UyeId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Üye Yok";
                return sonuc;
            }


            kayit.UyeAdi = model.UyeAdi;
            kayit.UyeSoyadi = model.UyeSoyadi;
            kayit.UyeKA = model.UyeKA;
            kayit.UyeKS = model.UyeKS;
            kayit.UyeTel = model.UyeTel;
            kayit.UyeMail = model.UyeMail;
            kayit.UyeAdres = model.UyeAdres;
            kayit.UyeYetki = model.UyeYetki;



            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Üye Başarıyla Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/uyesil/{UyeId}")]
        public SonucModel UyeSil(int UyeId)
        {
            Uye kayit = db.Uye.Where(s => s.UyeId == UyeId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Üye Yok";
                return sonuc;
            }




            db.Uye.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Silindi";
            return sonuc;
        }

        #endregion

        #region Siparis

        [HttpGet]
        [Route("api/siparisliste")]
        public List<SiparisModel> SiparisListe()
        {
            List<SiparisModel> liste = db.Siparis.Select(x => new SiparisModel()
            {

                SiparisId = x.SiparisId,
                SiparisKod = x.SiparisKod,
                SiparisTarih = x.SiparisTarih,
                SiparisUrunId = x.SiparisUrunId,
                SiparisUyeId = x.SiparisUyeId,

                SiparisUyeAdi= x.Uye.UyeAdi,
                SiparisUyeSoyadi = x.Uye.UyeSoyadi,
                SiparisAdres = x.Uye.UyeAdres,
                SiparisTelefon = x.Uye.UyeTel,
                SiparisMail = x.Uye.UyeMail,

                SiparisUrunAdi = x.Urun.UrunAdi,
                SiparisUrunFiyat = x.Urun.UrunFiyat,
                SiparisUrunAdet = x.Urun.UrunAdet,
                SiparisUrunKod = x.Urun.UrunKodu,

                SiparisUrunMarkaAdi = x.Urun.Marka.MarkaAdi,
                SiparisUrunKategoriAdi = x.Urun.Kategori.KategoriAdi,






            }
            ).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/siparisbyid/{SiparisId}")]
        public SiparisModel SiparisById(int SiparisId)
        {
            SiparisModel kayit = db.Siparis.Where(s => s.SiparisId == SiparisId).Select(x => new SiparisModel()
            {
                SiparisId = x.SiparisId,
                SiparisKod = x.SiparisKod,
                SiparisTarih = x.SiparisTarih,
                SiparisUrunId = x.SiparisUrunId,
                SiparisUyeId = x.SiparisUyeId,

                SiparisUyeAdi = x.Uye.UyeAdi,
                SiparisUyeSoyadi = x.Uye.UyeSoyadi,
                SiparisAdres = x.Uye.UyeAdres,
                SiparisTelefon = x.Uye.UyeTel,
                SiparisMail = x.Uye.UyeMail,

                SiparisUrunAdi = x.Urun.UrunAdi,
                SiparisUrunFiyat = x.Urun.UrunFiyat,
                SiparisUrunAdet = x.Urun.UrunAdet,
                SiparisUrunKod = x.Urun.UrunKodu,

                SiparisUrunMarkaAdi = x.Urun.Marka.MarkaAdi,
                SiparisUrunKategoriAdi = x.Urun.Kategori.KategoriAdi,

            }).FirstOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/siparisEkle")]
        public SonucModel SiparisEkle(SiparisModel model)
        {
            if (db.Siparis.Count(s => s.SiparisKod == model.SiparisKod) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Sipariş Kayıtlıdır.";
                return sonuc;
            }

            Siparis yeni = new Siparis();


            yeni.SiparisUyeId = model.SiparisUyeId;
            yeni.SiparisTarih = model.SiparisTarih;
            yeni.SiparisKod = model.SiparisKod;
            yeni.SiparisUrunId = model.SiparisUrunId;


            db.Siparis.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Sipariş Başarıyla Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/siparisduzenle")]
        public SonucModel SiparisDuzenle(SiparisModel model)
        {
            Siparis kayit = db.Siparis.Where(s => s.SiparisId == model.SiparisId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Sipariş Yok";
                return sonuc;
            }


            kayit.SiparisId = model.SiparisId;
            kayit.SiparisUyeId = model.SiparisUyeId;
            kayit.SiparisTarih = model.SiparisTarih;
            kayit.SiparisKod = model.SiparisKod;
            kayit.SiparisUrunId = model.SiparisUrunId;



            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Sipariş Başarıyla Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/siparissil/{SiparisId}")]
        public SonucModel SiparisSil(int SiparisId)
        {
            Siparis kayit = db.Siparis.Where(s => s.SiparisId == SiparisId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Sipariş Yok";
                return sonuc;
            }




            db.Siparis.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Sipariş Silindi";
            return sonuc;
        }

        #endregion


    }
}
