class Card {
    constructor(id, name, provider, src, desc) {
        this.id = id;
        this.name = name;
        this.provider = provider;
        this.src = src;
        this.desc = desc;
    }
}


function loadCards() {
    let cards = JSON.parse(window.localStorage.getItem("cards"));

    if (cards === null)
        return;

    for (let i = 0; i < cards.length; ++i) {
        const divCard = document.createElement("div");
        divCard.id = `card${i}`;
        divCard.setAttribute('class', "card");
        document.getElementsByClassName("cards-list")[0].appendChild(divCard);

        const divCardContent = document.createElement("div");
        divCardContent.id = `cardContent${i}`;
        divCardContent.setAttribute('class', "card__content flex__column-start");
        document.getElementById(`card${i}`).appendChild(divCardContent);


        const divCardSubtitle = document.createElement("div");
        divCardSubtitle.id = `cardSubtitle${i}`;
        divCardSubtitle.setAttribute('class', "card__subtitle flex__space-between");
        document.getElementById(`cardContent${i}`).appendChild(divCardSubtitle);

        const divCardId = document.createElement("span");
        divCardId.id = `cardId${i}`;
        divCardId.textContent = `ID: ${cards[i].id}`;
        document.getElementById(`cardSubtitle${i}`).appendChild(divCardId);

        const divCardEdit = document.createElement("a");
        divCardEdit.id = `cardEdit${i}`;
        divCardEdit.textContent = "Изменить";
        divCardEdit.type = "edit";
        divCardEdit.addEventListener('click', onOpenEditForm);
        document.getElementById(`cardSubtitle${i}`).appendChild(divCardEdit);


        const divCardSubcontent = document.createElement("div");
        divCardSubcontent.id = `cardSubcontent${i}`;
        divCardSubcontent.setAttribute('class', "card__subcontent flex__start");
        document.getElementById(`cardContent${i}`).appendChild(divCardSubcontent);

        const divCardImg = document.createElement("img");
        divCardImg.id = `cardImg${i}`;
        divCardImg.src = `${cards[i].src}`;
        divCardImg.alt = `${cards[i].name}`;
        document.getElementById(`cardSubcontent${i}`).appendChild(divCardImg);

        const divCardName = document.createElement("span");
        divCardName.id = `cardName${i}`;
        divCardName.textContent = cards[i].name;
        divCardName.setAttribute('class', "card__name");
        document.getElementById(`cardSubcontent${i}`).appendChild(divCardName);

        const divCardProvider = document.createElement("span");
        divCardProvider.id = `cardDesc${i}`;
        divCardProvider.textContent = `Поставщик: ${cards[i].provider}`;
        divCardProvider.setAttribute('class', "card__provider");
        document.getElementById(`cardContent${i}`).appendChild(divCardProvider);

        const divCardDesc = document.createElement("span");
        divCardDesc.id = `cardDesc${i}`;
        divCardDesc.textContent = `Описание: ${cards[i].desc}`;
        divCardDesc.setAttribute('class', "card__desc");
        document.getElementById(`cardContent${i}`).appendChild(divCardDesc);
    }
}


function setupCards() {
    let dataArray = [
        new Card(1, "Гитара", "Музыкант", "https://w7.pngwing.com/pngs/878/764/png-transparent-brown-acoustic-guitar-acoustic-electric-guitar-takamine-guitars-acoustic-guitar-dreadnought-acoustic-guitar-pickup-guitar-accessory-cuatro-thumbnail.png", "Акустическая гитара"),
        new Card(2, "Барабан", "Музыка", "https://w7.pngwing.com/pngs/322/265/png-transparent-drums-drum-product-drum-music-download-thumbnail.png", "Барабанная установка"),
        new Card(3, "Скрипка", "Композитор", "https://w7.pngwing.com/pngs/968/725/png-transparent-violin-fiddle-bow-violin-double-bass-music-download-string-instrument-thumbnail.png", "Струнные инструменты"),
        new Card(4, "Арфа", "Классика", "https://w7.pngwing.com/pngs/171/529/png-transparent-musical-instrument-string-instrument-harp-piano-harp-violin-orchestra-musical-instruments-thumbnail.png", "Красивый инструмент"),
        new Card(5, "Кларнет", "Мелодия", "https://w7.pngwing.com/pngs/424/512/png-transparent-clarinet-woodwind-instrument-musical-instruments-saxophone-musical-instruments-saxophone-piccolo-family-thumbnail.png", "Кларнет как у Сквидварда"),
        new Card(6, "Треугольник", "Критик", "https://w7.pngwing.com/pngs/101/442/png-transparent-musical-triangles-latin-percussion-musical-instruments-drums-musical-instruments-angle-triangle-musician-thumbnail.png", "Музыкальный треугольник"),
        new Card(7, "Труба", "Ваше спасение", "https://w7.pngwing.com/pngs/461/964/png-transparent-trumpet-musical-instruments-musical-theatre-music-store-trompeta-brass-instrument-musician-orchestra-thumbnail.png", "Духовой инструмент"),
        new Card(8, "Флейта", "Нота", "https://w7.pngwing.com/pngs/63/637/png-transparent-western-concert-flute-musical-instruments-woodwind-instrument-clarinet-flute-saxophone-piccolo-bamboo-musical-instruments-thumbnail.png", "Музыкальный инструмент"),
    ];
    updateLocalStorage(dataArray);
    location.reload();
}


function addCard() {
    let cards = JSON.parse(window.localStorage.getItem("cards"));

    if (cards === null) {
        cards = [];
    }

    let id = document.getElementsByName('idCreate')[0].value;
    let name = document.getElementsByName('nameCreate')[0].value;
    let provider = document.getElementsByName('providerCreate')[0].value;
    let src = document.getElementsByName('srcCreate')[0].value;
    let desc = document.getElementsByName('descCreate')[0].value;

    if (id === "" || provider === "" || name === "" || src === "") {
        closeForm('createForm');
        return;
    }
    let card = new Card(id,
        name,
        provider,
        src,
        desc);

    cards.push(card);

    updateLocalStorage(cards);

    closeForm('createForm');
    location.reload();
}


function onOpenEditForm(event) {
    let id = event.target.id.substring(8);
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    let card = cards.at(id);
    document.getElementsByName('idEdit')[0].value = card.id;
    document.getElementsByName('nameEdit')[0].value = card.name;
    document.getElementsByName('providerEdit')[0].value = card.provider;
    document.getElementsByName('srcEdit')[0].value = card.src;
    document.getElementsByName('descEdit')[0].value = card.desc;
    document.getElementById("edit-btn").idx = id;
    document.getElementById("delete-btn").idx = id;
    openForm('editForm');
}


function editCard(event) {
    let cards = JSON.parse(window.localStorage.getItem("cards"));

    cards[event.target.idx].id = document.getElementsByName('idEdit')[0].value;
    cards[event.target.idx].name = document.getElementsByName('nameEdit')[0].value;
    cards[event.target.idx].provider = document.getElementsByName('providerEdit')[0].value;
    cards[event.target.idx].src = document.getElementsByName('srcEdit')[0].value;
    cards[event.target.idx].desc = document.getElementsByName('descEdit')[0].value;

    updateLocalStorage(cards);

    closeForm('editForm');
    location.reload();
}


function deleteCard(event) {
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    cards.splice(event.target.idx, 1);

    updateLocalStorage(cards);

    closeForm('editForm');
    location.reload();
}


function updateLocalStorage(cards) {
    window.localStorage.clear();
    window.localStorage.setItem('cards', JSON.stringify(cards));
}


const setupBtn = document.getElementById('setup-btn');
setupBtn.addEventListener('click', setupCards);

window.onload = loadCards;