export const initClock = () => {
    const clockDate = document.getElementById('widget-clock__date');
    clockDate.innerText = new Date().toLocaleDateString();


    const clockTime = document.getElementById('widget-clock__time');
    clockTime.innerText = getTime();

    setInterval(() => {
        clockTime.innerText = getTime();
    }, 1000);
}

const getTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${ hours }:${ minutes }:${ seconds }`;
}
