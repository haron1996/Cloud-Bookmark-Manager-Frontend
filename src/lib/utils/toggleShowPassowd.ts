let el: HTMLInputElement | null

export function toggleShowPassword() {
    el = document.getElementById('password') as HTMLInputElement | null;

    if (el === null) return;

    const element = el.nextElementSibling?.firstElementChild;

    if (element === null || element === undefined) return;

    if (el.type === 'password') {
        el.type = 'text';

        el.classList.add('show_password');

        element.classList.add('password_visible');
    } else {
        el.type = 'password';

        el.classList.remove('show_password');

        element.classList.remove('password_visible');
    }
}