const express = require('express');
const router = express.Router();


// Add your routes here - above the module.exports line

const {
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');


sortChrono = function(dateArray){
  for (var i = 0; i < dateArray.length - 1; i++) {
    for (var k = i+1; k < dateArray.length; k++) {
      let currentDate = new Date(dateArray[i].year,dateArray[i].month,dateArray[i].day);
      let dateToCompare = new Date(dateArray[k].year,dateArray[k].month,dateArray[k].day);
      if(currentDate > dateToCompare){
        let tempDate = dateArray[k];
        dateArray[k] = dateArray[i];
        dateArray[i] = tempDate;
      }
    }
  }
};

convertMonth = function(month){
  switch (month) {
    case "01":
    case "1":
      return "January";
      break;
    case "02":
    case "2":
      return "February";
      break;
    case "03":
    case "3":
      return "March";
      break;
    case "04":
    case "4":
      return "April";
      break;
    case "05":
    case "5":
      return "May";
      break;
    case "06":
    case "6":
      return "June";
      break;
    case "07":
    case "7":
      return "July";
      break;
    case "08":
    case "8":
      return "August";
      break;
    case "09":
    case "9":
      return "September";
      break;
    case "10":
      return "October";
      break;
    case "11":
      return "November";
      break;
    case "12":
      return "December";
      break;
    default:
      return "Unknown";
  }
};

getAllEvents = function(data){
  let allEvents = [];
  let claimToUC = {};
  let originalDecision = {};
  let originalNotifcation = {};
  let mrRequest = {};
  let mrDecision = {};
  let mrNotification = {};
  let mrAgreeOriginal = "";
  let appealHMCTS = {};
  let appealDWP = {};
  let uc50 = {};
  let dualClaim = {};
  let hcp = {};
  let uc113 = {};


  //add all health conditions
  if(data.healthConditions)
  {
    for(let i = 0; i < data.healthConditions.length; i++){
      let healthCondition = data.healthConditions[i];
      healthCondition.type = "healthConditionDate";
      healthCondition.date = healthCondition.day + " " + convertMonth(healthCondition.month) + " " + healthCondition.year;
      healthCondition.title = healthCondition.condition;
      allEvents.push(healthCondition);
    }
  }


  //add all key dates
  if(data.dateCliamToUCDay && data.dateCliamToUCMonth && data.dateCliamToUCYear)
  {
    claimToUC.title = "Date of claim to UC";
    claimToUC.day = data.dateCliamToUCDay;
    claimToUC.month = data.dateCliamToUCMonth;
    claimToUC.year = data.dateCliamToUCYear;
    claimToUC.date = claimToUC.day + " " + convertMonth(claimToUC.month) + " " + claimToUC.year;
    claimToUC.type = "keyDate";
    allEvents.push(claimToUC);
  }

  if(data.dateOriginalNotifcationDay && data.dateOriginalNotifcationMonth && data.dateOriginalNotifcationYear)
  {
    originalNotifcation.title = "Original decision notification sent";
    originalNotifcation.day = data.dateOriginalNotifcationDay;
    originalNotifcation.month = data.dateOriginalNotifcationMonth;
    originalNotifcation.year = data.dateOriginalNotifcationYear;
    originalNotifcation.date = originalNotifcation.day + " " + convertMonth(originalNotifcation.month) + " " + originalNotifcation.year;
    originalNotifcation.type = "keyDate";
    allEvents.push(originalNotifcation);
  }

  if(data.dateOriginalDecisionDay && data.dateOriginalDecisionMonth && data.dateOriginalDecisionYear)
  {
    originalDecision.title = "Original decision made";
    originalDecision.day = data.dateOriginalDecisionDay;
    originalDecision.month = data.dateOriginalDecisionMonth;
    originalDecision.year = data.dateOriginalDecisionYear;
    originalDecision.date = originalDecision.day + " " + convertMonth(originalDecision.month) + " " + originalDecision.year;
    originalDecision.type = "keyDate";
    allEvents.push(originalDecision);
  }


  if(data.dateMrDay && data.dateMrMonth && data.dateMrYear)
  {
    mrRequest.title = "MR requested by appellant";
    mrRequest.day = data.dateMrDay;
    mrRequest.month = data.dateMrMonth;
    mrRequest.year = data.dateMrYear;
    mrRequest.date = mrRequest.day + " " + convertMonth(mrRequest.month) + " " + mrRequest.year;
    mrRequest.type = "keyDate";
    allEvents.push(mrRequest);
  }

  if(data.dateMrNotificationDay && data.dateMrNotificationDay && data.dateMrNotificationDay)
  {
    mrNotification.title = "MR notification sent";
    mrNotification.day = data.dateMrNotificationDay;
    mrNotification.month = data.dateMrNotificationMonth;
    mrNotification.year = data.dateMrNotificationYear;
    mrNotification.date = mrNotification.day + " " + convertMonth(mrNotification.month) + " " + mrNotification.year;
    mrNotification.type = "keyDate";
    allEvents.push(mrNotification);
  }

  if(data.dateMrDecisionDay && data.dateMrDecisionMonth && data.dateMrDecisionYear)
  {
    mrDecision.title = "MR decision made";
    mrDecision.day = data.dateMrDecisionDay;
    mrDecision.month = data.dateMrDecisionMonth;
    mrDecision.year = data.dateMrDecisionYear;
    mrDecision.date = mrDecision.day + " " + convertMonth(mrDecision.month) + " " + mrDecision.year;
    mrDecision.type = "keyDate";
    allEvents.push(mrDecision);
  }

  if(data.dateHmctsAppealDay && data.dateHmctsAppealMonth && data.dateHmctsAppealYear)
  {
    appealHMCTS.title = "Appeal received by HMCTS";
    appealHMCTS.day = data.dateHmctsAppealDay;
    appealHMCTS.month = data.dateHmctsAppealMonth;
    appealHMCTS.year = data.dateHmctsAppealYear;
    appealHMCTS.date = appealHMCTS.day + " " + convertMonth(appealHMCTS.month) + " " + appealHMCTS.year;

    appealHMCTS.type = "keyDate";
    allEvents.push(appealHMCTS);
  }

  if(data.dateDwpAppealDay && data.dateDwpAppealMonth && data.dateDwpAppealYear)
  {
    appealDWP.title = "Appeal received by DWP";
    appealDWP.day = data.dateDwpAppealDay;
    appealDWP.month = data.dateDwpAppealMonth;
    appealDWP.year = data.dateDwpAppealYear;
    appealDWP.date = appealDWP.day + " " + convertMonth(appealDWP.month) + " " + appealDWP.year;

    appealDWP.type = "keyDate";
    allEvents.push(appealDWP);
  }

  if(data.dualClaimDay && data.dualClaimMonth && data.dualClaimYear)
  {
    dualClaim.title = "Claim for New Style ESA";
    dualClaim.day = data.dualClaimDay;
    dualClaim.month = data.dualClaimMonth;
    dualClaim.year = data.dualClaimYear;
    dualClaim.date = dualClaim.day + " " + convertMonth(dualClaim.month) + " " + dualClaim.year;

    dualClaim.type = "keyDate";
    allEvents.push(dualClaim);
  }

  if(data.uc50Exists == 'Yes')
  {
    uc50.title = "Capability for work questionnaire (UC50)";
    uc50.type = "uc50";
    uc50.day = data['uc50-day'];
    uc50.month = data['uc50-month'];
    uc50.year = data['uc50-year'];
    uc50.date = uc50.day + " " + convertMonth(uc50.month) + " " + uc50.year;
    uc50.uc50Exists = data.uc50Exists;
    uc50.physical = data.physical;
    uc50.mental = data.mental;
    allEvents.push(uc50);
  }

  if(data.hcpAssessmentDay && data.hcpAssessmentMonth && data.hcpAssessmentYear)
  {
    hcp.title = "Health assessment";
    hcp.type = "hcp";
    hcp.day = data['hcpAssessmentDay'];
    hcp.month = data['hcpAssessmentMonth'];
    hcp.year = data['hcpAssessmentYear'];
    hcp.assessmentType = data['assessmentType'];
    hcp.conditions = data['hcpConditions'];
    hcp.date = hcp.day + " " + convertMonth(hcp.month) + " " + hcp.year;
    console.log(hcp);
    allEvents.push(hcp);
  }

  if(data['uc113Exists'] == "Yes")
  {
    uc113.title = "UC113";
    uc113.type = "uc113";
    uc113.day = data['uc113Day'];
    uc113.month = data['uc113Month'];
    uc113.year = data['uc113Year'];
    uc113.uc113Exists = data['uc113Exists'];
    uc113.date = uc113.day + " " + convertMonth(uc113.month) + " " + uc113.year;
    allEvents.push(uc113);
  }


  return allEvents;
};

/*
*********************************************************************************************
*********************************************************************************************
*****************************--- TIME LINE + ADD A FACT *************************************
*********************************************************************************************
*********************************************************************************************
*/

router.get('/timeline/01-task-list-new',(req,res)=>{
  const {data} = req.session;
  data.target = 'taskList';
  res.render('./timeline/01-task-list-new',{data});
})

router.get('/timeline/appellant',(req,res)=>{
  const {data} = req.session;
  if(data.appellantConfirmation){
    res.redirect('/timeline/02-appellant-details');
  }
  else {
    res.redirect('/timeline/02-find-appellant');
  }
})

router.post('/timeline/addAppellant',(req,res) => {
  const { data } = req.session;

  if ( data.appellantConfirmation)
  {
    data.error = 0;
  }
  else
  {
    data.error = 1;
    res.redirect('/timeline/02-appellant-details');
  }

  if(data.target =="cya")
    res.redirect('/timeline/11-check-answers');
  else
    res.redirect('/timeline/01-task-list-new');
})

router.post('/timeline/decisionType',(req,res) => {
  res.redirect('/timeline/01-task-list-new');
})

router.get('/timeline/foc/index',(req,res,next) => {
  const { data } = req.session;
  const { edit, id } = req.query;
  const events = data.events;
  let hmctsReceipt = {};
  let dwpReceipt = {};
  data.factToAdd = "";
  if(!events){
    data.noOfEvents = {};
    data.events = [];
    data.noOfEvents = {};
    data.noOfEvents.hmctsReceipt = 1;
    data.noOfEvents.dwpReceipt = 1;
    data.noOfEvents.other = 0;
    data.noOfEvents.uc50 = 0;
    data.noOfEvents.decision = 0;
    data.noOfEvents.outcomeDecision = 0;
    data.noOfEvents.assessment = 0;
    data.noOfEvents.dualClaim = 0;
    data.noOfEvents.uc113 = 0;
    data.noOfEvents.originalClaim = 0;
    data.noOfEvents.coc = 0;
    data.noOfEvents.mr = 0;
    data.noOfEvents.appeals = 0;
    data.lastAdded = "";
  }
  data.addFact = "";
  data.edit = -1;
  data.editIndex = -1;
  data.editMRIndex = -1;
  data.editMRDecisionIndex = -1;
  data.editMRNotificationIndex = -1;
  data.editOutcomeDecisionIndex = -1;
  data.editOutcomeNotificationIndex = -1;
  data.error = 0;
  data.cya = 'false';
  res.render('./timeline/foc/index',{data});
})

router.post('/timeline/foc/index',(req,res) => {
  const { data } = req.session;
  if ( data.addFact == "Yes")
  {
    data.error = 0;
    res.render('./timeline/foc/addAnother',{data});
  }
  else if ( data.addFact == "No")
  {
    data.error = 0;
    res.redirect('/timeline/01-task-list-new');
  }
  else {
    data.error = 1;
    res.render('./timeline/foc/index',{data});
  }
})

router.get('/timeline/foc/addAnother',(req,res,next) => {
    const { data } = req.session;
    res.render('./timeline/foc/addAnother',{data});
})


router.post('/timeline/foc/addAnother',(req,res) => {
  const { data } = req.session;

  if ( data.factToAdd == "Other fact")
  {
    data.error = 0;
    res.redirect('/timeline/foc/other?target=index');
  }
  else if ( data.factToAdd == "Mandatory reconsideration")
  {
    data.error = 0;
    res.redirect('/timeline/foc/mr?target=index');
  }
  else if ( data.factToAdd == "Decision")
  {
    data.error = 0;
    res.redirect('/timeline/foc/decision?target=index');
  }
  else if ( data.factToAdd == "Original claim")
  {
    data.error = 0;
    res.redirect('/timeline/foc/originalClaim?target=index');
  }
  else if ( data.factToAdd == "Change of circumstances")
  {
    data.error = 0;
    res.redirect('/timeline/foc/coc?target=index');
  }
  else if ( data.factToAdd == "Dual claim")
  {
    data.error = 0;
    res.redirect('/timeline/foc/dualClaim?target=index');
  }
  else if ( data.factToAdd == "GP report (UC113)")
  {
    data.error = 0;
    res.redirect('/timeline/foc/uc113?target=index');
  }
  else if ( data.factToAdd == "Assessment")
  {
    data.error = 0;
    res.redirect('/timeline/foc/assessment?target=index');
  }
  else if ( data.factToAdd == "Capability of work questionnaire (UC50)")
  {
    data.error = 0;
    res.redirect('/timeline/foc/uc50Exists?target=index');
  }
  else
  {
    data.error = 1;
    res.redirect('/timeline/foc/addAnother?target=index');
  }
})

router.get('/remove',(req,res)=>{
  const {data} = req.session;
  var i = 0;
  for(;i<data.events.length;i++){
    if(data.events[i].id == data.id){
      data.noOfEvents[data.events[i].type] = data.noOfEvents[data.events[i].type] - 1;
      data.events.splice(i,1);
    }
  }
  if(data.cya =="true")
    res.redirect('/timeline/11-check-answers');
  else
    res.redirect('/timeline/foc/index');
})

router.get('/edit',(req,res)=>{
  const {data} = req.session;
  var indexToEdit;
  var i = 0;
  for(;i<data.events.length;i++){
    console.log(data.events[i].id);
    if(data.events[i].id == data.id){
      idToEdit = i;
      break;
    }
  }
  data.lastAdded = -1;
  data.edit = 1;
  data.editIndex = idToEdit;

  if (data.events[idToEdit].type == "mr" || data.events[idToEdit].type == "mrDecision" || data.events[idToEdit].type == "mrNotification" )
  {
    for(i=0;i<data.events.length;i++){
      if(data.events[i].groupID == data.events[idToEdit].groupID){
        if(data.events[i].type == "mr")
        {
          data.editMRIndex = i;
        }
        else if(data.events[i].type == "mrDecision")
        {
          data.editMRDecisionIndex = i;
        }
        else if(data.events[i].type == "mrNotification")
        {
          data.editMRNotificationIndex = i;
        }
      }
    }
  }
  else if (data.events[idToEdit].type == "outcomeDecision" || data.events[idToEdit].type == "outcomeNotification")
  {
    for(i=0;i<data.events.length;i++){
      if(data.events[i].groupID == data.events[idToEdit].groupID){
        if(data.events[i].type == "outcomeDecision")
        {
          data.editOutcomeDecisionIndex = i;
        }
        else if(data.events[i].type == "outcomeNotification")
        {
          data.editOutcomeNotificationIndex = i;
        }
      }
    }
  }
  else if (data.events[idToEdit].type == "hmctsReceipt" || data.events[idToEdit].type == "dwpReceipt")
  {
    for(i=0;i<data.events.length;i++){
      if(data.events[i].groupID == data.events[idToEdit].groupID){
        if(data.events[i].type == "hmctsReceipt")
        {
          data.editHMCTSIndex = i;
        }
        else if(data.events[i].type == "dwpReceipt")
        {
          data.editDWPIndex = i;
        }
      }
    }
  }
  else if (data.events[idToEdit].type == "originalClaim" || data.events[idToEdit].type == "originalDecision" || data.events[idToEdit].type == "originalNotification" )
  {
    for(i=0;i<data.events.length;i++){
      if(data.events[i].groupID == data.events[idToEdit].groupID){
        if(data.events[i].type == "originalClaim")
        {
          data.editOClaimIndex = i;
        }
        else if(data.events[i].type == "originalDecision")
        {
          data.editODecisionIndex = i;
        }
        else if(data.events[i].type == "originalNotification")
        {
          data.editONotificationIndex = i;
        }
      }
    }
  }

  if(data.events[idToEdit].type == "uc50")
    res.redirect('/timeline/foc/uc50Exists');
  else
    res.redirect('/timeline/foc/' + data.events[idToEdit].type);
})


router.post('/timeline/foc/addOtherFact',(req,res) => {
  const { data } = req.session;
  let newFact = {};
  var otherFact;
  if(data.edit == 1)
  {
    otherFact = data.events.find(o => o.id === data.id);
  }
  else
  {
    otherFact = newFact;
  }
  if ( data.otherFactDay && data.otherFactMonth && data.otherFactYear && data.factTitle && data.factDescription)
  {
    otherFact.day = data.otherFactDay;
    otherFact.month = data.otherFactMonth;
    otherFact.year = data.otherFactYear;
    otherFact.date = otherFact.day + " " + convertMonth(otherFact.month) + " " + otherFact.year;
    otherFact.title = data.factTitle;
    otherFact.details = {};
    otherFact.details.description = data.factDescription;
    if(data.edit != 1)
    {
      otherFact.id = uuidv4();
      otherFact.type = "other";
      data.noOfEvents.other++;
      data.events.push(otherFact);
    }
    data.lastAdded = otherFact.id;
    data.error = 0;
  }
  else {
    data.error = 1;
    res.redirect('/timeline/foc/other');
  }
  sortChrono(data.events);
  if(data.cya =="true")
    res.redirect('/timeline/11-check-answers');
  else
    res.redirect('/timeline/foc/index');
})

router.get('/timeline/foc/other',(req,res) => {
  const {data} = req.session;
  data.lastAdded = -1;
  res.render('./timeline/foc/other',{data});
})

router.post('/timeline/foc/addUC50',(req,res) => {
  const { data } = req.session;
  let newFact = {};
  var uc50;
  if(data.edit == 1)
  {
    uc50 = data.events.find(o => o.id === data.id);
  }
  else
  {
    uc50 = newFact;
  }
  if ( data.uc50Exists && data.uc50DateType && data.uc50day && data.uc50month && data.uc50year)
  {
    if(data.edit != 1)
    {
      uc50.title = "Capability for work questionnaire (UC50)";
      uc50.id = uuidv4();
      uc50.type = "uc50";
      uc50.details = {};
      uc50.details.uc50DateType = data.uc50DateType;
      uc50.details.uc50Exists = data.uc50Exists;
      uc50.day = data.uc50day;
      uc50.month = data.uc50month;
      uc50.year = data.uc50year;
      uc50.date = uc50.day + " " + convertMonth(uc50.month) + " " + uc50.year;
      data.events.push(uc50);
      data.noOfEvents.uc50++;
    }
    else
    {
      uc50.details.uc50Exists = data.uc50Exists;
      uc50.details.uc50DateType = data.uc50DateType;
      uc50.day = data.uc50day;
      uc50.month = data.uc50month;
      uc50.year = data.uc50year;
      uc50.date = uc50.day + " " + convertMonth(uc50.month) + " " + uc50.year;
    }
    data.lastAdded = uc50.id;
    data.error = 0;
  }
  else {
    data.error = 1;
    res.redirect('/timeline/foc/uc50Exists');
  }
  sortChrono(data.events);
  if(uc50.details.uc50Exists == "Yes")
  {
    data.uc50 = uc50;
    res.redirect('/timeline/foc/uc50');
  }
  else
  {
    if(data.cya =="true")
      res.redirect('/timeline/11-check-answers');
    else
      res.redirect('/timeline/foc/index');
  }
})

router.get('/timeline/foc/uc50Exists',(req,res)=>{
  const {data} = req.session;
  var error = data.error;
  data.lastAdded = -1;
  res.render('./timeline/foc/uc50Exists',{error});
})

router.get('/timeline/foc/uc50',(req,res)=>{
  var {data} = req.session;
  res.render('./timeline/foc/uc50',{data});
})

router.post('/timeline/foc/addUC50Details',(req,res) => {
  const { data } = req.session;
  let uc50 = data.events.find(o => o.id === data.uc50ID);
  if (data.physical)
  {
    uc50.details.uc50Physical=data.physical;
    uc50.details.uc50Mental=data.mental;
    data.error = 0;
  }
  else
  {
    data.error = 1;
    res.redirect('/timeline/foc/uc50');
  }
  sortChrono(data.events);
  if(data.cya =="true")
    res.redirect('/timeline/11-check-answers');
  else
    res.redirect('/timeline/foc/index');
})

router.post('/timeline/foc/addDecision',(req,res) => {
  const { data } = req.session;
  let newFact = {};
  var decision;
  if(data.edit == 1)
  {
    decision = data.events.find(o => o.id === data.id);
  }
  else
  {
    decision = newFact;
  }
  if ( data.decisionDay && data.decisionMonth && data.decisionYear)
  {
    decision.day = data.decisionDay;
    decision.month = data.decisionMonth;
    decision.year = data.decisionYear;
    decision.date = decision.day + " " + convertMonth(decision.month) + " " + decision.year;
    decision.title = "Decision";
    decision.details = {};
    if(data.decisionType == "LCW")
    {
      decision.details.mentalPoints = data.mentalPoints;
      decision.details.physicalPoints = data.physicalPoints;
    }
    else
    {
      decision.details.treatedAs = data.treatedAs;
    }
    if(data.edit != 1)
    {
      decision.id = uuidv4();
      decision.type = "decision";
      data.events.push(decision);
      data.noOfEvents.decision++;
    }
    data.lastAdded = decision.id;
    data.error = 0;
  }
  else {
    data.error = 1;
    res.redirect('/timeline/foc/decision');
  }
  sortChrono(data.events);
  if(data.cya =="true")
    res.redirect('/timeline/11-check-answers');
  else
    res.redirect('/timeline/foc/index');
})

router.get('/timeline/foc/decision',(req,res) => {
  const {data} = req.session;
  var error = data.error;
  data.lastAdded = -1;
  res.render('./timeline/foc/decision',{error});
})

router.post('/timeline/foc/addOutcomeDecision',(req,res) => {
  const { data } = req.session;
  let newFact1 = {};
  let newFact2 = {};
  var decision;
  var notification;
  if(data.edit == 1)
  {
    decision = data.events.find(o => o.id === data.events[data.editOutcomeDecisionIndex].id);
    notification = data.events.find(o => o.id === data.events[data.editOutcomeNotificationIndex].id);
    console.log("Decision day: " + decision.day);
    console.log("Notiifcation day: " + notification.day);
  }
  else
  {
    decision = newFact1;
    notification = newFact2;
  }
  if ( data.decisionDay && data.decisionMonth && data.decisionYear && data.notificationDay && data.notificationMonth && data.notificationYear )
  {
    decision.day = data.decisionDay;
    decision.month = data.decisionMonth;
    decision.year = data.decisionYear;
    decision.date = decision.day + " " + convertMonth(decision.month) + " " + decision.year;
    decision.title = "Original decision";
    notification.day = data.notificationDay;
    notification.month = data.notificationMonth;
    notification.year = data.notificationYear;
    notification.date = notification.day + " " + convertMonth(notification.month) + " " + notification.year;
    notification.title = "Original decision notification";
    decision.details = {};
    if(data.decisionType == "LCW")
    {
      decision.details.mentalPoints = data.mentalPoints;
      decision.details.physicalPoints = data.physicalPoints;
    }
    else
    {
      decision.details.treatedAs = data.treatedAs;
    }

    if(data.edit != 1)
    {
      decision.id = uuidv4();
      decision.groupID = decision.id;
      decision.type = "outcomeDecision";
      notification.id = uuidv4();
      notification.groupID = decision.id;
      notification.type = "outcomeNotification";
      data.events.push(decision);
      data.events.push(notification);
      data.noOfEvents.outcomeDecision++;
    }
    data.lastAdded = decision.id;
    data.error = 0;
  }
  else {
    data.error = 1;
    res.redirect('/timeline/foc/outcomeDecision');
  }
  sortChrono(data.events);
  if(data.cya =="true")
    res.redirect('/timeline/11-check-answers');
  else
    res.redirect('/timeline/foc/index');
})

router.get('/timeline/foc/outcomeDecision',(req,res) => {
  const {data} = req.session;
  var error = data.error;
  data.lastAdded = -1;
  res.render('./timeline/foc/outcomeDecision',{error});
})

router.get('/timeline/foc/outcomeNotification',(req,res) => {
  const {data} = req.session;
  var error = data.error;
  data.lastAdded = -1;
  res.render('./timeline/foc/outcomeDecision',{error});
})

router.post('/timeline/foc/addAssessment',(req,res) => {
  const { data } = req.session;
  let newFact = {};
  var assessment;
  if(data.edit == 1)
  {
    assessment = data.events.find(o => o.id === data.id);
  }
  else
  {
    assessment = newFact;
  }

  if ( data.hcpAssessmentDay && data.hcpAssessmentMonth && data.hcpAssessmentYear && data.assessmentType)
  {
    assessment.day = data.hcpAssessmentDay;
    assessment.month = data.hcpAssessmentMonth;
    assessment.year = data.hcpAssessmentYear;
    assessment.date = assessment.day + " " + convertMonth(assessment.month) + " " + assessment.year;
    assessment.title = "Health assessment";
    assessment.details = {};
    assessment.details.assessmentType = data.assessmentType;
    assessment.details.asessmentConditions = data.conditionsString;
    if(data.edit != 1)
    {
      assessment.id = uuidv4();
      assessment.type = "assessment";
      data.events.push(assessment);
      data.noOfEvents.assessment++;
    }
    data.lastAdded = assessment.id;
    data.error = 0;
  }
  else
  {
    data.error = 1;
    res.redirect('/timeline/foc/assessment');
  }

  sortChrono(data.events);
  if(data.cya =="true")
    res.redirect('/timeline/11-check-answers');
  else
    res.redirect('/timeline/foc/index');
})

router.get('/timeline/foc/assessment',(req,res) => {
  const {data} = req.session;
  var error = data.error;
  data.lastAdded = -1;
  res.render('./timeline/foc/assessment',{error});
})

router.post('/timeline/foc/addDualClaim',(req,res) => {
  const { data } = req.session;
  let newClaim = {};
  var dualClaim;
  if(data.edit == 1)
  {
    dualClaim = data.events.find(o => o.id === data.id);
  }
  else
  {
    dualClaim = newClaim;
  }
  if ( data.dualClaimDay && data.dualClaimMonth && data.dualClaimYear )
  {
    dualClaim.day = data.dualClaimDay;
    dualClaim.month = data.dualClaimMonth;
    dualClaim.year = data.dualClaimYear;
    dualClaim.date = dualClaim.day + " " + convertMonth(dualClaim.month) + " " + dualClaim.year;
    dualClaim.title = "Claim for New Style Employment and Support Allowance (ESA)";
    if(data.edit != 1)
    {
      dualClaim.id = uuidv4();
      dualClaim.type = "dualClaim";
      data.events.push(dualClaim);
      data.noOfEvents.dualClaim++;
    }
    data.lastAdded = dualClaim.id;
    data.error = 0;
  }
  else {
    data.error = 1;
    res.redirect('/timeline/foc/dualClaim');
  }
  sortChrono(data.events);
  if(data.cya =="true")
    res.redirect('/timeline/11-check-answers');
  else
    res.redirect('/timeline/foc/index');
})

router.get('/timeline/foc/dualClaim',(req,res) => {
  const {data} = req.session;
  var error = data.error;
  data.lastAdded = -1;
  res.render('./timeline/foc/dualClaim',{error});
})


router.post('/timeline/foc/addUC113',(req,res) => {
  const { data } = req.session;
  let newFact = {};
  var uc113;
  if(data.edit == 1)
  {
    uc113 = data.events.find(o => o.id === data.id);
  }
  else
  {
    uc113 = newFact;
  }


  if ( data.uc113Day && data.uc113Month && data.uc113Year )
  {
    uc113.day = data.uc113Day;
    uc113.month = data.uc113Month;
    uc113.year = data.uc113Year;
    uc113.date = uc113.day + " " + convertMonth(uc113.month) + " " + uc113.year;
    if(data.edit != 1)
    {
      uc113.title = "GP report (UC113)";
      uc113.id = uuidv4();
      uc113.type = "uc113";
      data.events.push(uc113);
      data.noOfEvents.uc113++;
    }
    data.lastAdded = uc113.id;
    data.error = 0;
  }
  else
  {
    data.error = 1;
    res.redirect('/timeline/foc/uc113');
  }
  sortChrono(data.events);
  if(data.cya == "true")
    res.redirect('/timeline/11-check-answers');
  else
    res.redirect('/timeline/foc/index');
})

router.get('/timeline/foc/uc113',(req,res) => {
  const {data} = req.session;
  var error = data.error;
  data.lastAdded = -1;
  res.render('./timeline/foc/uc113',{error});
})


router.post('/timeline/foc/addOriginalClaim',(req,res) => {
  const { data } = req.session;
  let newFact1 = {};
  var originalClaim;

  if(data.edit == 1)
  {
    originalClaim = data.events.find(o => o.id === data.events[data.editOClaimIndex].id);
  }
  else
  {
    originalClaim = newFact1;
  }

  if ( data.claimDay && data.claimMonth && data.claimYear)
  {
    originalClaim.day = data.claimDay;
    originalClaim.month = data.claimMonth;
    originalClaim.year = data.claimYear;
    originalClaim.date = originalClaim.day + " " + convertMonth(originalClaim.month) + " " + originalClaim.year;
    if(data.edit != 1)
    {
      originalClaim.details = {};
      originalClaim.details.conditionsExists = data.originalClaimConditionsExist;
      originalClaim.id = uuidv4();
      originalClaim.groupID = originalClaim.id;
      originalClaim.title = "Date of claim";
      originalClaim.type = "originalClaim";
      data.events.push(originalClaim);
      data.noOfEvents.originalClaim++;
    }
    else {
      originalClaim.details.conditionsExists = data.originalClaimConditionsExist;
      originalClaim.details.OCConditions = null;
      originalClaim.details.OCEvidence = null;
    }
    data.error = 0;
  }
  else {
    data.error = 1;
    res.redirect('/timeline/foc/originalClaim');
  }

  data.lastAdded = originalClaim.id;
  sortChrono(data.events);
  if(data.originalClaimConditionsExist == "Yes"){
    data.originalClaim = originalClaim;
    res.redirect('/timeline/foc/originalClaimConditions');
  }
  else {
  console.log(data.target);
    if(data.cya =="true")
      res.redirect('/timeline/11-check-answers');
    else
      res.redirect('/timeline/foc/index');
  }
})

router.get('/timeline/foc/originalClaim',(req,res)=>{
  const {data} = req.session;
  data.lastAdded = -1;
  res.render('./timeline/foc/originalClaim',{data});
})

router.get('/timeline/foc/originalClaimConditions',(req,res)=>{
  const {data} = req.session;
  res.render('./timeline/foc/originalClaimConditions',{data});
})

router.post('/timeline/foc/addOriginalClaimConditions',(req,res) => {
  const { data } = req.session;
  let targetEvent = data.events.find(o => o.id === data.claimID);
  console.log(data.claimID);
  if (data.conditionsString && data.evidence)
  {
    targetEvent.details.OCConditions = data.conditionsString;
    targetEvent.details.OCEvidence = data.evidence;
  }
  else {
    data.error=1;
    res.redirect('/timeline/foc/originalClaimConditions');
  }
  if(data.cya =="true")
    res.redirect('/timeline/11-check-answers');
  else
    res.redirect('/timeline/foc/index');
})

router.post('/timeline/foc/addCoc',(req,res) => {
  const { data } = req.session;
  let newFact = {};
  var coc;
  if(data.edit == 1)
  {
    coc = data.events.find(o => o.id === data.id);
  }
  else
  {
    coc = newFact;
  }

  if ( data.COCDay && data.COCMonth && data.COCYear && data.conditionsString && data.COCEvidence && data.COCRestrict)
  {
    coc.day = data.COCDay;
    coc.month = data.COCMonth;
    coc.year = data.COCYear;
    coc.date = coc.day + " " + convertMonth(coc.month) + " " + coc.year;
    coc.title = "Change to health or disability";
    coc.details = {};
    coc.details.COCConditions = data.conditionsString;
    coc.details.COCEvidence = data.COCEvidence;
    coc.details.COCRestrict = data.COCRestrict;
    if(data.edit != 1)
    {
      coc.id = uuidv4();
      coc.type = "coc";
      data.events.push(coc);
      data.noOfEvents.coc++;
    }
    data.lastAdded = coc.id;
    data.error = 0;
  }
  else
  {
    data.error = 1;
    res.redirect('/timeline/foc/coc');
  }
  sortChrono(data.events);
  if(data.cya =="true")
    res.redirect('/timeline/11-check-answers');
  else
    res.redirect('/timeline/foc/index');
})

router.get('/timeline/foc/coc',(req,res)=>{
  const {data} = req.session;
  data.lastAdded = -1;
  res.render('./timeline/foc/coc',{data});
})

router.get('/timeline/foc/hmctsReceipt',(req,res)=>{
  const {data} = req.session;
  data.lastAdded = -1;
  res.render('./timeline/foc/appealDates',{data});
})

router.get('/timeline/foc/dwpReceipt',(req,res)=>{
  const {data} = req.session;
  data.lastAdded = -1;
  res.render('./timeline/foc/appealDates',{data});
})

router.get('/timeline/foc/appelDates',(req,res)=>{
  const {data} = req.session;
  data.lastAdded = -1;
  res.render('./timeline/foc/appealDates',{data});
})

router.post('/timeline/foc/addAppealDates',(req,res) => {
  const { data } = req.session;
  let newFact1 = {};
  let newFact2 = {};

  var hmctsReceipt;
  var dwpReceipt;

  if(data.edit == 1)
  {
    hmctsReceipt = data.events.find(o => o.id === data.events[data.editHMCTSIndex].id);
    dwpReceipt = data.events.find(o => o.id === data.events[data.editDWPIndex].id);
  }
  else
  {
    hmctsReceipt = newFact1;
    dwpReceipt = newFact2;
  }

  if ( data.dateHMCTSDay && data.dateHMCTSMonth && data.dateHMCTSYear && data.dateDWPDay && data.dateDWPMonth && data.dateDWPYear)
  {
      hmctsReceipt.day = data.dateHMCTSDay;
      hmctsReceipt.month = data.dateHMCTSMonth;
      hmctsReceipt.year = data.dateHMCTSYear;
      hmctsReceipt.date = hmctsReceipt.day + " " + convertMonth(hmctsReceipt.month) + " " + hmctsReceipt.year;
      if(data.edit != 1)
      {
        hmctsReceipt.title = "Appeal received by HMCTS";
        hmctsReceipt.type = "hmctsReceipt";
        hmctsReceipt.id = uuidv4();
        hmctsReceipt.groupID = hmctsReceipt.id;
        data.events.push(hmctsReceipt);
      }

      dwpReceipt.day = data.dateDWPDay;
      dwpReceipt.month = data.dateDWPMonth;
      dwpReceipt.year = data.dateDWPYear;
      dwpReceipt.date = dwpReceipt.day + " " + convertMonth(dwpReceipt.month) + " " + dwpReceipt.year;
      if(data.edit != 1)
      {
        dwpReceipt.title = "Appeal received by DWP";
        dwpReceipt.type = "dwpReceipt";
        dwpReceipt.id = uuidv4();
        dwpReceipt.groupID = hmctsReceipt.id;
        data.events.push(dwpReceipt);
        data.noOfEvents.appeals++;
      }

      data.lastAdded = hmctsReceipt.id;
      data.error=0;
      sortChrono(data.events);
  }
  else {
    data.error = 1;
    res.redirect('/timeline/foc/mr');
  }
  if(data.cya =="true")
    res.redirect('/timeline/11-check-answers');
  else
    res.redirect('/timeline/foc/index');
})

router.get('/timeline/foc/mrDecision',(req,res)=>{
  const {data} = req.session;
  data.lastAdded = -1;
  res.render('./timeline/foc/mr',{data});
})

router.get('/timeline/foc/mr',(req,res)=>{
  const {data} = req.session;
  data.lastAdded = -1;
  res.render('./timeline/foc/mr',{data});
})

router.get('/timeline/foc/mrNotification',(req,res)=>{
  const {data} = req.session;
  data.lastAdded = -1;
  res.render('./timeline/foc/mr',{data});
})

router.post('/timeline/foc/addMR',(req,res) => {
  const { data } = req.session;
  let newFact1 = {};
  let newFact2 = {};
  let newFact3 = {};

  var mrRequest;
  var mrDecision;
  var mrNotification;

  if(data.edit == 1)
  {
    mrRequest = data.events.find(o => o.id === data.events[data.editMRIndex].id);
    mrDecision = data.events.find(o => o.id === data.events[data.editMRDecisionIndex].id);
    mrNotification = data.events.find(o => o.id === data.events[data.editMRNotificationIndex].id);
  }
  else
  {
    mrRequest = newFact1;
    mrDecision = newFact2;
    mrNotification = newFact3;
  }

  if ( data.dateMrDecisionDay && data.dateMrDecisionMonth && data.dateMrDecisionYear && data.dateMrNotificationDay && data.dateMrNotificationMonth && data.dateMrNotificationYear && data.mrAgreeOriginal)
  {

    mrDecision.day = data.dateMrDecisionDay;
    mrDecision.month = data.dateMrDecisionMonth;
    mrDecision.year = data.dateMrDecisionYear;
    mrDecision.date = mrDecision.day + " " + convertMonth(mrDecision.month) + " " + mrDecision.year;
    mrDecision.details = {};
    mrDecision.details.agree = data.mrAgreeOriginal;
    if(data.edit != 1)
    {
      mrDecision.title = "MR decision made";
      mrDecision.type = "mrDecision";
      mrDecision.id = uuidv4();
      mrDecision.groupID = mrDecision.id;
      data.events.push(mrDecision);
    }

    mrNotification.day = data.dateMrNotificationDay;
    mrNotification.month = data.dateMrNotificationMonth;
    mrNotification.year = data.dateMrNotificationYear;
    mrNotification.date = mrNotification.day + " " + convertMonth(mrNotification.month) + " " + mrNotification.year;
    if(data.edit != 1)
    {
      mrNotification.title = "MR notification sent";
      mrNotification.type = "mrNotification";
      mrNotification.id = uuidv4();
      mrNotification.groupID = mrDecision.id;
      data.events.push(mrNotification);
    }

    if(data.dateMrDay && data.dateMrMonth && data.dateMrYear)
    {
      mrRequest.day = data.dateMrDay;
      mrRequest.month = data.dateMrMonth;
      mrRequest.year = data.dateMrYear;
      mrRequest.date = mrRequest.day + " " + convertMonth(mrRequest.month) + " " + mrRequest.year;
      mrRequest.title = "MR requested by appellant";
      if(data.edit != 1)
      {
        mrRequest.id = uuidv4();
        mrRequest.groupID = mrDecision.id;
        mrRequest.type = "mr";
        data.events.push(mrRequest);
        data.noOfEvents.mr++;
      }
    }
      data.lastAdded = mrDecision.id;
      data.error=0;
      sortChrono(data.events);
  }
  else {
    data.error = 1;
    res.redirect('/timeline/foc/mr');
  }
  if(data.cya =="true")
    res.redirect('/timeline/11-check-answers');
  else
    res.redirect('/timeline/foc/index');
})

router.get('/timeline/foc/mr',(req,res)=>{
  const {data} = req.session;
  data.lastAdded = -1;
  res.render('./timeline/foc/mr',{data});
})

getOutcomeDecision = function(events){
  let fact = events.find(o => o.type === "originalDecision");
  return(fact.date);
};

getOutcomeNotification = function(events){
  let fact = events.find(o => o.type === "originalNotification");
  return(fact.date);
};

getMRDecision = function(events){
  let fact = events.find(o => o.type === "mrDecision");
  return(fact.date);
};

getMRNotification = function(events){
  let fact = events.find(o => o.type === "mrNotification");
  return(fact.date);
};

getHMCTSReceived = function(events){
  let fact = events.find(o => o.type === "hmctsReceipt");
  return(fact.date);
};

getDWPReceived = function(events){
  let fact = events.find(o => o.type === "dwpReceipt");
  return(fact.date);
};


module.exports = router;
