function filterExperiment(){
  const filterString = event.target.options[event.target.selectedIndex].textContent.toLowerCase();
  rows = document.getElementById('designIterations').getElementsByTagName('tbody')[0].rows;

  console.log("From filter : " + filterString);

  for(var i=0;i<rows.length;i++){
    console.log("Before for : " + rows[i].cells[0].textContent);
    if(rows[i].cells[0].textContent.toLowerCase().includes(filterString) || filterString === "all"){
      rows[i].style.display = "table-row";
    }
    else{
      rows[i].style.display = "none";
    }
  }

}
