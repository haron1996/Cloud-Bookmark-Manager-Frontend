import { showCheckMarkLottie } from '../../stores/stores';

export const MakeCheckMarkLotieVisible = () => {
	showCheckMarkLottie.set(true);

	setTimeout(() => {
		showCheckMarkLottie.set(false);
	}, 4000);
};
