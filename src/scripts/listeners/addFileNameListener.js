const addFileNameListeners = () => {
	const inputFilesContainer = document.querySelectorAll('.input__container_file')

	if (inputFilesContainer != null) {
		inputFilesContainer.forEach((elem) => {
			const inputFile = elem.querySelector('input')
			const inputButton = elem.querySelector('.file-button')

			inputFile.addEventListener('change', () => {
				inputButton.innerText = inputFile.files[0].name
				inputButton.classList.remove('file-button_placeholder')
			})
		})
	}
	
}

export default addFileNameListeners