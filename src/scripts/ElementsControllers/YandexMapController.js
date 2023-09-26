const takeControlYandexMap = () => {
	if (document.getElementById('yandex-map') !== null) {
		function init() {
			let map = new ymaps.Map('yandex-map', {
				center: [54.714235, 56.001262],
				zoom: 16
			});
			let placemark = new ymaps.Placemark([54.714235, 56.001262], {}, {
				iconLayout: 'default#image',
				iconImageHref: './files/icons/map-mark.svg',
				iconImageSize: [60, 70],
				iconImageOffset: [-30, -60]
			});
			map.geoObjects.add(placemark);
			map.options.set('scrollZoom', 2);
		}
		ymaps.ready(init);
	}
};

export default takeControlYandexMap;

