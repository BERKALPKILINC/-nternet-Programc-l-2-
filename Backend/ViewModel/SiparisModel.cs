using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.ViewModel
{
    public class SiparisModel
    {
        public int SiparisId { get; set; }
        public string SiparisKod { get; set; }
        public string SiparisTarih { get; set; }
        public int SiparisUrunId { get; set; }
        public int SiparisUyeId { get; set; }
        public string SiparisUyeAdi { get; set; }
        public string SiparisUyeSoyadi { get; set; }
        public string SiparisAdres { get; set; }
        public string SiparisTelefon { get; set; }
        public string SiparisMail { get; set; }

        public string SiparisUrunAdi { get; set; }
        public decimal SiparisUrunFiyat { get; set; }
        public int SiparisUrunAdet { get; set; }
        public string SiparisUrunKod { get; set; }

        public string SiparisUrunMarkaAdi { get; set; }
        public string SiparisUrunKategoriAdi { get; set; }


    }
}