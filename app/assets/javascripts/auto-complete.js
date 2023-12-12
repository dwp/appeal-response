
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, c,selectedCondition, i, val = this.value;
      var breaks, links, spans;
      var foundAt = -1;
      var newID = 0;
      var found = new Boolean(false);
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      inp.setAttribute("autocomplete","off");
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        //if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        //if (arr[i].toUpperCase().includes(val.toUpperCase())) {
        foundAt = arr[i].toUpperCase().indexOf(val.toUpperCase());
        console.log(foundAt);
        if (foundAt !== -1) {

          found = true;
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          b.setAttribute("class","govuk-body govuk-!-margin-bottom-0");
          b.innerHTML = arr[i].substr(0,foundAt);
          /*make the matching letters bold:*/
          b.innerHTML += "<strong>" + arr[i].substr(foundAt, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(foundAt+val.length) //+ "<span style='float:right;'><a href='#'>+ Add condition</a></span>";
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              newID = parseInt(Math.random()*10000);
              /*insert the value for the autocomplete text field:*/
              //document.getElementById('selectedConditions').style.display='block';
              /*
              c = document.createElement("div");
              c.setAttribute("id", newID);
              selectedCondition = document.createElement("div");
              selectedCondition.setAttribute("class", "govuk-body");
              selectedCondition.setAttribute("id", "condition" + newID);
              selectedCondition.innerHTML = this.getElementsByTagName("input")[0].value;
              selectedConditions.push(this.getElementsByTagName("input")[0].value);
              spans = document.createElement("span");
              spans.innerHTML = "<a class='govuk-link' href='#' id ='removeLink"+ i +"'>Remove</a>";
              spans.style.float = "right";
              spans.addEventListener("click", function(e) {
                removeIndex = selectedConditions.indexOf(this.parentElement.innerHTML.split("<")[0]);
                if (removeIndex > -1) { // only splice array when item is found
                  selectedConditions.splice(removeIndex, 1); // 2nd parameter means remove one item only
                  document.getElementById(newID).remove();
                }
              });
              selectedCondition.appendChild(spans);
              c.appendChild(selectedCondition);
              breaks = document.createElement("hr");
              breaks.setAttribute("class","govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-3");
              c.appendChild(breaks);
              document.getElementById('selectedConditions').appendChild(c); */

              inp.value = this.getElementsByTagName("input")[0].value;

              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }

      if(found == false){
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        b.setAttribute("class","govuk-body govuk-!-margin-bottom-0");
        /*make the matching letters bold:*/
        val = val.charAt(0).toUpperCase() + val.slice(1)
        b.innerHTML = "<strong>" + val + "</strong><span style='float:right;'><a href='#'>+ Add condition</a></span>";
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + val + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
            newID = parseInt(Math.random()*10000);
            /*insert the value for the autocomplete text field:*/
            document.getElementById('selectedConditions').style.display='block';
            c = document.createElement("div");
            c.setAttribute("id", newID);
            selectedCondition = document.createElement("div");
            selectedCondition.setAttribute("class", "govuk-body");
            selectedCondition.setAttribute("id", "condition" + newID);
            selectedCondition.innerHTML = this.getElementsByTagName("input")[0].value;
            selectedConditions.push(this.getElementsByTagName("input")[0].value);
            spans = document.createElement("span");
            spans.innerHTML = "<a class='govuk-link' href='#' id ='removeLink"+ i +"'>Remove</a>";
            spans.style.float = "right";
            spans.addEventListener("click", function(e) {
              removeIndex = selectedConditions.indexOf(this.parentElement.innerHTML.split("<")[0]);
              if (removeIndex > -1) { // only splice array when item is found
                selectedConditions.splice(removeIndex, 1); // 2nd parameter means remove one item only
                document.getElementById(newID).remove();
              }
            });
            selectedCondition.appendChild(spans);
            c.appendChild(selectedCondition);
            breaks = document.createElement("hr");
            breaks.setAttribute("class","govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-3");
            c.appendChild(breaks);
            document.getElementById('selectedConditions').appendChild(c);
            document.getElementById('condition').value = "";
            inp.focus();
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists();
        });
        a.appendChild(b);
      }

  });

  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var conditions = ["Anxiety","Depression","Arthritis","Asthma","Alzheimer's disease","Back pain","Knee pain","Diabetes", "Cancer", "High blood pressure"];
