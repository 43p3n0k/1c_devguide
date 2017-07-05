(function(window, undefined)
{
	"use strict";
	
	if(window.frameElement)
		var parent = window.frameElement.ownerDocument.defaultView || window.frameElement.ownerDocument.parentWindow;
	else
		var parent = window;
	
	window.alertDiskOnly = parent.alertDiskOnly = function()
	{
		alert('Данная возможность доступна в дисковой версии');
	};
	
	window.alertBrokenLink = parent.alertBrokenLink = function()
	{
		alert('Ошибка! Неизвестная ссылка');
	};
	
	if(!window.frameElement)
	{
		var hash = window.location.hash;
		
		if(hash !== '_print' && hash !== '#_print')
		{
			var thisLoc = window.location.pathname.split('/');
			if(thisLoc[0] === '')
				thisLoc.shift();
			var appPath = thisLoc.shift();
			var mode = thisLoc.shift();
			var dbNick = thisLoc.shift();
			var docPath = thisLoc.join('/').replace(/\?[0-9]{10}=?/, '').replace(/_+$/, '');
			
			if(hash && hash.charAt(0) === '#')
				hash = hash.substr(1);
			
			var matchReferrer = new RegExp('^https?://' + location.hostname.replace(/\./g, '\\.') + '/' + appPath + '/' + dbNick + '(?:/|$)', 'i');
			
			if(mode !== 'files' && document.referrer && !document.referrer.match(matchReferrer))
				window.location.replace('/' + appPath + '/' + dbNick + '#' + mode + ':' + docPath + '_' + (hash ? '?anchor=' + hash : ''));
		}
		else if(!document.getElementById('w_user_login_iframe'))
		{
			if(document.all)
				window.print();
			else
				window.onload = window.print;
		}
	}
	else
	{
		if(parent.document.title === 'Document Moved')
			parent.location.reload(true);
		else
		{
			var SSP = parent.SSP;
			
			if(SSP && parent.App)
			{
				if(document.getElementById('w_user_login_iframe'))
				{
					var loginWidget = SSP.Widget('w_user_login');
					var loginWrapper = loginWidget.node.parentNode;
					
					if(SSP.DOM.hasClass(loginWrapper, 'authorized'))
						parent.App.User.refresh();
				}
				
				if(location.hostname.match(/\.eu$/))
				{
					var loginLink = document.getElementById('login_link_iframe');
					
					if(loginLink)
					{
						var pathEncoded = SSP.Bus.appPath.replace(/\//g, '%2F');
						var rx = new RegExp('\\?backurl=' + pathEncoded);
						
						if(!loginLink.href.match(rx))
							loginLink.href = loginLink.href.replace(/\?backurl=%2Fdb%2F/, '?backurl=' + pathEncoded);
					}
				}
				
				setTimeout(SSP.Bus.runDeferred, 0);
			}
		}
	}
}
)(window);