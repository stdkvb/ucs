import isMobilePhone from 'validator/es/lib/isMobilePhone.js'
import DefaultInputController from './DefaultInputController.js'

class PhoneInputController extends DefaultInputController {
	constructor(container, options = {}) {
		super(container, { ...options, inputType: 'tel' })

		if (!container) {
			return
		}

		const input = container.querySelector('input[type=tel]')
		input.addEventListener('input', () => {
			this._setMainValue()
			this._setRepresentativeValue()
			this.checkValidation()
		})

		this._mainInput = container.querySelector('input[type=hidden]')

		this._prevValue = this._input.value
	}

	checkValidation() {
		super.checkValidation()

		this.isValid = this.isValid && isMobilePhone(this._mainInput.value, 'ru-RU')
	}

	clearField() {
		super.clearField();

		this._mainInput.value = ''
		this._prevValue = ''
	}

	_setMainValue() {
		let { value } = this._input
		if (this._prevValue.includes(')') && !value.includes(')') && value.includes('(')) {
			value = value.slice(0, -1)
		}

		const pureValue = value
			.split('')
			.filter((char) => /[0-9]/.test(char))
			.join('')

		const phoneExitCode = pureValue.slice(0, 1) ? '8' : ''
		const phoneServiceCode = pureValue.slice(1, 1 + 3)
		const phoneOperatorCode = pureValue.slice(4, 4 + 3)
		const phoneFirstBodyPart = pureValue.slice(7, 7 + 2)
		const phoneSecondBodyPart = pureValue.slice(9, 9 + 2)

		this._mainInput.value = `${phoneExitCode}${phoneServiceCode}${phoneOperatorCode}${phoneFirstBodyPart}${phoneSecondBodyPart}`
	}

	_setRepresentativeValue() {
		const value = this._parsePhoneFromMainValue()
		this._input.value = value
		this._prevValue = value
	}

	_parsePhoneFromMainValue() {
		const { value } = this._mainInput

		const phoneExitCode = value.slice(0, 1) ? '+7' : ''

		let phoneServiceCode = value.slice(1, 1 + 3)
		if (phoneServiceCode.length) {
			phoneServiceCode = ` (${phoneServiceCode}`
			phoneServiceCode += phoneServiceCode.length === 5 ? ')' : ''
		}

		let phoneOperatorCode = value.slice(4, 4 + 3)
		if (phoneOperatorCode.length) {
			phoneOperatorCode = ` ${phoneOperatorCode}`
		}

		let phoneFirstBodyPart = value.slice(7, 7 + 2)
		if (phoneFirstBodyPart.length) {
			phoneFirstBodyPart = `-${phoneFirstBodyPart}`
		}

		let phoneSecondBodyPart = value.slice(9, 9 + 2)
		if (phoneSecondBodyPart.length) {
			phoneSecondBodyPart = `-${phoneSecondBodyPart}`
		}

		return `${phoneExitCode}${phoneServiceCode}${phoneOperatorCode}${phoneFirstBodyPart}${phoneSecondBodyPart}`
	}
}

export default PhoneInputController