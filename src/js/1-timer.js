import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector("button[data-start]");
const inputEl = document.querySelector('input[type="text"]');

const timerRefs = {
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("span[data-seconds]"),
};

let selectedDate = null;
let timerInterval = null;
let toastConfig = {
    messageColor: '#FFFFF0',
    backgroundColor: '#FF4500',
    position: 'topRight',
    progressBar: false,
    close: false,
};

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = new Date().getTime();
        if (selectedDates[0] < currentDate) {
            showErrorToast("Please choose a date in the future");
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
            selectedDate = selectedDates[0];
        }
    }
};

flatpickr('input[type="text"]', options);

startBtn.addEventListener("click", () => {
    if (!selectedDate) {
        showErrorToast("Please select a date first");
        return;
    }

    startTimer();
});

function startTimer() {
    startBtn.disabled = true;
    inputEl.disabled = true;

    const currentDate = new Date().getTime();
    let timeDifference = selectedDate - currentDate;

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeDifference -= 1000;

        if (timeDifference <= 0) {
            clearInterval(timerInterval);
            iziToast.success({
                message: "Timer has ended",
                ...toastConfig,
            });
            startBtn.disabled = false;
            inputEl.disabled = false; 
            return;
        }

        const timeLeft = convertMs(timeDifference);
        updateTimer(timeLeft);
    }, 1000);
}

function updateTimer(timeLeft) {
    timerRefs.days.textContent = addLeadingZero(timeLeft.days);
    timerRefs.hours.textContent = addLeadingZero(timeLeft.hours);
    timerRefs.minutes.textContent = addLeadingZero(timeLeft.minutes);
    timerRefs.seconds.textContent = addLeadingZero(timeLeft.seconds);
}

function addLeadingZero(value) {
    return value < 10 ? "0" + value : value;
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function showErrorToast(message) {
    iziToast.error({
        message: message,
        ...toastConfig,
    });
}

