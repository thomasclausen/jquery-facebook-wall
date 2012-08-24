# Description

jQuery plugin that lets you show the latest updates from your facebook profile og page.

# Examples

Currently no examples...

# Usage

Download it, upload it and activate it!

Insert the following code to activate the pluign:

    (function($) {
        $(document).ready(function(){
            $('#facebook_wall').facebook_wall({
                id: 'your_id',
                access_token: 'your_access_token',
                limit: 10
            });
        });
    })(jQuery);

options:

    id: '' - insert your profile og fanpage id
    access_token: '' - insert your acces token
    type: feed | posts | events - will eventually support more of these posibilities: http://developers.facebook.com/docs/reference/api/
    limit: 10 - any amount from 1-15
    locale: 'da_DK' - your contry code
    date_format: 'U' - 
    avatar_size: 'square' - choices: 'square', 'small', 'normal' or 'large'
    message_length: 200 - the length of the message
    show_guestentries: true - choices: 'true' or 'false'
    show_comments: true - choices: 'true' or 'false'

For the "type" parameter you have the following options:
"feed" - displays all your public entries - including guest entries
"posts" - displays only your own all public entries - not guest entries
"events" - displays all your public entries

# Get your fanpage id

If your fanpage URL looks like ex. [http://www.facebook.com/redbull](http://www.facebook.com/redbull), you just replace 'www' with 'graph' and you will get the id amongst other informations.

If your fanpage URL looks like ex. [http://www.facebook.com/pages/redbull/14226545351](http://www.facebook.com/pages/redbull/14226545351), the number at the end of the URL is the id.

# Get your profile id

If your profile URL looks like ex. [http://www.facebook.com/thomasclausen.dk](http://www.facebook.com/thomasclausen.dk), you just replace 'www' with 'graph' and you will get the id amongst other informations.

If your profile URL looks like ex. [http://www.facebook.com/profile.php?id=565874665](http://www.facebook.com/profile.php?id=565874665), the number at the end of the URL is the id.

# Get your acces token

Read the documentation from facebook: [http://developers.facebook.com/docs/authentication/](http://developers.facebook.com/docs/authentication/) or this page: [http://neosmart-stream.com/facebook-2/how-to-create-a-facebook-access-token](http://neosmart-stream.com/facebook-2/how-to-create-a-facebook-access-token)

# Feedback

I'm self-taught by scattering code across the web, so if you see some bad practices PLEASE contact me, so I can learn from the mistakes I'm making!

Also feel free to contact me if you have som great ideas for improvements.

# License

Credits would be nice, but feel free to use as often as you like.