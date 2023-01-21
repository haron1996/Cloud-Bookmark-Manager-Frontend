import { createMode } from '../../stores/stores';

export function SwitchOffCreateMode() {
	createMode.set(false);
}
