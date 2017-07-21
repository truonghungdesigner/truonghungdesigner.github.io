$.noConflict();
jQuery(document).ready(function() {
    jQuery('[data-toggle="offcanvas"]').click(function() {
        jQuery('#side-menu').toggleClass('hidden-xs')
    });

    var config = {
        '.chosen-select': {},
        '.chosen-select-deselect': { allow_single_deselect: true },
        '.chosen-select-no-single': { disable_search_threshold: 10 },
        '.chosen-select-no-result': { no_results_text: '0ops, nothing found!' },
        '.chosen-select-width': { width: "95%" }
    }
    for (var selector in config) {
        jQuery(selector).chosen(config[selector]);
    };

    jQuery('.summernote').summernote({
        height: 200
    });
});