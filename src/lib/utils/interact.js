import interact from 'interactjs';

interact('.folder').draggable({
	listeners: {
		start(event) {
			console.log(event.type, event.target);
		},
		move(event) {
			console.log(event);
		}
	}
});
