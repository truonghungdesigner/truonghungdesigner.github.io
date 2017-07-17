$.noConflict();
jQuery(document).ready(function() {
    jQuery('[data-toggle="offcanvas"]').click(function() {
        jQuery('#side-menu').toggleClass('hidden-xs')
    });
});