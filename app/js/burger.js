(function() {
	document.querySelector('.page-header__burger-button').addEventListener('click', function() {
		document.querySelector('.page-header__burger-button').style.display = 'none';
		document.querySelector('.page-header__list').style.display = 'block';
		document.querySelector('.page-header__close-button').style.display = 'block';
	});

	document.querySelector('.page-header__close-button').addEventListener('click', function() {
		document.querySelector('.page-header__burger-button').style.display = 'block';
		document.querySelector('.page-header__list').style.display = 'none';
		document.querySelector('.page-header__close-button').style.display = 'none';
	}); 

})();