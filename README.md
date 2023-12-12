# 50. Yıl Amblemi
Cumhuriyetin 50. yılı ambleminin Javascript ve SVG kullanılarak çizimidir.

![50. Yıl Amblemi](./50yil.png)

## Açıklama
Cumhuriyetimizin 50. yılı için hazırlanmış amblemin resmi bir tüzüğü bulunamamıştır.
Mevcut resim ve fotoğraflar incelenerek özgün bir spesifikasyon oluşturulmuştur.
Buna göre:
* Bir çember içine çepere teğet ve her biri Cumhuriyetin 10 yılını temsil eden
  birbirlerine teğet 5 adet ay, çember merkezine dönük olarak çizilmiştir.
* Çember dairesi bayrak kırmızısıdır.
* Ayların çember dışına dönük taraflarına kırmızı kontur çekilmiştir.
* Daire merkezinde bir adet 5 köşeli yıldız vardır.
* Çemberin kuzey yayı boyunca ve daire dışında olacak şekilde büyük harflerle `TÜRKİYE CUMHURİYETİ` yazılmıştır.
* Çemberin güney yayı boyunca ve daire dışında olacak şekilde büyük harflerle `1923  50 YIL  1973` yazılmıştır.
  Ayrıca başta ve sonda birer siyah nokta gözlenmektedir.

## Yöntem
* Aylar bayrak tüzüğüne uygun olarak çizilir, bunun için [bayrak](https://github.com/alperali/bayrak)
  projesindeki bilgi ve birikimden faydalanılır:
  - ay iç çember yarıçapı = 48
  - ay dış çember yarıçapı = 60
  - ay dış çember merkezinin iç çember merkezine uzaklığı = 15
* Konturu çizmek için merkezi ay dış çemberi merkeziyle aynı, yarıçapı biraz daha fazla (+8 olarak tespit edilmiştir)
  kırmızı daire çizilir.
  - kontur çember yarıçapı = 68
* Bayrak yıldızının bayrak eksenini kestiği nokta, amblem üzerindeki yıldızın bir köşesi sayılır.
  5 ay için hesaplanan bu noktalar `<polygon>` ile birleştirilerek amblem yıldızı çizilir.
* Yukarıdaki ölçüye göre çizilen 5 ayın birbirine teğet olacak biçimde yerleşebileceği amblem çemberinin
  yarıçapı hesaplanmalıdır. Bunun için temel trigonometri kullanılır.

### Amblem çemberi yarıçapı

![Amblem çemberi yarıçap hesaplaması](./trigo.png)

Yukarıdaki şekilde bir ay dış çemberinin amblem çemberi içindeki konumu gösterilmiştir.
**a** noktası ay dış çemberi merkezi, **c** noktası amblem çemberi merkezidir.
Ay dış çember yarıçapı *s* = 60 olduğunu biliyoruz. Amblem yapıçapı **h**+**s** olup **h**'yi bulmak istiyoruz.

Amblem çember merkezinden ay dış çemberinin her iki tarafına teğet doğrular çekersek, oluşan yayı gören açı `360/5 = 72` olur
(yeşil açı). **a** ve **c** noktalarından geçen doğru bu açıyı tam ikiye böler, `36` olur (mavi açı).
**c**'den ay çemberine teğet çekilen doğrunun teğet noktasına **a**'dan çekilen doğru dik açıyla keser, **abc** bir dik üçgendir.
`sin(36) = s/h` eşitliğinden `h = s/sin(36)` olur.
