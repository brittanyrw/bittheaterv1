$(function() {
	
	if($(".datepicker").length){
		$( ".datepicker" ).datepicker();
	}

	$('.fa-bars').click(function(){
		$('.navigation-links').toggle(500);
	});

	var showItemCount = 1;

	$('.additional-shows-button').click(function(){
		showItemCount ++;
		var showItemName = "showID_" +showItemCount;
		var showItemDateName = "showDate_" +showItemCount;
		var showItemNoteName = "showNotes_" +showItemCount;
		console.log(showItemCount);
		console.log(showItemName);
		var el = $(".show-item:first").clone();
		$(el).find('.show-title').attr("name",showItemName);
		$(el).find('.show-item-datepicker').attr("name",showItemDateName);
		$(el).find('.show-item-notes').attr("name",showItemNoteName);
		$('.show-form-section').append(el);
	});

	function validateReviewForm() {
    var x = document.forms["reviewForm"]["showId"].value;
    if (x == "") {
        alert("You must choose a show from the list below.");
        return false;
    	}
	}
	
});

