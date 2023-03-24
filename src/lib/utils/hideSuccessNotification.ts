import { successMessage } from "../../stores/stores"

let el: HTMLDivElement | null

export function hideSuccessNotification() {
    el = document.getElementById('success_notification') as HTMLDivElement | null

    if (el === null) return

    el.style.opacity = '0'
    
    el.style.display = 'none'

    successMessage.set('')
}