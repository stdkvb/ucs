function preloader(_success) {
	const preloader = document.querySelector('.preloader');
	const percent = document.querySelector('.preloader__value');
	const img = document.querySelector('.preloader__images_loaded');
	document.body.classList.remove('loaded')
	preloader.classList.remove('_loaded');
	img.classList.remove('_active');
	document.body.classList.add('_lock');
	var w = 0,
			t = setTimeout(function() {
				document.body.classList.add('loaded');
				preloader.classList.add('_loaded');
				img.classList.add('_active');
				document.body.classList.remove('_lock');
		}, 1500);
}

export default preloader