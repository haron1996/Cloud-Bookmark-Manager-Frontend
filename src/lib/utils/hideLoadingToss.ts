let el: HTMLDivElement | null

export function hideLoadingToss() {
    el = document.getElementById('loading_toss') as HTMLDivElement | null

    if (el === null) return

    el.style.bottom = '-100%'
}