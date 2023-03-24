import { hideSuccessNotification } from "./hideSuccessNotification"

let el: HTMLDivElement | null

export function showSuccessNotification() {
    el = document.getElementById('success_notification') as HTMLDivElement | null

    if (el === null) return

    el.style.display = 'flex'

    el.style.opacity = '1'

    setTimeout(() => {
        hideSuccessNotification()
    }, 6000);
}