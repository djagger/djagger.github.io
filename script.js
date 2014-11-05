;
(function ($) {

	$(document).ready(function () { 

		$('.gallery a').click(function(e){
			e.preventDefault();
			var imageLink = $(this).attr("href");
			var slideNum = $('.gallery a').index(this);

			if ($('#popup').length > 0) {        
				// Если popup уже есть 
				$('#popup').fadeIn(300);

			} else {
				var lightbox = 
					'<div id="popup" >' +
						'<p title="close" id="closeSign">X</p>' +
						'<div class="nav">' +
							'<a class="prev slideNav" title="Preview" id="lightboxPrev"><</a>' +
							'<a class="next slideNav" title="Next" id="lightboxNext">></a>' +
						'</div>' +
					'</div>';

				$('body').append(lightbox);

				var imgNum=1;
				$('html').find('.gallery a').each(function() {
					var galleryImgLinks = $(this).attr('href');
					var gallertImgAlts = $(this).children().attr('alt');
					$('#popup').append('<div class="imgWrap"><span>' + gallertImgAlts + '</span><img src="' + galleryImgLinks + '" alt="' + gallertImgAlts + '"><span id="counterImg">' + imgNum + '</span></div>');
					imgNum++;
				});

				// Сколько у нас слайдов?
				size = $('#popup .imgWrap').length;
			
				$('#overlay').show();
				$('#popup .imgWrap').hide();

				//console.log('Номер слайда ' + slideNum);
				//debugger;
				$('#popup .imgWrap:eq(' + slideNum + ')').show();
				
				current = slideNum;
				//console.log('Текущий слайд current ' + current);
			}
		})

		//Закрываем popup
		$('body').on('click', '#closeSign', function() { 
			closePopup();
		});

		//Закрываем popup на esc
		$(document).keyup(function(e) {
			if (e.keyCode == 27) {
				closePopup();
			}
		});
		
		// Навигация prev/next
		$('body').on('click', '.slideNav', function(e) {
			
			e.preventDefault();
			e.stopPropagation();
				
			var clickOn = $(this);
			var dest;

			if (clickOn.hasClass('prev')) {
				dest = current - 1;
				
				console.log(dest);
				
				//debugger
				if (dest < 0) {
					dest = size - 1;
				}
			
			} else {
				dest = current + 1;
								
				if (dest > size - 1) {
					dest = 0;
				}
			}
			
			console.log('Текущий слайд меняем NAV current ' + current);
			console.log('Текущий слайд меняем NAV dest ' + dest);
			// fadeOut curent slide, FadeIn next/prev slide
			$('#popup .imgWrap:eq(' + current + ')').fadeOut(200);

			$('#popup .imgWrap:eq(' + dest + ')').fadeIn(200);
				
			current = dest;
			console.log('Текущий слайд после NAV current ' + current);
		});

		function closePopup() {
			$('#popup').remove();
			$('#overlay').hide();
		}

		function changeImg(current, dest){
			$('#popup .imgWrap:eq(' + current + ')').fadeOut();
			$('#popup .imgWrap:eq(' + dest + ')').fadeIn();
		}

		//Навигация стрелками клавиатуры
		$(document.documentElement).keyup(function (event) {
			if (event.keyCode == 37 ) {
				dest = current - 1;
				if (dest < 0) {
					dest = size - 1;
				}
				changeImg(current, dest);
				current = dest;	
			} else if (event.keyCode == 39) {
				dest = current + 1;
				if (dest > size - 1) {
					dest = 0;
				}
				changeImg(current, dest);
				current = dest;	  
			}

		});

	});

})($);