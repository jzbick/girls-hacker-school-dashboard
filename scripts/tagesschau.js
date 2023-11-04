const fetchTagesschau = async () => {
    const response = await fetch('https://www.tagesschau.de/api2/news/?regions=10')
    const data = await response.json();
    return data.news.map(article => ({
        id: article.sophoraId,
        date: article.date,
        title: article.title,
        text: article.firstSentence,
        url: article.shareURL,
        img: article.teaserImage
    }));
}

const createTagesschauHeader = (article) => {
    const header = document.createElement('div');
    header.classList.add('widget__tagesschau__header');

    const title = document.createElement('span')
    title.textContent = 'Tagesschau';
    header.appendChild(title);
    header.appendChild(document.createTextNode(new Date(article.date).toLocaleDateString('de-DE')));
    return header;
};

function createTagesschauText(article) {
    const articleTitle = document.createElement('h3');
    articleTitle.classList.add('widget__tagesschau__title');
    articleTitle.appendChild(document.createTextNode(article.title));

    const articleText = document.createElement('p');
    articleText.classList.add('widget__tagesschau__text');
    articleText.appendChild(document.createTextNode(article.text));

    const textContainer = document.createElement('div');
    textContainer.classList.add('widget__tagesschau__text-container');
    textContainer.appendChild(articleTitle);
    textContainer.appendChild(articleText);
    return textContainer;
}

const createTagesschauElement = (article) => {
    const articleContainer = document.createElement('div');
    articleContainer.classList.add('widget__tagesschau', 'widget__tagesschau__fade-in');

    const header = createTagesschauHeader(article)
    const textContainer = createTagesschauText(article);

    const articleLink = document.createElement('a');
    articleLink.classList.add('widget__tagesschau__link');
    articleLink.href = article.url;
    articleLink.appendChild(document.createTextNode('Mehr...'));

    const image = article.img
    const articleImage = document.createElement('img');
    articleImage.classList.add('widget__tagesschau__image');
    articleImage.src = image.imageVariants['1x1-256'];
    articleImage.title = image.title;
    articleImage.alt = image.alttext;

    articleContainer.appendChild(header)
    articleContainer.appendChild(textContainer);
    articleContainer.appendChild(articleImage);

    return articleContainer;
};

export const createTagesschauWidget = async () => {
    const container = document.createElement('div');
    container.id = 'widget-tagesschau';
    container.classList.add('widget');

    const articles = await fetchTagesschau()

    const getNextArticle = () => {
        const article = articles.shift();
        articles.push(article);
        return createTagesschauElement(article);
    }

    container.appendChild(getNextArticle());

    setInterval(() => {
        container.replaceChild(getNextArticle(), container.firstChild);
    }, 10000)

    return container;
}
