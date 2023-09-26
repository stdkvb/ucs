import Pristine from './Pristine'
// import preloaderOnload from './PreloaderController'

const successfully = document.getElementById('successfully')

const takeControlForms = () => {

	const callRequestForm = document.querySelector('.call-request');		
	if (callRequestForm !== null) {
		const callRequestValidator = new Pristine(callRequestForm);
		callRequestForm.addEventListener('submit', function (e) {
			if (callRequestValidator.validate() == true) {
				document.body.classList.add('_lock');
									
				// setTimeout(function () {
				// 	successfully.classList.add('_open');
				// }, 1000);
			} else {
				e.preventDefault();
			}
		});
	}

	const feedbackForm = document.querySelector('.feedback');	
	if (feedbackForm !== null) {
		const feedbackValidator = new Pristine(feedbackForm);
		feedbackForm.addEventListener('submit', function (e) {
			if (feedbackValidator.validate() == true) { 
				document.body.classList.add('_lock');
				document.querySelector('#popup-feedback').classList.remove('_open');
					
				// setTimeout(function () {
				// 	successfully.classList.add('_open');
				// }, 1000);
			} else {
				e.preventDefault();
			}
		});
	}
}

export default takeControlForms
