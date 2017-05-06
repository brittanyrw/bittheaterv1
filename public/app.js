$(function() {

	if($(".datepicker").length){
		$( ".datepicker" ).datepicker();
	}

	$('.fa-bars').click(function(){
		$('.navigation-links').toggle(500);
	});
	
});

//validation for forms - alerts