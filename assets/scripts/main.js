const setupSliders = () => {
	let nodes = document.querySelectorAll('.slider');
	nodes.forEach((node) => {
		new Slider().setup(node);
	});
};

const toggleMenu = (which) => {
	const 	nav 	= document.querySelector('nav'),
			icon 	= document.querySelector('i');

	if(nav.classList.toggle('revealed')) {
		icon.classList.remove('fa-bars');
		icon.classList.add('fa-times');
	}
	else {
		icon.classList.remove('fa-times');
		icon.classList.add('fa-bars');
	}

	console.log({
		interaction: which
	});
};

const menuButton = () => {
	const button = document.querySelector('button');
	if('onpointerdown' in window) {
		button.addEventListener('pointerdown', toggleMenu);
	}
	else if('ontouchstart' in window) {
		button.addEventListener('touchstart', toggleMenu);
	}
	else {
		button.addEventListener('click', toggleMenu);
	}
};

onload = () => {
	setupSliders();
	menuButton();
	console.log('Loaded again!');
};