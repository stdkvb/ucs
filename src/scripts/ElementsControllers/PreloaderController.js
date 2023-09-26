const preloaderOnload = () => {
	document.body.classList.remove('loaded')
	document.body.classList.add('_lock')

    window.setTimeout(function () {
		document.body.classList.add('loaded')
		document.body.classList.remove('_lock')	
    }, 500);
	
}

export default preloaderOnload