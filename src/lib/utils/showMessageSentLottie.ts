import { messageSent } from '../../stores/stores';

export const showMessageSentLottie = () => {
	messageSent.set(true);

	setTimeout(() => {
		messageSent.set(false);
	}, 2200);
};
