
removableByeContent = [];

function byeBoxHideOverflow(){
	$(removableByeContent[0]).closest('.bye-box-content-container').addClass('box-hide-overflow');
}

function removeByeContent(){
		del = $(removableByeContent.shift());
		del.closest('.bye-box-container').addClass('emptying');
		$(window).trigger('by-box-emptying');
		del.closest('.bye-box-container').css({'min-width':"0px",'min-height':'0px','height':'','width':''}).addClass('emptied').removeClass('emptying');
		del.closest('.bye-box-container').removeClass('bye-box-leave');
		if(typeof(del.attr('data-next-content')) === "undefined"){
			del.addClass('empty').empty();
			$(window).trigger('by-box-emptied');
		}else{
			fillByeBox(
			del.closest('.bye-box-container'),
			del.attr('data-next-content')
			);
		}
}

function fillByeBox(selector, content){
	$(selector).find('.bye-box-content').html(content);
	$(selector).trigger('byeboxfill');
}

$(document).on('byeboxfill','.bye-box-container', function(){
	$(this).removeClass('emptied');
	$(this).find('.bye-box-content').removeClass('empty');
});

$(document).on('click','.bye-button',function(e){
	e.preventDefault();
	removableByeContent.push($(this).closest('.bye-box-content'));
	setTimeout(function(){ byeBoxHideOverflow() },550);
	setTimeout(function(){ removeByeContent() },1000);
	$(this).closest('.bye-box-container')
		.css({
			'min-height':function(){return $(this).innerHeight()},
			'min-weight':function(){return $(this).innerWidth()},
			'height':function(){return $(this).innerHeight()},
			'weight':function(){return $(this).innerWidth()}
			});
	$(this).closest('.bye-box-container').addClass('bye-box-leave');
});
