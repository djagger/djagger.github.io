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
							'<a class="next slideNav" title="Next;" id="lightboxNext">></a>' +
						'</div>' +
					'</div>';

				$('body').append(lightbox);

				$('html').find('.gallery a').each(function() {
					var galleryImgLinks = $(this).attr('href');
					$('#popup').append('<img src="' + galleryImgLinks + '">');
				});

				// Сколько у нас слайдов?
				size = $('#popup img').length;
				console.log('size ' + size);
			
				$('#popup img').hide();

				//console.log('Номер слайда ' + slideNum);
				//debugger;
				$('#popup img:eq(' + slideNum + ')').show();
				
				current = slideNum;
				//console.log('Текущий слайд current ' + current);
			}
		})

		//Закрываем popup
		$('body').on('click', '#closeSign', function() { 
			$('#popup').remove();
		});

		//Закрываем popup на esc
		$(document).keyup(function(e) {
			if (e.keyCode == 27) {
				$('#popup').remove();
			}
		});

		//console.log(current);

		/*$('body').on({mouseenter: function() { 
				$('.nav').fadeIn(300);
			}, mouseleave: function() {
				$('.nav').fadeOut(300);   
			} 
		},'#popup');*/
		
		// Навигация prev/next
		$('body').on('click', '.slideNav', function(e) {
			
			e.preventDefault();
			e.stopPropagation();
				
			var clickOn = $(this);
			var dest;
			//console.log('NAV clickOn '+clickOn.hasClass('next'));

			if (clickOn.hasClass('prev')) {
				dest = current - 1;
				
				console.log(dest);
				
				//debugger
				if (dest < 0) {
					dest = size - 1;
				}
			
			} else {
				dest = current + 1;
				
				console.log(dest);
				
				if (dest > size - 1) {
					dest = 0;
				}
			}
			
			//console.log('Текущий слайд меняем NAV current ' + current);
			//console.log('Текущий слайд меняем NAV dest ' + dest);
			// fadeOut curent slide, FadeIn next/prev slide
			$('#popup img:eq(' + current + ')').fadeOut(200);

			$('#popup img:eq(' + dest + ')').fadeIn(200);
				
			// update current slide
			current = dest;
			//console.log('Текущий слайд после NAV current ' + current);
		});

		function changeImg(current, dest){
			// fadeOut curent slide, FadeIn next/prev slide
			$('#popup img:eq(' + current + ')').fadeOut();
			$('#popup img:eq(' + dest + ')').fadeIn();
		}

	});

})($);