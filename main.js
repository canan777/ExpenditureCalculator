//console.log('Bağlantı Kontrol')

const harcamaInput = document.querySelector("#harcama");
//console.log(harcamaInput)
const fiyatInput = document.querySelector("#fiyat");
//console.log(fiyatInput)
const formBtn = document.querySelector(".ekle-btn");
//console.log(formBtn)
const list = document.querySelector(".list");
//console.log(list)
const totalInfo = document.querySelector("#total-info");
//console.log(totalInfo)
const nameInput = document.getElementById("name-input");
//console.log(nameInput)

const userName = localStorage.getItem("name");

nameInput.value = userName;

nameInput.addEventListener("change", (e) => {
  // console.log(e.target.value)
  localStorage.setItem("name", e.target.value);
});

//Form butona tıklanma olayını yakalamk için olay izleyicisi ekledik
formBtn.addEventListener("click", addExpense);
//harcama kartlarının bulundğu listeye tıklanılan eleman tespiti tıklama oalyı ekledik
list.addEventListener("click", handleClick);

//Toplam bilgisini tutmak için bir değişken tnaımladık
let toplam = 0;
//Her eklenen ürünle birlikte toplam fiyatın güncellenmesi toplama fonsyonu
function updateToplam(fiyatBilgisi) {
  ///Dışardan paramtere olarak fiyat bilgisi alınıyor
  //console.log(fiyatBilgisi)
  //inputtan gelen veri stirng olduğu için number hale çevriliyor
  toplam += Number(fiyatBilgisi);
  //Elde edilen toplam rakam html tarafına gönderiliyor
  totalInfo.innerText = toplam;
}
//Yeni ürün ekleme fonksionu
function addExpense(e) {
  //Form kendinden gelen sayfa yenilmem özelliğini devre dışı bırakma
  e.preventDefault();
  //console.log('addExpense')
  //console.log(harcamaInput)
  //validation (Doğrulama) eğer inputlardan herhangi biri boş ise alert bastır devam etme
  if (!harcamaInput.value || !fiyatInput.value) {
    alert("Tüm Boş alanları doldurun");
  }
  //Eğer inputlarımı dolu ise devam et
  else {
    //Ekle butonuna basıldğı anda div oluşturulur
    const harcamaDiv = document.createElement("div");
    //oluştrualn dive expense classı atanıyor
    harcamaDiv.classList.add("expense");
    //oluşturan divin İÇERİĞİNE ilgili html elemanları veriliyor
    //tek tırnak ile sadece tek satır yazabildiğimiz ve içerisin dinamik
    //veri ekleyemdiğimiz için backtick (``) kullanılır
    harcamaDiv.innerHTML = `<h2>${harcamaInput.value}</h2>
     <h2 id='value'>${fiyatInput.value}</h2>
         <div class="buttons">
              <img id='payment' src="./images/pay.png" alt="">
              <img id='remove' src="./images/remove.png" alt="">
         </div>
  `;
    //olutşrutaln harcama divi html tarafına gönderiliyor
    list.appendChild(harcamaDiv);
    //console.log(harcamaDiv);
    //tüm işlemler tamamlandıktan sonra toplam fiyat güncellniyor
    updateToplam(fiyatInput.value);
  }
  //İputların içeriğini işlem bittikten sonra temizleme
  harcamaInput.value = "";
  fiyatInput.value = "";
}

//silme işlemi için elemanı tepsit etme
function handleClick(e) {
  //console.log(e.target)

  //tıklanılan eleman genel e parametresının target özelliğindeir
  //tıklanılan elemanı değişkene atyıoruz
  let tiklanilanEleman = e.target;
  //tıklanılan elemeanın silme resmi ollduğunu tespit ediyoruz
  if (tiklanilanEleman.id === "remove") {
    // console.log(tiklanilanEleman.parentElement.parentElement)
    //bbir elemanın bir üst kapsayıcı yapsını almak için parentElement kullanılır

    //ilk parentte buttons divine ulaştık 2.sinde ise harcama divine ulaştık
    const kapsayiciElement = tiklanilanEleman.parentElement.parentElement;
    //console.log(kapsayiciElement)
    //div içerisinde fiyat bilgisne verdiğimiz id özellği ile ulaşıyoruz.
    const deletedPrice = kapsayiciElement.querySelector("#value").innerText;
    // console.log(deletedPrice);
    //ulaştığımız veri string olduğu için önce number çeviriyoruz daha sonra başına çıkarılasını istedğimiz için eksi koyup
    //toplama fonsiyonu yolluyoruz
    updateToplam(-Number(deletedPrice));
    //istenilen bir elemanı  html den kaldırma
    kapsayiciElement.remove();
  }
}