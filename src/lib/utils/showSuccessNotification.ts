import { hideSuccessNotification } from "./hideSuccessNotification"

let el: HTMLDivElement | null

export function showSuccessNotification() {
    el = document.getElementById('success_notification') as HTMLDivElement | null

    if (el === null) return

    el.style.bottom = '0'

    setTimeout(() => {
        hideSuccessNotification()
    }, 6000);
}