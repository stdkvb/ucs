import takeControlYandexMap from './ElementsControllers/YandexMapController'
import preloaderOnload from './ElementsControllers/PreloaderController'
import CounterItemController from './ElementsControllers/CounterItemController'
import takeControlMenu from './ElementsControllers/MenuController'
import takeControlForms from './ElementsControllers/FormController'
import CookieController from './ElementsControllers/CookieController'
import addPhoneMaskListeners from './listeners/addPhoneMaskListeners'
import addPopupCloseListener from './listeners/addPopupCloseListener'
import addFileNameListeners from './listeners/addFileNameListener'

addPhoneMaskListeners()
addPopupCloseListener(popupClose)
takeControlMenu()
takeControlForms()
takeControlYandexMap()
CookieController('.cookie-container', '.cookie-accept')
addFileNameListeners()

document.body.classList.add('_lock')
window.onload = () => {
	preloaderOnload()
	const options = { threshold: [0.1] }
	const observer = new IntersectionObserver(onEntry, options)
	const elements = document.querySelectorAll('.element-animation')

	setTimeout(function () {
		for (const elm of elements) {
			observer.observe(elm)
		}
	}, 800)
}

/* Код ниже для возвращения исходной высоты мобильному меню (100vh)
после ресайза экрана */

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`)
// We listen to the resize event
window.addEventListener('resize', () => {
	// We execute the same script as before
	let vh = window.innerHeight * 0.01
	document.documentElement.style.setProperty('--vh', `${vh}px`)

	// if (document.body.classList.contains('_lock')) {
	// 	document.body.classList.remove('_lock')
	// } else {
	// 	document.body.classList.add('_lock')
	// }
})

// page load animation
function onEntry(entry) {
	let i = 1
	entry.forEach((change) => {
		if (change.isIntersecting) {
			setTimeout(function () {
				change.target.classList.add('element-show')
			}, 400 * i)
			i++
		}
	})
}

// Counter
new CounterItemController({
	countersElementsWrapperSelector: '.numbers',
	counterElementSelector: '.numbers__item',
	counterNumElementSelector: '.value',
	calcAnimationDelay: 4000,
	clearHoverDelay: 100
})

// Header's link
const headerMenu = document.querySelector('.header__menu')
const headerLinks = document.querySelectorAll('.header__link')
for (let index = 0; index < headerLinks.length; index++) {
	headerLinks[index].addEventListener('click', function (e) {
		bodyUnlock()
		menu.classList.remove('_active')
	})
}

// Modal
const popupLinks = document.querySelectorAll('.popup-link')

const body = document.querySelector('body')

let unlock = true
const timeout = 400 // Равна времени в transition
let pageHash = document.location.hash

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index]

		if (pageHash) {
			const popupNameOnload = pageHash.replace('#', '')
			const currentPopupOnload = document.getElementById(popupNameOnload)
			if (currentPopupOnload.classList.contains('product')) {
				window.setTimeout(function () {
					popupOpen(currentPopupOnload)
				}, 1100)
			}
		}

		popupLink.addEventListener('click', function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '')
			const currentPopup = document.getElementById(popupName)
			popupOpen(currentPopup)
			if (!popupLink.classList.contains('products__item')) {
				e.preventDefault()
			}
		})
	}
}

function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		const popupActive = document.querySelector('.popup._open')
		const productActive = document.querySelector('.product._open')
		if (productActive && productActive !== currentPopup) {
			productActive.classList.add('_none')
		}
		bodyLock()
		currentPopup.classList.add('_open')
		currentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'))
			}
		})
	}
}

function popupClose(popupActive, doUnlock = true) {
	const popupNone = document.querySelector('.product._none')
	if (unlock) {
		popupActive.classList.remove('_open')
		if (headerMenu.classList.contains('_active')) {
			bodyLock()
		} else if (popupNone) {
			popupNone.classList.remove('_none')
			bodyLock()
		} else if (headerMenu.classList.contains('_active')) {
			bodyLock()
		} else if (doUnlock) {
			bodyUnlock()
		}
		if (popupActive.classList.contains('product')) {
			history.pushState('', document.title, window.location.pathname)
		}
	}
}

function bodyLock() {
	body.classList.add('_lock')

	unlock = false
	setTimeout(function () {
		unlock = true
	}, timeout)
}

function bodyUnlock() {
	setTimeout(function () {
		body.classList.remove('_lock')
	}, timeout)

	unlock = false
	setTimeout(function () {
		unlock = true
	}, timeout)
}

;(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this
			while (node) {
				if (node.matches(css)) return node
				else node = node.parentElement
			}
			return null
		}
	}
})()
;(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches =
			Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector
	}
})()

// управление строкой поиска на мобилке
document.querySelector('.header__link_search').addEventListener('click', () => {
	document.querySelector('.header__search-form').classList.add('active');
	document.getElementById('burger-btn').classList.remove('active');
})
document.addEventListener('click', (e) => {
	if (!e.target.closest('.header__link_search') && !e.target.closest('#search-form') && document.querySelector('.header__search-form').classList.contains('active')) {
		document.querySelector('.header__search-form').classList.remove('active');
		
	}	
})

