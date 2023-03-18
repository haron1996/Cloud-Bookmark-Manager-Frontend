import { hideLoadingToss } from "./hideLoadingToss"

let el: HTMLDivElement | null

export function showLoadingToss() {
    el = document.getElementById('loading_toss') as HTMLDivElement | null

    if (el === null) return

    el.style.bottom = '0'

    setTimeout(() => {
        hideLoadingToss()
    }, 6000);
}