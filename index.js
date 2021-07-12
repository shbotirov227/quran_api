let data1 = document.querySelector('.data1'),
    data2 = document.querySelector('.data2'),
    list = document.querySelector('.list'),
    audioWrap = document.querySelector('#audioWrap'),
    play = document.querySelector('.play'),
    pause = document.querySelector('.pause'),
    inputName = document.querySelector('#inputName'),
    quranPlayer = document.querySelector('.quranPlayer'),
    surahName = document.querySelector('.surahName'),
    ayahs = document.querySelector('#ayahs'),
    faPlay = document.querySelector('.fa-play')

let arabicText = '';
let uzbekText = '';
let sura = ''

// audio API ga so'rov jo'natish
inputName.addEventListener('keyup', () => {});

// tafsir API ga so'rov jo'natish
inputName.addEventListener('keyup', () => {
    fetch(`https://quranenc.com/api/translation/sura/uzbek_mansour/${inputName.value}`).then(res => {
        return res.json();
    }).then(data => {
        let ayahsOfSurah = data.result

        ayahsOfSurah.map((item) => {
            uzbekText = item.translation;
            arabicText = item.arabic_text;
            // rendering ayahs
            let li = document.createElement('li');
            let h1 = document.createElement('h1');
            let h2 = document.createElement('h2');
            h2.textContent = uzbekText;
            h1.textContent = arabicText;
            li.appendChild(h1)
            li.appendChild(h2)
            ayahs.appendChild(li)
        });

        // audio API ga so'rov jo'natish
        var fetched = (oyat) => {
            fetch(`https://api.quran.sutanlab.id/surah/${inputName.value}`).then((res) => {
                return res.json();
            }).then((data) => {
                // Sura nomini topish
                if (inputName.value.length > 0 && inputName.value.length <= 114) {
                    surahName.textContent = data.data.name.transliteration.id;
                };

                // Audio bilan tafsirdan qaytgan malumotni bir-biriga ulash
                let oyatlar = data.data.verses;
                oyatlar.map((item) => {
                    quranPlayer.src = item.audio.primary;
                    // quranPlayer.play()
                });
                console.log(quranPlayer);

            }).catch((err) => {
                console.log(err);
            })
        };

        fetched()
    }).catch(err => {
        console.log(err);
    })
});

// Promise.all([
// fetch(`https://api.quran.sutanlab.id/surah/${inputName.value}`),
// fetch(`https://quranenc.com/api/translation/sura/uzbek_mansour/${inputName.val
// ue}`) ])fetched.then((responses) => {     return Promise.all(responses.map(
// (response) => {         return response.json();     })); }).then((data) => {
//    console.log(data); }).catch(function (error) {     console.log(error); });