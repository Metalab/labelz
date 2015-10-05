'use strict';

// get current date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if ( dd < 10 ) {
	dd = '0' + dd;
}

if ( mm < 10 ) {
	mm = '0' + mm;
}
today = yyyy+'-'+mm+'-'+dd;

$(document).ready( function() {
	$('.currentDate').val(today);

	$('.displayDate').html(today);

	$('#preview, #finish').hide(); //selects both html elements
	$('#configFreeStyle, #outputFreeStyle').hide(); //selects both html elements

	$("#chooseType > li").on('click', chooseType);

	//.on is also triggered for elements added after the dom finished loading
	$("input, textarea").on('keyup', update);
	$("input, textarea, select").on('change', update);

	$('select').trigger('change'); //triggers the change event on page load
	livesurr();
});

// surrender text
function livesurr() {
	$('.liveinput').each( function() {
		var id = $(this).attr('id');
		if ( id ) { //if we have no idea this function would error fatally
			var livesurr = $(this).attr('id').replace('config', 'surr');

			//toggle shown or hidden state of the element 
			if ( $(this).val() == "" ) {
				$('#'+livesurr).hide();
			} else {
				$('#'+livesurr).show();
			}
		}
	});
}

function chooseType() {
	var type = $(this).attr('id');

	if ( type ) {
		//hiding all forms and print views
		$(".form, .print li").hide();

		//removing "selected" class from all choose "buttons"
		$("#chooseType > li").removeClass("typeSelected");

		var config = type.replace('choose', 'config');
		var print = type.replace('choose', 'output');

		//add "selected" class to the used "button" and unhide chosen form and print view
		$('#' + type).addClass("typeSelected");
		$('#' + config).show();
		$('#' + print).show();
	}

}

function update() {
	$('#preview, #finish').slideDown('slow');

	var id = $(this).attr('id');

	if ( id ) {
		var liveinput = id.replace('config', 'display');
		$('#' + liveinput).html( $(this).val() );
	}

	livesurr();
}