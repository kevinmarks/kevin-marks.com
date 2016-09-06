
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
                    el.addClass("verified").append('<svg xmlns="http://www.w3.org/2000/svg" width="1em" style="vertical-align:text-bottom" viewbox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="green" stroke="lightgreen" stroke-width="3"/><path d="M 10,20 18,28 33,14" fill="none" stroke="white" stroke-width="6"/></svg>');
                } else {
                    el.addClass("unverified").append('<svg xmlns="http://www.w3.org/2000/svg" width="1em" style="vertical-align:text-bottom"  viewbox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="darkred" stroke="red" stroke-width="3"/><path d="M 10,10 30,30 M 10,30 30,10" fill="none" stroke="white" stroke-width="6"/></svg>');
                }
            }).fail(function(xhr) {
                console.log('HTTP request failed:', xhr);
            });
        }
    });
}($));
