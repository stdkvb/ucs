function handleMask(event) {
	const phoneNumberInput = event.target
	let digits = phoneNumberInput.value.replace(/\D/g, '')

	if (event.keyCode === 8 && digits.length > 0) {
		digits = digits.slice(0, -1)
	}

	if (event.keyCode === 46 && digits.length < 11) {
		digits += phoneNumberInput.value.charAt(digits.length)
	}

	if (digits.length <= 10) {
		let maskedNumber = '+7 (' + digits.slice(1, 4)

		if (digits.length > 4) {
			maskedNumber += ') ' + digits.slice(4, 7)
		}
		if (digits.length > 7) {
			maskedNumber += ' ' + digits.slice(7, 9)
		}
		if (digits.length > 9) {
			maskedNumber += '-' + digits.slice(9)
		}
		phoneNumberInput.value = maskedNumber
	} else event.preventDefault()
}

function addPhoneMaskListeners() {
	document.addEventListener('input', (e) => {
		if (e.target.hasAttribute('type') && e.target.getAttribute('type') === 'tel') {
			handleMask(e)
		}
	})
	document.addEventListener('keydown', (e) => {
		if (e.target.hasAttribute('type') && e.target.getAttribute('type') === 'tel') {
			handleMask(e)
		}
	})
}

export default addPhoneMaskListeners
