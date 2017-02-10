// holds all the draggable elements
var draggies = [];

// holds some temporary images for testing
var fileArray = [
	"./dev-images/image1.jpg",
	"./dev-images/image2.jpg",
	"./dev-images/image3.jpg",
	"./dev-images/image4.jpg"
]

	// sets up the packery grid
	var elem = document.querySelector('.grid');
	var pckry = new Packery( elem, {
	  // options
	  itemSelector: '.column-33',
	  columnWidth: '.column-33',
	  percentPosition: true
	});



//
// this is copied from the draggie site -- it makes everything
// draggable!
//

	function makeStuffDraggable() {

		// get all draggie elements
		var draggableElems = document.querySelectorAll('.draggable');
		// array of Draggabillies
		
		// init Draggabillies
		for ( var i=0, len = draggableElems.length; i < len; i++ ) {
		  var draggableElem = draggableElems[i];
		  var draggie = new Draggabilly( draggableElem, {
		    // options...
		    //containment: '.grid'
		  });
		  draggies.push( draggie );
		  pckry.bindDraggabillyEvents( draggie );
		}
	
	};


//
// This loads up images from local machine,
// then runs them through the insertImageIntoPage() function.
//

	function addImagesFromLocalLibrary(event){ 

		//get files captured through input
		var fileInput = event.target.files;

		if (fileInput.length>0) {
			//get the file

			//window url 
			var windowURL = window.URL || window.webkitURL; 

			// loop through all the files that we picked
			for (i = 0; i < fileInput.length; i++ ) {
			
				//picture url
				var picURL = windowURL.createObjectURL(fileInput[i]);

				//push that shiz into the fileArray
				fileArray.push(picURL);

				insertImageIntoPage(picURL);
			}

		}

	};



//
// Helper to create an image inside a div, set some attributes,
// add it to packery grid and make it draggable
// 

	function insertImageIntoPage(picURL) {

		var newImage = document.createElement('img');
			newImage.src = picURL;
			// 'resizing' images 
			newImage.style.width = '150px';
			newImage.style.height = 'auto';

		var newDiv = document.createElement("div");
			newDiv.setAttribute('class', 'column column-33 grid-item draggable');
			newDiv.appendChild(newImage);

		var imageGridDiv = document.getElementById('the-grid');
			imageGridDiv.appendChild(newDiv);


		// let packery know that we added something	
		pckry.appended(newDiv);
		
		// make this new image draggable (could probably clean up instead of running it through every image..)
		makeStuffDraggable();

		// redo the layout
		pckry.layout();

	};



//
// Pretty self-explanatory. Could extend this later on, to load images
// from localStorage or Firebase or whatever.
//

	function initialImageLoadFromArray() {

		// check and see if there's anything in the imageArray
		if (fileArray.length > 0) {

			//run the insertimage function, passing in each image URL...
			for (i = 0; i < fileArray.length; i++ ) {

				insertImageIntoPage(fileArray[i]);
			}
		}

		// otherwise who cares
		else {
			console.log('nothing here!');
		}
	
	};



// do some stuff as soon as the page loads up...

	window.onload = function() {
		initialImageLoadFromArray();
		makeStuffDraggable();
	};