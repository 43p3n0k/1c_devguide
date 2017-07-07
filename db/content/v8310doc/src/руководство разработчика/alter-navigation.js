$(document).ready(function() {

    var chapters = {
        "введение.htm": "toc_104_",
        "глава 1. концепция системы.htm": "toc_105_",
        "глава 2. работа с конфигурацией.htm": "toc_106_",
        "глава 3. интерфейс приложения.htm": "toc_107_",
        "глава 4. встроенный язык.htm": "toc_108_",
        "глава 5. объекты конфигурации.htm": "toc_109_",
        "глава 6. командный интерфейс.htm": "toc_110_",
        "глава 7. формы.htm": "toc_111_",
        "глава 8. работа с запросами.htm": "toc_112_",
        "глава 9. работа с данными.htm": "toc_113_",
        "глава 10. система компоновки данных.htm": "toc_114_",
        "глава 11. бухгалтерский учет.htm": "toc_115_",
        "глава 12. периодические расчеты.htm": "toc_116_",
        "глава 13. бизнес-процессы и задачи.htm": "toc_117_",
        "глава 14. анализ данных и прогнозирование.htm": "toc_118_",
        "глава 15. механизмы обмена данными.htm": "toc_119_",
        "глава 16. работа с различными форматами данных.htm": "toc_120_",
        "глава 17. механизмы интернет-сервисов.htm": "toc_121_",
        "глава 18. механизм заданий.htm": "toc_122_",
        "глава 19. механизм полнотекстового поиска в данных.htm": "toc_123_",
        "глава 20. механизм временного хранилища, работа с файлами и картинками.htm": "toc_124_",
        "глава 21. журнал регистрации.htm": "toc_125_",
        "глава 22. механизм криптографии.htm": "toc_126_",
        "глава 23. внешние источники данных.htm": "toc_127_",
        "глава 24. механизм разделения данных.htm": "toc_128_",
        "глава 25. разработка решений для мобильной платформы.htm": "toc_129_",
        "глава 26. система взаимодействия.htm": "toc_130_",
        "глава 27. инструменты разработки.htm": "toc_131_",
        "глава 28. отладка и тестирование прикладных решений.htm": "toc_132_",
        "глава 29. механизм сравнения и объединения конфигураций.htm": "toc_133_",
        "глава 30. групповая разработка конфигурации.htm": "toc_134_",
        "глава 31. поставка и поддержка конфигурации.htm": "toc_135_",
        "глава 32. расширение конфигурации.htm": "toc_136_",
        "глава 33. сервисные возможности.htm": "toc_137_",
        "глава 34. внешние компоненты.htm": "toc_138_",
        "глава 35. особенности разработки кроссплатформенных прикладных решений.htm": "toc_139_",

        "приложение 1. конвертация информационных баз системы «1спредприятие 7.7».htm": "toc_140_",
        "приложение 2. форматы навигационных ссылок.htm": "toc_141_",
        "приложение 3. правила формирования текстов стандартных команд и автоматических заголовков форм.htm": "toc_142_",
        "приложение 4. перечень автоматически сохраняемых настроек.htm": "toc_143_",
        "приложение 5. поисковые выражения полнотекстового поиска.htm": "toc_144_",
        "приложение 6. описание прав доступа.htm": "toc_145_",
        "приложение 7. особенности поведения системы в различных режимах.htm": "toc_146_",
        "приложение 8. особенности работы с различными субд.htm": "toc_147_",
        "приложение 9. работа с xbase.htm": "toc_148_",
        "приложение 10. особенности использования отдельных механизмов.htm": "toc_149_",
        "приложение 11. правила автоматического формирования имен элементов формы.htm": "toc_150_",
        "приложение 12. описание сущностей, предоставляемых через стандартный интерфейс odata.htm": "toc_151_",
        "приложение 13. префиксы пространств имен при json-сериализации.htm": "toc_152_"
    };
    var arr = window.location.href.split('/');
    var URI = decodeURI(arr[arr.length - 1].split('#')[0]).toLowerCase();
    var toc = chapters[URI];

    var links = document.getElementsByTagName('a');
    var bookmarks = [];

    for (var i = 0, l = links.length; i < l; i++) {
    	links[i].onclick = function (e) {
            e.preventDefault();
        };

        if(links[i].getAttribute('id')) {
            bookmarks[bookmarks.length]=links[i].getAttribute('id');
        }
    }
		
	function browseTree(elem){
		var id;
		while(true){            
			if(!elem||!elem.tagName||elem.tagName.toLowerCase() !== "a") break;
			if(elem.getAttribute('id')) {
				id = toc + elem.getAttribute('id').toLowerCase();
				//if(parent.treeframe.document.querySelector('[id=tree]'))
				//	parent.treeframe.$("#tree").dynatree("getTree").activateKey(id);
				//if(parent.treeframe.document.querySelector('[id=browser]'))
					parent.treeframe.$("#browser").expandID(id);
				break;
			}
			elem = elem.nextSibling;
		}
	}
	
	var anchor;
	
	if (~window.location.hash.indexOf('#')){
		anchor = (window.location.hash).substr(1);
		if(document.querySelector('[name='+anchor+']'))
			browseTree(document.querySelector('[name=' + anchor + ']'));
		if(document.querySelector('[id='+anchor+']'))
			browseTree(document.querySelector('[id=' + anchor + ']'));
	}
	
	window.onclick = function(event){
		
		if(!event) event = window.event;		
		var target = event.target || event.srcElement;
		
		if(target.tagName.search(/a/i) === -1) return;
		// ignore 'copy_source' link
		if(target.href.match(/^javascript:$/))return;

		var start = (target.href).lastIndexOf('/');
		var end = (target.href).indexOf('?');
		
		if(end === -1){
			if((target.href).indexOf('#') === -1){
			    if(~target.href.indexOf('/db/')&&!~target.href.indexOf('/руководство разработчика/')){
                    var idx = target.href.indexOf('/db/');
                    window.open('http://its.1c.ru'+target.href.substr(idx));return;
                }
				window.open(target.href);return;
            }
			anchor = (target.href).split('#')[1];
            browseTree(document.querySelector('[name='+anchor+']'));
			
			var elem = $('a[name='+ anchor+']');
			if(elem.length) {
				$('html, body').animate({ scrollTop: elem.offset().top }, 900);
			}
				
			return;
            //window.location.href = target.href;
		}
		
		var href = decodeURI((target.href).substring(start+1,end));
		anchor = (target.href).split('#')[1];
		window.location.href = href+'#'+anchor;
	};

    function wheel() {
        var id;
        var posTop = 
            window.pageYOffset ?
                window.pageYOffset :
                (document.documentElement || document.body.parentNode || document.body).scrollTop;
        //var posTop = (document.documentElement || document.body).scrollTop;
		for(var i=bookmarks.length-1; i>-1; i--){
            var distance = document.getElementById(bookmarks[i]).offsetTop;
            if(distance<=posTop){
                id = toc + bookmarks[i].toLowerCase();
                parent.treeframe.$("#browser").expandID(id,450);
                return;
			}
		}
		if(bookmarks.length){
			id = toc + bookmarks[0].toLowerCase();
            parent.treeframe.$("#browser").expandID(id,450);
        }
    }

    var timerId;
    window.onscroll = function() {
    	if(timerId)clearTimeout(timerId);
        timerId = setTimeout(wheel, 150);
    };
});