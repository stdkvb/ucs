import DefaultInputController from './DefaultInputController.js'

class CheckboxInputController extends DefaultInputController {
	constructor(container, options = {}) {
		super(container, { invalidStateClassName: 'checkbox_invalid', ...options, inputType: 'checkbox' })
		this._initialChecked = this._input.checked
	}

	checkValidation() {
		this.isValid = !this._input.required || this._input.checked
	}

	// clearField() {
	// 	this._input.checked = this._initialChecked
	// 	this.isValid = !this._input.required || this._input.checked
	// }
}

export default CheckboxInputController