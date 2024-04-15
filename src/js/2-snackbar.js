import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const delayInput = form.elements['delay'];
    const stateRadios = form.elements['state'];

    const delay = parseInt(delayInput.value);
    const state = stateRadios.value;

    const promise = new Promise((resolve, reject) => {
        if (state === 'fulfilled') {
            setTimeout(() => {
                resolve(delay);
            }, delay);
        } else if (state === 'rejected') {
            setTimeout(() => {
                reject(delay);
            }, delay);
        }
    });

    promise.then((delay) => {
        iziToast.success({
            title: "Success",
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: "topRight",
            close: false,
            progressBar: false,
        });
    }).catch((delay) => {
        iziToast.error({
            title: "Error",
            message: `❌ Rejected promise in ${delay}ms`,
            position: "topRight",
            close: false,
        });
    });

    form.reset();
});
