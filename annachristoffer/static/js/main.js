onload = () => {
	let nodes = document.querySelectorAll('.slider');
	nodes.forEach((node) => {
		new Slider().setup(node);
	});
};