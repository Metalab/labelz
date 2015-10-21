'use strict';

// get current date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

var hasQRCode = false;

var qrcodePersonal = null;
var qrcodeFreeStyle = null;
var qrcode = null;

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
	$('#outputPersonalWithQRCode, #outputFreeStyleWithQRCode').hide(); //selects both html elements
    
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
                $('#'+livesurr+'WithQRCode').hide();
			} else {
				$('#'+livesurr).show();
                $('#'+livesurr+'WithQRCode').show();                
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

        if(type.indexOf('WithQRCode') == -1) {
            hasQRCode = false;
		    var config = type.replace('choose', 'config');
		    var print = type.replace('choose', 'output');
        } else {
            hasQRCode = true;
            var originalType = type.replace('WithQRCode', '');
            var config = originalType.replace('choose', 'config');
		    var print = type.replace('choose', 'output');

            if(qrcodePersonal == null) {
                qrcodePersonal = new QRCode("displayPersonalQRCode", {
                    text: "Your text goes here...",
                    width: 75,
                    height: 75,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });
            }

            if(qrcodeFreeStyle == null) {
                qrcodeFreeStyle = new QRCode("displayFreeStyleQRCode", {
                    text: "Your text goes here...",
                    width: 75,
                    height: 75,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });
            }

            if(type.indexOf("Personal") > -1) {
                qrcode = qrcodePersonal;
            }

            if(type.indexOf("FreeStyle") > -1) {
                qrcode = qrcodeFreeStyle;
            }
        }

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
        
		$('#' + liveinput + 'WithQRCode').html( $(this).val() );
        $('#' + liveinput).html( $(this).val() );
        
        if ( hasQRCode ) {
            if(liveinput.indexOf("Personal") > -1) {
                var url = $('#outputPersonalWithQRCode #displayPersonalUrlWithQRCode').text();
                console.log(url);
                qrcode.makeCode(url);
            }

            if(liveinput.indexOf("FreeStyle") > -1) {
                qrcode.makeCode($(this).val());
            }
        }
	}
    
	livesurr();
}
