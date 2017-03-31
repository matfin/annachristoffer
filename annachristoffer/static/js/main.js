((window) => {

	let f = () => {
		console.log('JS can load and is ready. Wait for it!!');

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('This promise has resolved with this message.');
			}, 2000);
		});
	};

	window.onload = (() => {
		f().then((message) => {
			console.log({
				message: message
			});
		});
	});

})(window);