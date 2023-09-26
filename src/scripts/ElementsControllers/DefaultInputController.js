import EventObserver from '../../utilsScripts/EventObserver.js'

class DefaultInputController {
	isActive = false

	_observer = new EventObserver()

	constructor(container, options = {}) {
		this._options = options
		this._observer.subscribe(this._toggleFieldContainerErrorState.bind(this))
		this._observer.subscribe(this._setLabelNotClickable.bind(this))

		if (!container) {
			return
		}

		this._container = container
		this._label = container.querySelector('label.input__label')

		const input = container.querySelector(`input[type=${options.inputType || 'text'}]`)

		if (!input) {
			return
		}

		this._input = input
		this.isValid = !input.required

		this._initListeners()
	}

	_initListeners () {
		this._input.addEventListener('input', () => {
			this.checkValidation()
			this._observer.broadcast()
		})
		this._input.addEventListener('focus', () => {
			this.isActive = true
			this._observer.broadcast()
		})
		this._input.addEventListener('blur', () => {
			this.isActive = false
			this._observer.broadcast()
		})
	}

	checkValidation() {
		this.isValid = this._valueIsEmpty()
	}

	triggerError() {
		this._toggleFieldContainerErrorState()
	}

	_valueIsEmpty() {
		return !!this._input.value.trim()
	}

	clearField () {
		this._input.value = ''
		this.isValid = !this._input.required
		this._container.classList.remove(this._options.invalidStateClassName)
		this._container.classList.remove(this._options.validStateClassName)
	}

	_setLabelNotClickable() {
		if (!this._label) {
			return
		}

		this._label.style.pointerEvents = this.isActive ? 'none' : null
	}

	_toggleFieldContainerErrorState() {
		if (this.isActive) {
			this._container.classList.remove(this._options.invalidStateClassName)
			this._container.classList.remove(this._options.validStateClassName)

			return
		}

		if (this.isValid) {
			this._container.classList.remove(this._options.invalidStateClassName)
			this._container.classList.add(this._options.validStateClassName)

			return
		}

		this._container.classList.remove(this._options.validStateClassName)
		this._container.classList.add(this._options.invalidStateClassName)
	}
}

export default DefaultInputController
