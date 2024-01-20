function openLinkDependingOnUserAgent() {
        var userAgent = window.navigator.userAgent;
        var safariVersion = /Version\/([\d.]+)/.exec(userAgent);
        
        var linkToOpen = 'http://www.zombo.com'; 

        if (safariVersion) {
            var versionNumber = parseInt(safariVersion[1]);
            console.log('Safari version: ' + versionNumber);

            if (versionNumber <= 4) {
                linkToOpen = 'http://www.pudim.com.br';
            }
        }

        openInNewTab(linkToOpen);
}

function openInNewTab(url) {
    var newTab = window.open(url, '_blank');
    if (newTab) {
        newTab.focus();
    } else {
        console.error('Failed to open the link in a new tab');
        window.location.href = url;
    }
}
