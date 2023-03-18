let el: HTMLDivElement | null

export function hideSuccessNotification() {
    el = document.getElementById('success_notification') as HTMLDivElement | null

    if (el === null) return

    el.style.bottom = '-100%'
}