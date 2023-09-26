const cookieIsAcceptedStatusStorageKey = 'COOKIE_IS_ACCEPTED'

class CookieController {
	constructor(cookieContainerSelector, cookieAcceptButtonSelector) {
		const cookieContainerElement = document.querySelector(cookieContainerSelector)
		const cookieAcceptButtonElements = cookieContainerElement.querySelectorAll(cookieAcceptButtonSelector)

		this._cookieContainer = cookieContainerElement

		const cookieIsAccepted = this._checkCookieIsAccepted()

		if (!cookieIsAccepted) {
			this._showCookieContainer()
		}

		cookieAcceptButtonElements.forEach(cookieAcceptButtonElement => {

			cookieAcceptButtonElement.addEventListener('click', event => {
				this._setCookieIsAccepted()
				this._hideCookieContainer()
			});
		 
		 });
	}

	_checkCookieIsAccepted = () => {
		return localStorage.getItem(cookieIsAcceptedStatusStorageKey)
	}

	_setCookieIsAccepted = () => {
		localStorage.setItem(cookieIsAcceptedStatusStorageKey, true)
	}

	_hideCookieContainer() {
		this._cookieContainer.classList.remove('_showing')
	}

	_showCookieContainer() {
		this._cookieContainer.classList.add('_showing')
	}
}

const takeControlCookie = (cookieContainerSelector, cookieAcceptButtonSelector) => {
	new CookieController(cookieContainerSelector, cookieAcceptButtonSelector)
}

export default takeControlCookie
