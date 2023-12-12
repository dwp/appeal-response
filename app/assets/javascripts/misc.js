function addCondtionInput(container){
  /*
  <div class="govuk-input__wrapper autocomplete ">
    <input class="govuk-input govuk-input--width-20" id="condition" name="condition" type="text">
  </div>
  */
  var newID = parseInt(Math.random()*10000);
  var newInput,newContainer,newRemoveContainer,newInputContainer,removeLink;
  newContainer = document.createElement("div");
  newContainer.setAttribute("id","accontainer_"+newID);
  newRemoveContainer = document.createElement("div");
  newInputContainer = document.createElement("div");
  newContainer.setAttribute("class","govuk-input__wrapper autocomplete govuk-!-margin-top-4 ");
  newInput = document.createElement("input");
  newInput.setAttribute('type', 'text');
  newInput.setAttribute('id', newID);
  newInput.setAttribute("class","govuk-input govuk-input--width-20 conditionInput");
  newInputContainer.appendChild(newInput);
  newContainer.appendChild(newInputContainer);

  newRemoveContainer.setAttribute("class","govuk-!-margin-top-2 govuk-!-margin-left-2")
  newRemoveContainer.innerHTML = "<a class='govuk-link' href='#' id ='removeLink_"+ newID +"'>Remove</a>";
  newRemoveContainer.style.float = "right";
  newRemoveContainer.addEventListener("click", function(e) {
      document.getElementById("accontainer_"+newID).remove();
  });
  newContainer.appendChild(newRemoveContainer);
  document.getElementById(container).appendChild(newContainer);
  autocomplete(document.getElementById(newID), conditions);

}

function populate(itemsToPopulate,container){
  var items = itemsToPopulate.split(',');
  var i,c,itemContainer,spans,breaks,newID,removeIndex;
  var newInput,newContainer,newRemoveContainer,newInputContainer,removeLink;
  newID = parseInt(Math.random()*10000);
  if(itemsToPopulate)
  {
    for (i = 0; i < items.length; i++) {
      if( items[i].length > 1){
        newContainer = document.createElement("div");
        newContainer.setAttribute("id","accontainer_"+newID);
        newRemoveContainer = document.createElement("div");
        newInputContainer = document.createElement("div");
        newContainer.setAttribute("class","govuk-input__wrapper autocomplete govuk-!-margin-top-4 ");
        newInput = document.createElement("input");
        newInput.setAttribute('type', 'text');
        newInput.setAttribute('id', newID);
        newInput.setAttribute('value',items[i]);
        newInput.setAttribute("class","govuk-input conditionInput");
        newInputContainer.appendChild(newInput);
        newContainer.appendChild(newInputContainer);
        if(i>0){
          newRemoveContainer.setAttribute("class","govuk-!-margin-top-2 govuk-!-margin-left-2")
          newRemoveContainer.innerHTML = "<a class='govuk-link' href='#' id ='removeLink_"+ newID +"'>Remove</a>";
          newRemoveContainer.style.float = "right";
          newRemoveContainer.addEventListener("click", function(e) {
              document.getElementById("accontainer_"+newID).remove();
          });
          newContainer.appendChild(newRemoveContainer);
        }
        document.getElementById(container).appendChild(newContainer);
        autocomplete(document.getElementById(newID), conditions);
      }
    }
  }
}

function populate_old(itemsToPopulate){
  var items = itemsToPopulate.split(',');
  var i,c,itemContainer,spans,breaks,newID,removeIndex;

  if(itemsToPopulate)
  {
    for (i = 0; i < items.length; i++) {
      if( items[i].length > 1)
        selectedConditions.push(items[i]);
    }
  }

  console.log("The itemsToPopulate passed raw is " + itemsToPopulate);
  console.log("The items after splitting" + items);
  console.log("The selectedConditions is " + selectedConditions);

  for (var i = 0; i < items.length-1; i++)
  {
    if( items[i].length > 1 )
    {
      console.log("Item is " + items[i] + " its length is " + items[i].length);
      newID = parseInt(Math.random()*10000);
      document.getElementById('selectedConditions').style.display = 'block';
      c = document.createElement("div");
      c.setAttribute("id", newID);
      itemContainer = document.createElement("div");
      itemContainer.setAttribute("class", "govuk-body");
      itemContainer.innerHTML = items[i];
      console.log(items[i]);
      spans = document.createElement("span");
      spans.innerHTML = "<a class='govuk-link' href='#' id ='removeLink"+ i +"'>Remove</a>";
      spans.style.float = "right";
      spans.addEventListener("click", function(e) {
        removeIndex = selectedConditions.indexOf(this.parentElement.innerHTML.split("<")[0]);
        if (removeIndex > -1) { // only splice array when item is found
          selectedConditions.splice(removeIndex, 1); // 2nd parameter means remove one item only
          console.log("Removing condition " + newID);
          this.parentElement.parentElement.remove();
        }
      });
      itemContainer.appendChild(spans);
      c.appendChild(itemContainer);
      breaks = document.createElement("hr");
      breaks.setAttribute("class","govuk-section-break govuk-section-break--visible govuk-!-margin-bottom-3");
      c.appendChild(breaks);
      document.getElementById('selectedConditions').appendChild(c);
    }
  }
}
