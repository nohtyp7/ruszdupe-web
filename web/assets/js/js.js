function InvalidMsg(textbox) {
    
    if (textbox.value == '') {
        textbox.setCustomValidity('To pole jest wymagane');
    }
    else if(textbox.validity.typeMismatch){
        textbox.setCustomValidity('Nieprawidłowy format danych');
    }
    else {
        textbox.setCustomValidity('');
    }
    return true;
}

function embed(){
	$("a#dodajObrazUrl").after('<input name="embedUrl" type="text" class="pole" placeholder="Podaj url">');
	$("a#dodajObrazUrl").remove();
}

function dodajDystans(){
    $('<input name="dystans[]" type="text" class="pole" placeholder="Wpisz dystans">').insertBefore('#pierwszy');
}
function dodajWpis(){
	$('input#dodaj').attr('disabled', 'true');
	$('form').submit();
	$('form').toggle();
	$('.container').append('<img id="loading" src="assets/loading-wheel.gif">');
}



var $collectionHolder;

// setup an "add a distance" link
var $addDistanceLink = $('<a class="btn" href="#">Dodaj dystans</a>');
var $newLinkLi = $('<span id="add_distance_btn"></span>').append($addDistanceLink);


jQuery(document).ready(function() {
    // Get the ul that holds the collection of Distances
    $collectionHolder = $('div#wykopbundle_training_distance');

    // add the "add a Distance" anchor and li to the distances 
    $collectionHolder.append($newLinkLi);

    // count the current form inputs we have (e.g. 2), use that as the new
    // index when inserting a new item (e.g. 2)
    $collectionHolder.data('index', $collectionHolder.find(':input').length);

    $addDistanceLink.on('click', function(e) {
        // prevent the link from creating a "#" on the URL
        e.preventDefault();

        // add a new distance element(see next code block)
        addDistanceForm($collectionHolder, $newLinkLi);
    });
});

function addDistanceForm($collectionHolder, $newLinkLi) {
    var $addDateLink = $('<a class="btn" href="#">Ustaw datę</a>').on('click', function(e) {
        // prevent the link from creating a "#" on the URL
        e.preventDefault();


	$collectionHolder = $('div#wykopbundle_training_dates');
        var prototype = $collectionHolder.data('prototype');

	var index = $(this).parent().parent().find('input').attr('index');
	var newForm = prototype.replace(/__name__/g, index);	

	$(this).parent().after(newForm);
    });
    var $newDateLi = $('<span id="add_date_btn"></span>').append($addDateLink);


    // Get the data-prototype explained earlier
    var prototype = $collectionHolder.data('prototype');

    // get the new index
    var index = $collectionHolder.data('index');

    // Replace '__name__' in the prototype's HTML to
    // instead be a number based on how many items we have
    var newForm = prototype.replace(/__name__/g, index);
    
    //Add placeholder and title for input
    newForm = $(newForm);
    newForm.find('label').remove();
    newForm.find('input').attr('title', 'Podaj dystans lub link do treningu Endomondo/Strava/RunKeeper');
    newForm.find('input').attr('oninvalid', 'InvalidMsg(this);');
    newForm.find('input').attr('placeholder', 'Podaj dystans lub link do treningu Endomondo/Strava/RunKeeper');
    newForm.find('input').attr('index', index);
    newForm.find('input').after($newDateLi);

    // increase the index with one for the next item
    $collectionHolder.data('index', index + 1);

    // Display the form in the page in an li, before the "Add a Distance" link li
    var $newFormLi = $('<div></div>').append(newForm);
    $newLinkLi.before($newFormLi);
}
