import isEmail from 'validator/es/lib/isEmail.js'
import DefaultInputController from './DefaultInputController.js'

class EmailInputController extends DefaultInputController {
	constructor(container, options = {}) {
		super(container, { ...options, inputType: 'email' })
	}

	checkValidation() {
		super.checkValidation()
		this.isValid = this.isValid && isEmail(this._input.value)
	}
}

export default EmailInputController