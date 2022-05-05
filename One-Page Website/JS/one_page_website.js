/*********************************************
Project: One-Page_website
content="A HTML, CSS and JS One-Page_website
Author: Mirwais Sarwary
**********************************************
Let's engineer the functionality into this :)
**********************************************/
//Using JS to create a lightbox (modal image gallery) for all of my images

//create a variable array to store all of our gallery images 
let galleryImages = document.querySelectorAll(".gallery-image");
//keep track of the latest image opened
let getLatestOpenedImage;
//getting the total width of our browser window
let windowWidth = window.innerWidth;

//JS code when we click on the images

//check to see if there is any image
if (galleryImages) {
  //loop for all images
  galleryImages.forEach(function (image, index) { //the image and it's index position
    //we are referencing image as the first element inside of the galleryImages array
    image.onclick = function () { //when the image is clicked on do the function
      //opens the image in full view (hi-res images)
      let getElementCss = window.getComputedStyle(image); //gets styling from CSS file, we can get background image and find out which image we clicked on
      //getting the url for the thumbnail image ...ex: url("file:///C:/Users/mirwa/OneDrive/Documents/2%20GitHub/HTML-and-CSS-Projects/One-Page%20Website/Images/Thumb/t-img2.png")
      let getFullImageUrl = getElementCss.getPropertyValue("background-image");
      //getting the image name and image type from the Url using the split method
      let getImageUrlPos = getFullImageUrl.split("/Images/Thumb/"); //index [0] is before and [1] is after /Image/Thumb/
      //getting the name with out the end ") 
      let setNewImageUrl = getImageUrlPos[1].replace('")', '');  //replacing '")' with nothing
      
      getLatestOpenedImage = index + 1; //here we are setting our var to the image position (+1 to say index 0 is first image)

      //creating the pop up window for the enlarged image
      let container = document.body; //new variable, creating the window in the body of the page
      let newImageWindow = document.createElement("div"); //creating a new node "div"
      //Now we will attach/apply the new Element we just created to the body of our website
      container.appendChild(newImageWindow); //appendChile method applies the div to the body of the website

      //setting attributes for the div box
      newImageWindow.setAttribute("class", "image-window"); //class attribute = image-window
      newImageWindow.setAttribute("onclick", "closeImage()"); //onclick runs closeImage function

      //To insert the image inside the Popup window
      let newImage=document.createElement("img");
      newImageWindow.appendChild(newImage); //inserts the newImage inside the newImageWindow
      //setting attributes for the newImage: need Source to link to the right image and an ID for the image
      newImage.setAttribute("src", "Images/" + setNewImageUrl); //source= location of the image
      newImage.setAttribute("id", "current-img"); //new id is set to current-img, used in function to change images
      
     
      //we need to use onload method to make sure that the image is loaded otherwise the width will be reported as zero
      newImage.onload = function () { //onload says wait until the img is loaded before running this function
        //We need to know the width of the image for placement of the next&prev buttons
        let imagWidth = this.width;

        //Now we need the distance from the edge of the image to the edge of the browser, for proper btn placement
        let calcImgToEdge = (((windowWidth - imagWidth)/2) - 100); //this will be 80px offset from edge of image

        //Now we want to create the next button for the Popup window
        let newNextBtn = document.createElement("a"); //anchor tag
        let btnNextText = document.createTextNode("Next >"); //text inside the anchor tag
        newNextBtn.appendChild(btnNextText); //This inserts the text into the anchor tag
        container.appendChild(newNextBtn); //attaches the anchor tag to the container (document body)
        //Set attributes for the button
        newNextBtn.setAttribute("class", "img-btn-next"); 
        newNextBtn.setAttribute("onclick", "changeImage(1)"); //one is passed to go forwards

        //adding an additional styling to the button
        newNextBtn.style.cssText = "right: "+calcImgToEdge+ "px;"; //setting the right positioning style
        
        //Now we want to create the previous button for the Popup window
        let newPrevBtn = document.createElement("a"); //anchor tag
        let btnPrevText = document.createTextNode("< Prev"); //text inside the anchor tag
        newPrevBtn.appendChild(btnPrevText); //This inserts the text into the anchor tag
        container.appendChild(newPrevBtn); //attaches the anchor tag to the container (document body)
        //Set attributes for the button
        newPrevBtn.setAttribute("class", "img-btn-prev"); 
        newPrevBtn.setAttribute("onclick", "changeImage(0)"); //zero is passed to go backwards

        //adding an additional styling to the button
        newPrevBtn.style.cssText = "left: " + calcImgToEdge + "px;"; //setting the right positioning style
      }

    } 
    
  });

}

//Function for closing the PopUp window, click anywhere to close
function closeImage() {
  document.querySelector(".image-window").remove(); //remove method is applied to the popup window and its content
  document.querySelector(".img-btn-next").remove();
  document.querySelector(".img-btn-prev").remove();
}

//function to change images when the next and previous buttons are clicked on
function changeImage(changeDir) { //need a parameter to be passed onto it, using var changeDir
  //first we want to remove the current image, using the current image id
  document.querySelector("#current-img").remove();
 
  //now we need to create and display the new image based on the current image we closed
  let getImgWindow = document.querySelector(".image-window");
  let newImage = document.createElement("img"); //creates a new image
  getImgWindow.appendChild(newImage); //adds the image into the window

  //selecting which image to present next
  let calcNewImage;
  if (changeDir === 1) { //if the next button is clicked
    calcNewImage = getLatestOpenedImage + 1; //go to the image next in the array (getLatestOpenedImage is the index+1)
    if (calcNewImage > galleryImages.length) { //if we are at the end of the array (last picture) we want to loop back to the first picture
      calcNewImage = 1; //loads the first image
    }
  }
  else if (changeDir === 0) { //if the prev button is clicked
    calcNewImage = getLatestOpenedImage - 1; //go to the prev image in the array
    if (calcNewImage < 1) { //if we are at the begining of the array (first picture) we want to loop back to the last picture
      calcNewImage = galleryImages.length; //loads the last image
    }
  }
  
  //adding attributes to the image
  newImage.setAttribute("src", "Images/img" + calcNewImage + ".png"); //note if the image uses other prefex make sure to change this
  newImage.setAttribute("id", "current-img"); //so that we can remove the image when image is changed

  //update the latest image
  getLatestOpenedImage = calcNewImage;

  //adjusting the button position
  newImage.onload = function () { //make sure the image has loaded so we can get it's width
    let imagWidth = this.width;
    let calcImgToEdge = (((windowWidth - imagWidth)/2) - 100); //this will be 80px offset from edge of image

    let nextBtn = document.querySelector(".img-btn-next");
    nextBtn.style.cssText = "right: "+calcImgToEdge+ "px;"; //setting the right positioning style
    
    let prevBtn = document.querySelector(".img-btn-prev");
    prevBtn.style.cssText = "left: "+calcImgToEdge+ "px;"; //setting the left positioning style
    
  }
  
}