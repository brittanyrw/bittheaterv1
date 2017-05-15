$(function() {
	
	if($('.datepicker').length){
		$( '.datepicker' ).datepicker();
	}

	$('.fa-bars').click(function(){
		$('.navigation-links').toggle(500);
	});

	$('select').select2();

	var showItemCount = 1;


	$('.additional-shows-button').click(function(){
		$('select').select2('destroy');
		showItemCount ++;
		var showItemName = 'showID_' +showItemCount;
		var showItemDateName = 'showDate_' +showItemCount;
		var showItemNoteName = 'showNotes_' +showItemCount;
		var el = $('.show-item:first').clone();
		$(el).find('.show-title').attr("name",showItemName);
		$(el).find('.show-item-datepicker').attr('name',showItemDateName);
		$(el).find('.show-item-notes').attr('name',showItemNoteName);
		$(el).find('.datepicker').removeAttr('class').datepicker();
		$('.show-form-section').append(el);
		$('select').select2();
		$('.select2, .select2-container, .select2-container--default, .select2-container--below').css('width', '100%');
		});

	function validateReviewForm() {
    var x = document.forms['reviewForm']['showId'].value;
    if (x == "") {
        alert('You must choose a show from the list below.');
        return false;
    	}
	}
	
});

