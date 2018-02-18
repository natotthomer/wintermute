(function($){
	"use strict";
	$.fn.textTyper = function(options) {
		
		var defaults = {
			typingClass : 'typing', //Additional Class when the typing animation is running
			beforeAnimation : function(){}, //Callback before the animation starts
			afterAnimation : function(){}, //Callback after the animation ends
			speed : 0, //Speed of typing text
			nextLineDelay : 0, //Wait for some time after one line is typed.
			startsFrom : 0, //Start form the X characters
			repeatAnimation : false, //Repeat the animation
			repeatDelay : 8000, //Delay between Repeat animation
			repeatTimes : 1, //How much time you want to repeat the animation (0 means infinite)
			cursorHtml : '<span class="cursor"></span>' //Html of cursor
		},
		settings = $.extend({}, defaults, options);
		  
		this.each(function() {
			//store this in $this variable
		  	var $this = $(this),
		  	repeatInt = 1,
		  	defaultCursorClass = "typingCursor";
		  	//  Get all children if any or get current one
	        var all = $this,
	        i = all.length,
	        html = [];
	        //  Censorship, yo
		    while(i--) {
		        html[i] = ($.trim($(all[i]).html()));
		        $(all[i]).html('');
		    }

		    $this.init = function(i) {
		    	var beforeAnim = settings.beforeAnimation;
		    	if(beforeAnim) beforeAnim();
		    	$this.animate(0);
		    }
	        //  Go all Frankenstein and shit
		    $this.animate = function(i) {
		        var me = all[i],		        
	            add = settings.typingClass,	            
	            //  C = character delay
	            //  D = line delay
	            c = settings.startsFrom;
		        //  Censor the page
		        $(me).addClass(add);
		        var inty = setInterval(function() {
		            //  MOAR TEXTS
		            var cursorTemp = settings.cursorHtml;
		            cursorTemp = $('<div>').append($(cursorTemp).addClass(defaultCursorClass)).html();
		            /*if(settings.cursorEffect == 'blink'){
		            	cursorTemp = $(cursorTemp).css('text-decoration','blink');
		            	//Create a Gohost div to get the current html
		            	cursorTemp = $('<div>').append($(cursorTemp).clone()).html();
		            }*/
		            $(me).html(html[i].substr(0, c) + cursorTemp);

		            //  What's the best programming language in the world?
		            //  Not this one.
		            c++;
		            
		            if(html[i].length < c) {
		                clearInterval(inty);
		                i++;
		                
		                if(all[i]) {
		                    setTimeout(function() {
		                        $(me).html(html[i - 1]);
		                        $this.animate(i);
		                    }, settings.nextLineDelay);
		                }else{
		                	$(me).find('.'+defaultCursorClass).remove();
		    				if(settings.repeatAnimation && (settings.repeatTimes == 0 || repeatInt < settings.repeatTimes)){
		    					setTimeout(function(){
		    						$this.animate(0);
		    						repeatInt++;
		    					}, settings.repeatDelay);
		    				} else{
		    					var afterAnim = settings.afterAnimation;
		    					if(afterAnim) afterAnim();
		    				}           	
		                }
		            }
		        }, settings.speed);
		    };
		    $this.init();
		});
		  // returns the jQuery object to allow for chainability.
		return this;
	}
})(jQuery)


// Let's do it!!
$(document).ready(function() {

  $('input[type="text"]').focus();
  $('#end').addClass('open');
  $('#end').textTyper({
        speed: 0,
        afterAnimation:function(){
          $('.command').fadeIn();
          $('input[type="text"]').focus();
          $('input[type="text"]').val('');
        }
      });

// get array of section ids, that exist in DOM
var sectionArray = [];
// We are using <section> here, you can use <div> or <article> if you want
$('section').each( function(i,e) {
    //you can use e.id instead of $(e).attr('id')
    sectionArray.push($(e).attr('id'));
});

// Debug
//console.log(sectionArray);



// Command Input------------------------------

  $('input[type="text"]').keyup(function(e){

    if(e.which == 13){// ENTER key pressed


      var destination = $('input[type="text"]').val();

      // Display section with id == destination and hide all others
      $('section[id="' + destination + '"]').addClass('open').siblings().removeClass('open');

      // If destination does not match our array of section ids, display error section
      if($.inArray(destination, sectionArray) == -1){
        $('#error').addClass('open');
        $('#error').siblings().removeClass('open');
      }

      // All sections with class .open init textTyper
      $('.open').textTyper({
        speed:1,
        afterAnimation:function(){
          $('.command').fadeIn();
          $('input[type="text"]').focus();
          $('input[type="text"]').val('');
        }
      });

    }// end if ENTER key pressed

  });// end keyup function

// End Command Input-----------------------------

});