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

	//.on is also triggered for elements added after the dom finished loading
	$("input").on('keyup', update);
	$("input, select").on('change', update);

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

function update() {
	$('#preview, #finish').slideDown('slow');

	var id = $(this).attr('id');

	if ( id ) {
		var liveinput = id.replace('config', 'display');
		$('#' + liveinput).html( $(this).val() );
	}

	livesurr();
}
