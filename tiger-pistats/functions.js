function openLinkDependingOnUserAgent() {
    var userAgent = window.navigator.userAgent;
    var safariVersion = /Version\/([\d.]+)/.exec(userAgent);
    var linkToOpen = 'https://bunn.gumroad.com/l/xdpakl';

    if (safariVersion) {
        var versionNumber = parseInt(safariVersion[1]);
        console.log('Safari version: ' + versionNumber);

        if (isOldSafari()) {
            linkToOpen = 'http://bunn.dev/tiger-pistats/resources/PiStats.zip';
        }
    }

    openInNewTab(linkToOpen);
}

function isOldSafari() {
    var userAgent = window.navigator.userAgent;
    var safariVersion = /Version\/([\d.]+)/.exec(userAgent);
    if (safariVersion) {
        var versionNumber = parseInt(safariVersion[1]);
        return versionNumber <= 4;
    }
    return false; 
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
