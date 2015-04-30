jQuery uberSelect
=================

Customize only your select inputs and keep the native user interface for options.

You don't need extra stuff to add events or add/remove options in your select
elements, simply you do it in the standar way.

This plugin is inspired on [SelectSkin](http://carlosroberto.name/jquery-selectskin/), but lighter.

How to use
====

1.- Include jQuery and jQuery.uberSelect scripts in your page
----

    <script src="//code.jquery.com/jquery-2.1.0.min.js"></script>
    <script src="uberselect.js"></script>

Or do it with npm
----

    npm install uberselect --save
    
It's browserify compatible!


2.- You only need two styles rules
----

`.uberselect`  
This element represent the entire control, usually you add a `background-image`, `border`, etc.

`.uberselect > span`  
This element is to display the text of the selected option, usually you add here text styles like `font-size`, `font-weight`, `text-overflow` etc.

3.- Activate uberSelect, just call the method:
----

    $('#myselect').uberSelect();

Or you may define the class name to use:

    $('#myselect').uberSelect({className: 'custom-uberselect'});

Also, the plugin automatically starts on all select elements with `data-uberselect` attribute.

    <select name="country" data-uberselect="<class-name>">...</select>

Where `<class-name>` is the name of the CSS class you want to use.

That's All.

Feel free to use issues system to report bugs or something.
