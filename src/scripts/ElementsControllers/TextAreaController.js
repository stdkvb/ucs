import DefaultInputController from "./DefaultInputController.js";

class TextAreaController extends DefaultInputController {
	constructor(container, options = {}) {
		super(container, options)

		if (!container) {
			return
		}

		this._label = container.querySelector('label.input__label')

		const textarea = container.querySelector('textarea')
		if (!textarea) {
			return
		}

		this._input = textarea
		this.isValid = !textarea.required

		this._initListeners()
	}
}

export default TextAreaController