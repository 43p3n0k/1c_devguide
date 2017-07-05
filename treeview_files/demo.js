$(document).ready(function(){
	
	$("#browser")
		.treeview(
			{
				collapsed: true,
				animated: "medium",
				control:"#treecontrol",
				persist: "location"
				//toggle: function() {
				//	window.console && console.log("%o was toggled", this);
				//}
			}
		)
		.find('a').bind('click',
			function(e) {
				e.preventDefault();
				$('.selected').removeClass('selected');
				$(this).addClass('selected');
				//scrolling baseframe
				//parent.postMessage('msg', '*');
				var href = $(this).attr('href').split('#')[0];
				var arr = parent.basefrm.location.href.split('/');
				var URI = decodeURI(arr[arr.length-1].split('#')[0]);
				//console.log(URI+'  '+href);
				if(URI.toLowerCase()!==href.toLowerCase()){
					window.open($(this).attr('href'),'basefrm');
				}else{
					var anchor = $(this).attr('href').split('#')[1];
					var context = parent.basefrm.document;
					var elem = $('#' + anchor,context);
					if(elem&&elem.length) {					
						$('html, body',context).animate({ scrollTop: elem.offset().top }, 900);
					}
				}
			}
		);

});