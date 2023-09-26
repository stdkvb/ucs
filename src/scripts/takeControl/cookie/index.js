import CookieController from '../../ElementsControllers/CookieController.js'

const takeControlCookie = (cookieContainerSelector, cookieAcceptButtonSelector) => {
	new CookieController(cookieContainerSelector, cookieAcceptButtonSelector)
}

export default takeControlCookie
