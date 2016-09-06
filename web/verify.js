
// rel-me checking via indiewebify.me
(function($) {
    var results = $('a[rel~="me"]'),
        url =  window.location.href,
        canon = $("link[rel~=canonical]");
    if (canon[0]){
        url = canon[0].href;
    }
    results.each(function() {
        var relMeUrl = this.href,
            el = $(this);
        console.log(url, relMeUrl);
        // validate symmetric rels with request to /rel-me-links/
        if (relMeUrl.startsWith('http')) {
            $.ajax('http://indiewebify.me/rel-me-links/', {
                data: {url1: url, url2: relMeUrl}
            }).done(function(data) {
                if (data === 'true') {
                    el.addClass("verified");
                } else {
                    el.addClass("unverified");
                }
            }).fail(function(xhr) {
                console.log('HTTP request failed:', xhr);
            });
        }
    });
}($));
