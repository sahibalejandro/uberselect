jQuery uberSelect
=================

Customize only your select inputs and keep the native user interface for options.

You don't need extra stuff to add events or add/remove options in your select
elements, simply you do it in the standar way.

This plugin is inspired on [SelectSkin](http://carlosroberto.name/jquery-selectskin/), but lighter.

How to use
----------

###1.- Include jQuery and jQuery.uberSelect scripts in your page

    <script src="//code.jquery.com/jquery-2.1.0.min.js"></script>
    <script src="jquery.uberSelect.js"></script>

*You can use jQuery since version 1.8*

###2.- You only need two styles rules

`.uberselect`  
This element represent the entire control, usually you add a `background-image`, `border`, etc.

`.uberselect > div`  
This element is to display the text of the selected option, usually you add here text styles like `font-size`, `font-weight`, etc.

*Open **index.html** file to see an example of CSS!*

###3.- Activate uberSelect, just call the method:

    $('#myselect').uberSelect();

That's All.

Feel free to use issues system to report bugs or something.
