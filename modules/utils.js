function fixHeader(dom) {
    var arr = [
        '/treeview_files/jquery-1.4.3.min.js',
        'alter-navigation.js'
    ];
    for(var i=0; i<arr.length; i++) {
        var script = dom.window.document.createElement('script');
        script.type = "text/javascript";
        //script.charset = "UTF-8";
        script.src = arr[i];
        dom.window.document.getElementsByTagName('head')[0].appendChild(script);
    }
    return dom;
}

exports.fixHeader = fixHeader;
