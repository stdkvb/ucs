class CounterItemController {
	_calcAnimationIsStarted = false

	constructor(options = {}) {
		this._options = options
		const counterElementsWrapper = document.querySelector(options.countersElementsWrapperSelector)

		if (!counterElementsWrapper) return

		const calcAnimationObserver = new IntersectionObserver((counterEntryItems) => {
			if (this._calcAnimationIsStarted) {
				return
			}

			counterEntryItems.forEach((counterEntryItem) => {
				const { isIntersecting, target: counterElementsWrapper } = counterEntryItem

				if (!isIntersecting) {
					return
				}

				const counterElements = counterElementsWrapper.querySelectorAll(options.counterElementSelector)
				counterElements.forEach((counterElement) => this._runCalcAnimation(counterElement))
			})
		})

		calcAnimationObserver.observe(counterElementsWrapper)
	}

	_runCalcAnimation(counterItemElement) {
		this._calcAnimationIsStarted = true
		const { counterNumElementSelector } = this._options

		const counterNumElement = counterItemElement.querySelector(counterNumElementSelector)


		this._calcNumForAnimation(0, {
			finishedValue: +this._parseCounterNum(counterNumElement.textContent),
			counterNumElement
		})
	}

	_parseCounterNum(num) {
		return num
			.split('')
			.filter((char) => /[0-9.]/.test(char))
			.join('')
	}

	_encodeCounterNum(num) {
		return num
		const numReversedParts = []
		const numCharsReversedList = `${num}`.split('').reverse()

		while (numCharsReversedList.length) {
			numReversedParts.push(numCharsReversedList.splice(0, 3).reverse().join(''))
		}

		return numReversedParts.reverse().join('\u00A0')
	}

	_calcNumForAnimation(fromValue = 0, options) {
		const { finishedValue, counterNumElement } = options

		function divideNumberByPieces(x, delimiter) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter || " ");
		}

		if (Math.round(fromValue) > finishedValue) {
			counterNumElement.textContent = this._encodeCounterNum(divideNumberByPieces(finishedValue))
			return
		}

		counterNumElement.textContent = this._encodeCounterNum(Math.round(fromValue))

		const delay = 100

		setTimeout(
			this._calcNumForAnimation.bind(
				this,
				fromValue + finishedValue / (this._options.calcAnimationDelay / delay),
				options
			),
			delay
		)

		document.querySelectorAll('.value').forEach((elem) => {
			elem.innerHTML = divideNumberByPieces(elem.innerHTML);
		})
	}
}

export default CounterItemController
