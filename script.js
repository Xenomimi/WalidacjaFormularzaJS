function czy_puste(data) {
    if(data.length <= 0) { // jest puste
        return false
    }
    else {
        return true
    }
}

function dlugosc(data) {
    if (data.length > 3) {
        return true
    }
    else {
        return false
    }
}

function email(data) {
    var reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    if (reg.test(data)) {
        return true
    }
    else {
        document.getElementsByClassName("do_wal")[2].setCustomValidity("Niepoprawny e-mail.");
        document.getElementsByClassName("do_wal")[2].reportValidity();
        return false
    }
}

function czy_dobre(data) {
    hard_Reg = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
    medium_Reg = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}) or (?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})/
    if (hard_Reg.test(data)) {
        document.getElementById("wiad").innerHTML = ""
        document.getElementById("wiad").innerHTML = "Silne hasło"
        document.getElementById("wiad").style.color = "green"
        return true
    }
    else if (medium_Reg.test(data)){
        document.getElementById("wiad").innerHTML = ""
        document.getElementById("wiad").innerHTML = "Średnie hasło"
        document.getElementById("wiad").style.color = "orange"
        return true
    }
    else {
        document.getElementById("wiad").innerHTML = ""
        document.getElementById("wiad").innerHTML = "Słabe hasło"
        document.getElementById("wiad").style.color = "red"
        document.getElementsByClassName("do_wal")[3].setCustomValidity("Niepoprawne hasło.");
        document.getElementsByClassName("do_wal")[3].reportValidity();
        return false
    }
}
function wszystko_prawda(arr) {
    return arr.every(element => element === true);
}
function sprawdzPelnoletnosc(dataUrodzenia) {
    // Pobierz aktualną datę
    var dzis = new Date();
  
    // Oblicz różnicę między datą dzisiejszą a datą urodzenia
    var roznica = dzis.getFullYear() - dataUrodzenia.getFullYear();
  
    // Sprawdź, czy osoba urodziła się już w tym roku
    if (
      dzis.getMonth() < dataUrodzenia.getMonth() ||
      (dzis.getMonth() === dataUrodzenia.getMonth() &&
        dzis.getDate() < dataUrodzenia.getDate())
    ) {
      roznica--;
    }
  
    // Sprawdź, czy osoba jest pełnoletnia (wiek >= 18)
    if (roznica >= 18) {
      return true;
    } else {
      return false;
    }
}
function sprawdzNumerTelefonu(telefon) {
    var reg = /^[+]?\d{1,3}[-.\s]?\d{3}[-.\s]?\d{3}[-.\s]?\d{3}$/;
    return reg.test(telefon);
}
function waliduj() {
    
    var do_wal = document.getElementsByClassName("do_wal")

    console.log(do_wal)
    // czy zdane
    var czy_wartosc = false
    var czy_min_3 = false
    var czy_email = false
    var czy_haslo = false
    var czy_row_haslo = false
    var czy_plec = false
    var czy_data = false
    var czy_telefon = false
    // Sprawdzanie czy kazde pole ma w sobie wartosc oraz czy ma min 3 znaki
    for (let index = 0; index < do_wal.length; index++) {
        const element = do_wal[index];
        if (czy_puste(element.value)) {
            czy_wartosc = true
        }
        else{
            czy_wartosc = false
        }

        if (dlugosc(element.value)) {
            czy_min_3 = true
        }
        else{
            czy_min_3 = false
        }
    }
    // Sprawdzanie czy email jest poprawny
    if (email(do_wal[2].value)) {
        czy_email = true
    }
    // Sprawdzanie czy hasło jest odpowiednio mocne
    if (czy_dobre(do_wal[3].value)) {
        czy_haslo = true
    }
    // Sprawdzenie czy dwa hasło zostały napisane tak samo
    if (do_wal[3].value == do_wal[4].value) {
        czy_row_haslo = true
    }
    // Sprawdzenie czy płeć została zaznaczona
    const radioButtons = document.querySelectorAll('input[name="plec"]');
    if (radioButtons[0].checked == true || radioButtons[1].checked == true) {
        czy_plec = true
    }
    else {
        czy_plec = false
    }
    // Sprawdzenie czy osoba jest pełnoletnia
    var data = do_wal[6].value
    var dataUrodzenia = new Date(Number(data.slice(0,4)), Number(data.slice(5,7)), Number(data.slice(8,10))); // Przykładowa data urodzenia
    var czyPelnoletni = sprawdzPelnoletnosc(dataUrodzenia);
    
    if (czyPelnoletni) {
      console.log("Osoba jest pełnoletnia.");
      czy_data = true
    } else {
        document.getElementsByClassName("do_wal")[6].setCustomValidity("Nie jesteś pełnoletni");
        document.getElementsByClassName("do_wal")[6].reportValidity();
      czy_data = false
    }
    // Sprawdzenie czy telefon jest poprawni wpisany
    if (sprawdzNumerTelefonu(do_wal[5].value)) {
        czy_telefon = true
    }
    else {
        czy_telefon = false
        document.getElementsByClassName("do_wal")[5].setCustomValidity("Niepoprawny numer telefonu");
        document.getElementsByClassName("do_wal")[5].reportValidity();
    }

    
    testy = [
            czy_wartosc, 
            czy_min_3, 
            czy_email, 
            czy_haslo, 
            czy_row_haslo, 
            czy_plec, 
            czy_data,
            czy_telefon
            ]
    console.log(testy)

    if (wszystko_prawda(testy)) {
        document.getElementById("ostat").innerHTML = "Wszystko git"
    }
    else {
        document.getElementById("ostat").innerHTML = "Nie spełniono wszystkich kryteriów"
    }
    
}

function pokazUkryjAdres() {
    var adresCheckbox = document.getElementById("adresCheckbox");
    var adresKorespondencyjnyDiv = document.getElementById("adresKorespondencyjny");
    var adresKorespondencyjnyInput = document.getElementById("adresKorespondencyjnyInput");
  
    if (adresCheckbox.checked) {
      adresKorespondencyjnyDiv.style.display = "none"; // Ukryj pole "Adres korespondencyjny"
      adresKorespondencyjnyInput.disabled = true; // Wyłącz pole "Adres korespondencyjny"
    } else {
      adresKorespondencyjnyDiv.style.display = "block"; // Pokaż pole "Adres korespondencyjny"
      adresKorespondencyjnyInput.disabled = false; // Aktywuj pole "Adres korespondencyjny"
    }
}

function zmienPoleWojewodztwo() {
    console.log("select")
    var krajInput = document.getElementById("krajInput");
    var wojewodztwoContainer = document.getElementById("wojewodztwoContainer");
  
    if (krajInput.value === "Poland") {
      wojewodztwoContainer.innerHTML = '<select id="wojewodztwoInput" onchange="aktywujAdresZamieszkania()">  <option value="">Wybierz województwo</option><option value="dolnoslaskie">Dolnośląskie</option><option value="kujawsko-pomorskie">Kujawsko-Pomorskie</option><option value="lubelskie">Lubelskie</option><option value="lubuskie">Lubuskie</option><option value="lodzkie">Łódzkie</option><option value="malopolskie">Małopolskie</option><option value="mazowieckie">Mazowieckie</option><option value="opolskie">Opolskie</option><option value="podkarpackie">Podkarpackie</option><option value="podlaskie">Podlaskie</option><option value="pomorskie">Pomorskie</option><option value="slaskie">Śląskie</option><option value="swietokrzyskie">Świętokrzyskie</option><option value="warminsko-mazurskie">Warmińsko-Mazurskie</option><option value="wielkopolskie">Wielkopolskie</option><option value="zachodniopomorskie">Zachodniopomorskie</option></select>';
    } else {
      wojewodztwoContainer.innerHTML = '<input type="text" id="wojewodztwoInput" placeholder="Województwo">';
    }
}

function aktywujAdresZamieszkania() {
    var wojewodztwoInput = document.getElementById("wojewodztwoInput");
    var adresZamieszkaniaInput = document.getElementById("adresZamieszkaniaInput");
  
    if (wojewodztwoInput.value !== "") {
      adresZamieszkaniaInput.disabled = false;
    } else {
      adresZamieszkaniaInput.disabled = true;
    }
  }
  