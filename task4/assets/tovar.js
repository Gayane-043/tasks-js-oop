class Card {
  constructor(id, name, provider, src, desc) {
    this.id = id;
    this.name = name;
    this.provider = provider;
    this.src = src;
    this.desc = desc;
  }
}

async function loadCards() {
  try {
    const res = await fetch('http://localhost:3000/items');

    if (!res.ok) {
      console.log('error fetching cards');
      return;
    }

    const cards = await res.json();

    for (let i = 0; i < cards.length; ++i) {
      const divCard = document.createElement('div');
      divCard.id = `card${i}`;
      divCard.setAttribute('class', 'card');
      document.getElementsByClassName('list')[0].appendChild(divCard);

      const divCardContent = document.createElement('div');
      divCardContent.id = `cardContent${i}`;
      divCardContent.setAttribute('class', 'card__content flex__column-start');
      document.getElementById(`card${i}`).appendChild(divCardContent);

      const divCardSubtitle = document.createElement('div');
      divCardSubtitle.id = `cardSubtitle${i}`;
      divCardSubtitle.setAttribute(
        'class',
        'card__subtitle flex__space-between'
      );
      document.getElementById(`cardContent${i}`).appendChild(divCardSubtitle);

      const divCardId = document.createElement('span');
      divCardId.id = `cardId${i}`;
      divCardId.textContent = `ID: ${cards[i].id}`;
      document.getElementById(`cardSubtitle${i}`).appendChild(divCardId);

      const divCardEdit = document.createElement('a');
      divCardEdit.id = `cardEdit${cards[i].id}`;
      divCardEdit.textContent = 'Изменить';
      divCardEdit.type = 'edit';
      divCardEdit.addEventListener('click', onOpenEditForm);
      document.getElementById(`cardSubtitle${i}`).appendChild(divCardEdit);

      const divCardSubcontent = document.createElement('div');
      divCardSubcontent.id = `cardSubcontent${i}`;
      divCardSubcontent.setAttribute('class', 'card__subcontent flex__start');
      document.getElementById(`cardContent${i}`).appendChild(divCardSubcontent);

      const divCardImg = document.createElement('img');
      divCardImg.id = `cardImg${i}`;
      divCardImg.src = `${cards[i].src}`;
      divCardImg.alt = `${cards[i].name}`;
      document.getElementById(`cardSubcontent${i}`).appendChild(divCardImg);

      const divCardName = document.createElement('span');
      divCardName.id = `cardName${i}`;
      divCardName.textContent = cards[i].name;
      divCardName.setAttribute('class', 'card__name');
      document.getElementById(`cardSubcontent${i}`).appendChild(divCardName);

      const divCardProvider = document.createElement('span');
      divCardProvider.id = `cardDesc${i}`;
      divCardProvider.textContent = `Поставщик: ${cards[i].provider}`;
      divCardProvider.setAttribute('class', 'card__provider');
      document.getElementById(`cardContent${i}`).appendChild(divCardProvider);

      const divCardDesc = document.createElement('span');
      divCardDesc.id = `cardDesc${i}`;
      divCardDesc.textContent = `Описание: ${cards[i].desc}`;
      divCardDesc.setAttribute('class', 'card__desc');
      document.getElementById(`cardContent${i}`).appendChild(divCardDesc);
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const res = await fetch('http://localhost:3000/profile');

    if (!res.ok) {
      console.log('Error fetching profile info');
      return;
    }

    const {name, group} = await res.json();

    document.querySelector('#name').innerHTML = `${name} ${group}`;

    document.querySelector('#spine').style.display = 'none';
  } catch (error) {
    console.log(error);
  }
}

async function addCard() {
  let id = document.getElementsByName('idCreate')[0].value;
  let name = document.getElementsByName('nameCreate')[0].value;
  let provider = document.getElementsByName('providerCreate')[0].value;
  let src = document.getElementsByName('srcCreate')[0].value;
  let desc = document.getElementsByName('descCreate')[0].value;

  try {
    const res = await fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        name,
        provider,
        src,
        desc,
      }),
    });

    if (!res.ok) {
      console.log('Error creating card');
      return;
    }

    closeForm('createForm');
    location.reload();
  } catch (error) {
    console.log(error);
  }
}

async function onOpenEditForm(event) {
  try {
    const id = event.target.id.substring(8);
    const res = await fetch('http://localhost:3000/items/' + id);

    if (!res.ok) {
      console.log('error fetching card data');
      return;
    }
    const card = await res.json();

    document.getElementsByName('idEdit')[0].value = card.id;
    document.getElementsByName('nameEdit')[0].value = card.name;
    document.getElementsByName('providerEdit')[0].value = card.provider;
    document.getElementsByName('srcEdit')[0].value = card.src;
    document.getElementsByName('descEdit')[0].value = card.desc;
    document.getElementById('edit-btn').idx = id;
    document.getElementById('delete-btn').idx = id;
    openForm('editForm');
  } catch (error) {
    console.log(error);
  }
}

async function editCard(event) {
  const id = document.getElementsByName('idEdit')[0].value;
  const name = document.getElementsByName('nameEdit')[0].value;
  const provider = document.getElementsByName('providerEdit')[0].value;
  const src = document.getElementsByName('srcEdit')[0].value;
  const desc = document.getElementsByName('descEdit')[0].value;

  try {
    const res = await fetch('http://localhost:3000/items/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        name,
        provider,
        src,
        desc,
      }),
    });

    if (!res.ok) {
      console.log('error updating card');
      return;
    }

    closeForm('editForm');
    location.reload();
  } catch (error) {
    console.log(error);
  }
}

async function deleteCard(event) {
  try {
    const res = await fetch('http://localhost:3000/items/' + event.target.idx, {
      method: 'DELETE',
    });

    if (!res.ok) {
      console.log('error deleting card');
      return;
    }

    closeForm('editForm');
    location.reload();
  } catch (error) {
    console.log(error);
  }
}

window.onload = loadCards;