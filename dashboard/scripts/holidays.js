const fetchHolidays = async () => {
    const date = new Date()
    const holidays = await fetch(`https://calendarific.com/api/v2/holidays?api_key=kneqZZm2ltBeTmp2KfIFGlCeY33QjSmR&country=de&year=2023&day=${ date.getDate() }&month=${ date.getMonth() + 1 }`)
    const data = (await holidays.json()).response
    return data.holidays
}

export const createHolidayWidget = async () => {
    const format = new Intl.DateTimeFormat('de-DE')
    const holidays = await fetchHolidays();

    const widget = document.createElement('div');
    widget.classList.add('widget-holidays');

    const title = document.createElement('h2');
    title.classList.add('widget-holidays__title');
    title.appendChild(document.createTextNode(`Feiertage - ${ format.format(new Date()) }`));
    widget.appendChild(title);

    if (holidays.length === 0) {
        const item = document.createElement('p');
        item.classList.add('widget-holidays__item');
        item.appendChild(document.createTextNode('Keine Feiertage'));
        widget.appendChild(item);
        return widget;
    }

    const list = document.createElement('ul');
    list.classList.add('widget-holidays__list');
    holidays.forEach(holiday => {
        const item = document.createElement('li');
        item.classList.add('widget-holidays__item');
        item.appendChild(document.createTextNode(holiday.name));
        list.appendChild(item);
    })
    widget.appendChild(list);
    return widget;
}
