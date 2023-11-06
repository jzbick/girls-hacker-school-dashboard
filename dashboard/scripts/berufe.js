export const createBerufeliste = async (suchwoerter) => {
    const berufe = await fetchBerufe(suchwoerter, 0);

    const ul = document.createElement('ul');
    ul.classList.add('widget-berufe__berufliste__list');

    berufe.slice(0, 5).forEach(beruf => {
        const li = document.createElement('li');
        li.classList.add('widget-berufe__berufliste__list__item');
        li.innerText = beruf.kurzBezeichnungNeutral;
        li.addEventListener('click', async () => {
            await setDialogContent(beruf.id)
            const dialog = document.getElementById('widget-berufe__dialog')
            if (!dialog.open) {
                dialog.showModal();
            }
        })
        ul.appendChild(li);
    })
    return ul
}

const fetchBerufe = async (suchwoerter, page) => {
    const response = await fetch(`https://rest.arbeitsagentur.de/infosysbub/bnet/pc/v1/berufe?suchwoerter=${ suchwoerter ?? '' }&page=${ page }`, {
        headers: {
            'X-API-Key': 'd672172b-f3ef-4746-b659-227c39d95acf'
        }
    });
    const data = await response.json();
    return data._embedded.berufSucheList;
}

export const initBerufeEventListeners = () => {
    const searchInput = document.getElementById('widget-berufe__suche');
    const list = document.getElementById('widget-berufe__berufliste');
    searchInput.addEventListener('input', async (event) => {
        const berufe = await createBerufeliste(event.target.value);
        list.replaceChild(berufe, list.children[0])
    })

    const closeButton = document.getElementById('widget-berufe__dialog__close');
    closeButton.addEventListener('click', () => {
        const dialog = document.getElementById('widget-berufe__dialog')
        if (dialog.open) {
            dialog.close();
        }
    })
}


export const fetchBerufById = async (berufId) => {
    const response = await fetch(`https://rest.arbeitsagentur.de/infosysbub/bnet/pc/v1/berufe/${ berufId }`, {
        headers: {
            'X-API-Key': 'd672172b-f3ef-4746-b659-227c39d95acf'
        }
    });
    const data = (await response.json())[0];
    return {
        name: data.kurzBezeichnungNeutral,
        aufgaben: data.infofelder[0].content,
    };
}

const setDialogContent = async (id) => {
    const beruf = await fetchBerufById(id);
    const dialog = document.getElementById('widget-berufe__dialog__content');
    dialog.innerHTML = `
        <div>
            <h3>${ beruf.name }</h3>
            <div class="widget-berufe__details">${ beruf.aufgaben }</div>
        </div>
    `
}
