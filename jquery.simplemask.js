/**
 * EXAMPLE USAGE
 *
$(function() {
    $('#test_input').simpleMask('aa-#9', {
        allow_periods   : true,
        allow_commas    : true,
        allow_dashes    : true
    });
});
 */

$.fn.extend({
    simpleMask  : function(mask_string, custom_config) {
        var config = $.extend({
                allow_periods   : true,
                allow_commas    : true,
                allow_dashes    : true
            }, custom_config || {}),
            mask_length = mask_string.length,
            regex_map = {
                '#' : /[a-z0-9\s]/i,
                'a' : /[a-z]/i,
                '9' : /[\d]/i
            }

        $(this).keydown(function(event) {
            if(event.keyCode == 8) // ALLOW BACKSPACING
                return true;

            if(event.keyCode >= 37 && event.keyCode <= 40) // ALLOW ARROW KEYS
                return true;

            var mask_character = mask_string[$(this).val().length];

            // Prevent characters that exceed the mask
            if(typeof mask_character == 'undefined')
                return false;

            // Do we have a regex mapping for the current character in the mask string?
            if(!regex_map[mask_character])
                $(this).val($(this).val() + mask_character);

            if($(this).val().length >= mask_length)
                return false;

            if(config.allow_commas && event.keyCode == 188) // ALLOW COMMA
                return true;

            if(config.allow_dashes && event.keyCode == 189) // ALLOW DASHES
                return true;

            if(config.allow_periods && event.keyCode == 190) // ALLOW PERIOD
                return true;

            if(regex_map[mask_character] && String.fromCharCode(event.keyCode).match(regex_map[mask_character]))
                return true;

            // Any other character returns false
            return false;
        }).keyup(function() {
            var processed_string = '',
                inbound_value = $(this).val();

            for(var i in inbound_value) {
                if(regex_map[mask_string[i]]) {
                    if(inbound_value[i].match(regex_map[mask_string[i]]))
                        processed_string += inbound_value[i];
                } else {
                    processed_string += mask_string[i];
                }
            }

            $(this).val(processed_string);
        });
    }
});