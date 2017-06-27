const setupSliders = () => {
	let nodes = document.querySelectorAll('.slider');
	nodes.forEach((node) => {
		new Slider().setup(node);
	});
};

const toggleMenu = () => {
	const 	nav 	= document.querySelector('nav'),
			icon 	= document.querySelector('i');

	if(nav.classList.toggle('revealed')) {
		icon.classList.remove('fa-bars');
		icon.classList.add('fa-times');
		document.body.classList.add('scroll-disabled');
	}
	else {
		icon.classList.remove('fa-times');
		icon.classList.add('fa-bars');
		document.body.classList.remove('scroll-disabled');
	}
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
	menuButton();
	console.log('This proved that Docker compose is working.');
};