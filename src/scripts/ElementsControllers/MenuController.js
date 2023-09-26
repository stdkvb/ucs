const takeControlMenu = () => {
	const burgerBtn = document.getElementById('burger-btn')
	const menu = document.getElementById('menu')
	const header = document.querySelector('.header')

	if (burgerBtn) {
		burgerBtn.addEventListener('click', () => {
			if (!menu.classList.contains('_active')) {
				menu.classList.add('_active')
				burgerBtn.classList.add('active')
				header.style.overflow = "visible"
			} else {
				menu.classList.remove('_active')
				burgerBtn.classList.remove('active')
				header.style.overflow = "hidden"
			}	
	
			if (document.body.classList.contains('_lock')) {
				document.body.classList.remove('_lock')
			} else {
				document.body.classList.add('_lock')
			}		
		})
	}
}

export default takeControlMenu