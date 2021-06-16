using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.ViewModel
{
    public class UrunModel
    {
        public int UrunId { get; set; }
        public string UrunAdi { get; set; }
        public decimal UrunFiyat { get; set; }
        public int UrunAdet { get; set; }
        public string UrunKodu { get; set; }
        public string UrunFoto { get; set; }
        public int UrunKategoriId { get; set; }
        public int UrunMarkaId { get; set; }
    }
}