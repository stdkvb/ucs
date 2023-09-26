function addPopupCloseListener(popupClose) {
	document.addEventListener('click', (e) => {
		if (e.target.classList.contains('popup__close')) {
			popupClose(e.target.closest('.popup'))
		}
	})
}

export default addPopupCloseListener
