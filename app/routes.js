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



router.get('/mashup/table/health-conditions/index',(req,res,next) => {
  const { data } = req.session;
  const { edit, id } = req.query;
  const healthConditions = data.healthConditions;
  if(healthConditions)
    res.render('./mashup/table/health-conditions/index',{healthConditions});
  else
    res.render('./mashup/table/health-conditions/add-condition');
})

router.post('/mashup/table/health-conditions/add-condition',(req,res)=>{
  const { data } = req.session;
  if(!data.healthConditions){
    data.healthConditions = [];
  }
  let healthCondition = {};
  healthCondition.condition = data.conditionName;
  healthCondition.day = data.conditionDay;
  healthCondition.month = data.conditionMonth;
  healthCondition.year = data.conditionYear;
  healthCondition.date = data.conditionDay + " " + convertMonth(data.conditionMonth) + " " + data.conditionYear;
  healthCondition.restrictedWork = data.restrictedWork;
  healthCondition.fitNoteExists = data.fitNoteExists;

  if(data.fitNoteExists === "Yes"){
    healthCondition.fitNoteDay = data.fitNoteDay;
    healthCondition.fitNoteMonth = data.fitNoteMonth;
    healthCondition.fitNoteYear = data.fitNoteYear;
    healthCondition.fitNoteDate = data.fitNoteDay + " " + convertMonth(data.fitNoteMonth) + " " + data.fitNoteYear;
  }
  data.healthConditions.push(healthCondition);
  healthConditions = data.healthConditions;
  res.redirect('index');
})

//Classic timeline--------------------------------------------------------------

router.get('/mashup/time-line/index',(req,res,next) => {
  const { data } = req.session;
  const { edit, id } = req.query;

  if(!data.claimHistory){

    data.claimHistory = [];

    let appealHMCTS = {};
    appealHMCTS.day = '01';
    appealHMCTS.month = '08';
    appealHMCTS.year = '2022';
    appealHMCTS.dateType = "appealHMCTS";
    appealHMCTS.dateString = appealHMCTS.day + " " + convertMonth(appealHMCTS.month) + " " + appealHMCTS.year;
    appealHMCTS.title = "Appeal received by HMCTS";
    data.claimHistory.push(appealHMCTS);

    let appealDWP = {};
    appealDWP.day = "01";
    appealDWP.month = "08";
    appealDWP.year = "2022";
    appealDWP.dateType = "appealDWP";
    appealDWP.dateString = appealDWP.day + " " + convertMonth(appealDWP.month) + " " + appealDWP.year;
    appealDWP.title = "Appeal received by DWP";
    data.claimHistory.push(appealDWP);
  }
  res.render('./mashup/time-line/index', {data});
})

router.post('/mashup/time-line/add-date-selection', (req, res) => {
  const { data } = req.session;
  const dateChoice = data.dateType;

  if(dateChoice =="originalDecision")
    res.render('./mashup/time-line/add-original-decision');
  else if (dateChoice =="originalNotifcation")
    res.render('./mashup/time-line/add-original-notification');
  else if (dateChoice =="mrRequest")
    res.render('./mashup/time-line/add-mr-request');
  else if (dateChoice =="mrDecision")
    res.render('./mashup/time-line/add-mr-decision');
  else if (dateChoice =="mrNotification")
    res.render('./mashup/time-line/add-mr-notification');
})

router.post('/mashup/time-line/add-date',(req,res)=>{
  const { data } = req.session;

  if(data.day && data.month && data.year)
  {
    let eventDate = {};
    eventDate.day = data.day;
    eventDate.month = data.month;
    eventDate.year = data.year;
    eventDate.dateType = data.dateType;
    eventDate.dateString = data.day + " " + convertMonth(data.month) + " " + data.year;
    if(data.dateType == "originalDecisionDate")
      eventDate.title = "Original decision made";
    else if (data.dateType == "originalNotificationDate") {
      eventDate.title = "Original decision notification sent";
    }
    else if (data.dateType == "mrRequest") {
      eventDate.title = "MR requested by appellant";
    }
    else if (data.dateType == "mrDecision") {
      eventDate.title = "MR decision made";
      eventDate.agreeWithOriginal = data.agreeWithOriginal;
      eventDate.dualClaim = data.dualClaim;
    }
    else if (data.dateType == "mrNotification") {
      eventDate.title = "MR notification sent ";
    }
    data.claimHistory.push(eventDate);
  }
  sortChrono(data.claimHistory);
  res.redirect('index');
})

//Health Conditions for time line

router.get('/mashup/time-line/health-conditions/index',(req,res,next) => {
  const { data } = req.session;
  const { edit, id } = req.query;
  const healthConditions = data.healthConditions;
  if(healthConditions)
    res.render('./mashup/time-line/health-conditions/index',{healthConditions});
  else
    res.render('./mashup/time-line/health-conditions/add-condition');
})

router.post('/mashup/time-line/health-conditions/add-condition',(req,res)=>{
  const { data } = req.session;
  if(!data.healthConditions){
    data.healthConditions = [];
  }
  let healthCondition = {};
  healthCondition.condition = data.conditionName;
  healthCondition.day = data.conditionDay;
  healthCondition.month = data.conditionMonth;
  healthCondition.year = data.conditionYear;
  healthCondition.date = data.conditionDay + " " + convertMonth(data.conditionMonth) + " " + data.conditionYear;
  healthCondition.restrictedWork = data.restrictedWork;
  healthCondition.fitNoteExists = data.fitNoteExists;

  if(data.fitNoteExists === "Yes"){
    healthCondition.fitNoteDay = data.fitNoteDay;
    healthCondition.fitNoteMonth = data.fitNoteMonth;
    healthCondition.fitNoteYear = data.fitNoteYear;
    healthCondition.fitNoteDate = data.fitNoteDay + " " + convertMonth(data.fitNoteMonth) + " " + data.fitNoteYear;
  }
  data.healthConditions.push(healthCondition);
  healthConditions = data.healthConditions;
  res.redirect('index');
})

//Classic Table--------------------------------------------------------------

router.get('/mashup/table/index',(req,res,next) => {
  const { data } = req.session;
  const { edit, id } = req.query;

  if(!data.claimHistory){

    data.claimHistory = [];

    let appealHMCTS = {};
    appealHMCTS.day = '01';
    appealHMCTS.month = '08';
    appealHMCTS.year = '2022';
    appealHMCTS.dateType = "appealHMCTS";
    appealHMCTS.dateString = appealHMCTS.day + " " + convertMonth(appealHMCTS.month) + " " + appealHMCTS.year;
    appealHMCTS.title = "Appeal received by HMCTS";
    data.claimHistory.push(appealHMCTS);

    let appealDWP = {};
    appealDWP.day = "01";
    appealDWP.month = "08";
    appealDWP.year = "2022";
    appealDWP.dateType = "appealDWP";
    appealDWP.dateString = appealDWP.day + " " + convertMonth(appealDWP.month) + " " + appealDWP.year;
    appealDWP.title = "Appeal received by DWP";
    data.claimHistory.push(appealDWP);
  }
  res.render('./mashup/table/index', {data});
})

router.post('/mashup/table/add-date-selection', (req, res) => {
  const { data } = req.session;
  const dateChoice = data.dateType;

  if(dateChoice =="originalDecision")
    res.render('./mashup/table/add-original-decision');
  else if (dateChoice =="originalNotifcation")
    res.render('./mashup/table/add-original-notification');
  else if (dateChoice =="mrRequest")
    res.render('./mashup/table/add-mr-request');
  else if (dateChoice =="mrDecision")
    res.render('./mashup/table/add-mr-decision');
  else if (dateChoice =="mrNotification")
    res.render('./mashup/table/add-mr-notification');
})

router.post('/mashup/table/add-date',(req,res)=>{
  const { data } = req.session;

  if(data.day && data.month && data.year)
  {
    let eventDate = {};
    eventDate.day = data.day;
    eventDate.month = data.month;
    eventDate.year = data.year;
    eventDate.dateString = data.day + " " + convertMonth(data.month) + " " + data.year;
    eventDate.dateType = data.dateType;
    if(data.dateType == "originalDecisionDate")
      eventDate.title = "Original decision made";
    else if (data.dateType == "originalNotificationDate") {
      eventDate.title = "Notification sent";
    }
    else if (data.dateType == "mrRequest") {
      eventDate.title = "MR requested by appellant";
    }
    else if (data.dateType == "mrDecision") {
      eventDate.title = "MR decision made";
      eventDate.agreeWithOriginal = data.agreeWithOriginal;
      eventDate.dualClaim = data.dualClaim;
    }
    else if (data.dateType == "mrNotification") {
      eventDate.title = "MR notification sent ";
    }
    data.claimHistory.push(eventDate);
  }
  sortChrono(data.claimHistory);
  res.redirect('index');
})


router.get('/mashup/health-conditions/index',(req,res,next) => {
  const { data } = req.session;
  const { edit, id } = req.query;
  const healthConditions = data.healthConditions;
  if(healthConditions)
    res.render('./mashup/health-conditions/index',{healthConditions});
  else
    res.render('./mashup/health-conditions/add-condition');
})

router.post('/mashup/health-conditions/add-condition',(req,res)=>{
  const { data } = req.session;
  if(!data.healthConditions){
    data.healthConditions = [];
  }
  let healthCondition = {};
  healthCondition.condition = data.conditionName;
  healthCondition.day = data.conditionDay;
  healthCondition.month = data.conditionMonth;
  healthCondition.year = data.conditionYear;
  healthCondition.date = data.conditionDay + " " + convertMonth(data.conditionMonth) + " " + data.conditionYear;
  healthCondition.restrictedWork = data.restrictedWork;
  healthCondition.fitNoteExists = data.fitNoteExists;

  if(data.fitNoteExists === "Yes"){
    healthCondition.fitNoteDay = data.fitNoteDay;
    healthCondition.fitNoteMonth = data.fitNoteMonth;
    healthCondition.fitNoteYear = data.fitNoteYear;
    healthCondition.fitNoteDate = data.fitNoteDay + " " + convertMonth(data.fitNoteMonth) + " " + data.fitNoteYear;
  }
  data.healthConditions.push(healthCondition);
  healthConditions = data.healthConditions;
  res.redirect('index');
})


//Classic timeline--------------------------------------------------------------

router.get('/mashup/claim-history-classic/index',(req,res,next) => {
  const { data } = req.session;
  const { edit, id } = req.query;

  if(!data.claimHistory){

    data.claimHistory = [];

    let appealHMCTS = {};
    appealHMCTS.day = '01';
    appealHMCTS.month = '08';
    appealHMCTS.year = '2022';
    appealHMCTS.dateType = "appealHMCTS";
    appealHMCTS.dateString = appealHMCTS.day + " " + convertMonth(appealHMCTS.month) + " " + appealHMCTS.year;
    appealHMCTS.title = "Appeal received by HMCTS";
    data.claimHistory.push(appealHMCTS);

    let appealDWP = {};
    appealDWP.day = "01";
    appealDWP.month = "08";
    appealDWP.year = "2022";
    appealDWP.dateType = "appealDWP";
    appealDWP.dateString = appealDWP.day + " " + convertMonth(appealDWP.month) + " " + appealDWP.year;
    appealDWP.title = "Appeal received by DWP";
    data.claimHistory.push(appealDWP);
  }
  res.render('./mashup/claim-history-classic/index');
})

router.post('/mashup/claim-history-classic/add-date-selection', (req, res) => {
  const { data } = req.session;
  const dateChoice = data.dateType;

  if(dateChoice =="originalDecision")
    res.render('./mashup/claim-history-classic/add-original-decision');
  else if (dateChoice =="originalNotifcation")
    res.render('./mashup/claim-history-classic/add-original-notification');
  else if (dateChoice =="mrRequest")
    res.render('./mashup/claim-history-classic/add-mr-request');
  else if (dateChoice =="mrDecision")
    res.render('./mashup/claim-history-classic/add-mr-decision');
  else if (dateChoice =="mrNotification")
    res.render('./mashup/claim-history-classic/add-mr-notification');
})

router.post('/mashup/claim-history-classic/add-date',(req,res)=>{
  const { data } = req.session;

  if(data.day && data.month && data.year)
  {
    let eventDate = {};
    eventDate.day = data.day;
    eventDate.month = data.month;
    eventDate.year = data.year;
    eventDate.dateType = data.dateType;
    eventDate.dateString = data.day + " " + convertMonth(data.month) + " " + data.year;
    if(data.dateType == "originalDecisionDate")
      eventDate.title = "Original decision made";
    else if (data.dateType == "originalNotificationDate") {
      eventDate.title = "Original decision notification sent";
    }
    else if (data.dateType == "mrRequest") {
      eventDate.title = "MR requested by appellant";
    }
    else if (data.dateType == "mrDecision") {
      eventDate.title = "MR decision made";
      eventDate.agreeWithOriginal = data.agreeWithOriginal;
      eventDate.dualClaim = data.dualClaim;
    }
    else if (data.dateType == "mrNotification") {
      eventDate.title = "MR notification sent ";
    }
    data.claimHistory.push(eventDate);
  }
  sortChrono(data.claimHistory);
  res.redirect('index');
})

//Classic Table--------------------------------------------------------------

router.get('/mashup/claim-history-table/index',(req,res,next) => {
  const { data } = req.session;
  const { edit, id } = req.query;

  if(!data.claimHistory){

    data.claimHistory = [];

    let appealHMCTS = {};
    appealHMCTS.day = '01';
    appealHMCTS.month = '08';
    appealHMCTS.year = '2022';
    appealHMCTS.dateType = "appealHMCTS";
    appealHMCTS.dateString = appealHMCTS.day + " " + convertMonth(appealHMCTS.month) + " " + appealHMCTS.year;
    appealHMCTS.title = "Appeal received by HMCTS";
    data.claimHistory.push(appealHMCTS);

    let appealDWP = {};
    appealDWP.day = "01";
    appealDWP.month = "08";
    appealDWP.year = "2022";
    appealDWP.dateType = "appealDWP";
    appealDWP.dateString = appealDWP.day + " " + convertMonth(appealDWP.month) + " " + appealDWP.year;
    appealDWP.title = "Appeal received by DWP";
    data.claimHistory.push(appealDWP);
  }
  res.render('./mashup/claim-history-table/index', {data});
})

router.post('/mashup/claim-history-table/add-date-selection', (req, res) => {
  const { data } = req.session;
  const dateChoice = data.dateType;

  if(dateChoice =="originalDecision")
    res.render('./mashup/claim-history-table/add-original-decision');
  else if (dateChoice =="originalNotifcation")
    res.render('./mashup/claim-history-table/add-original-notification');
  else if (dateChoice =="mrRequest")
    res.render('./mashup/claim-history-table/add-mr-request');
  else if (dateChoice =="mrDecision")
    res.render('./mashup/claim-history-table/add-mr-decision');
  else if (dateChoice =="mrNotification")
    res.render('./mashup/claim-history-table/add-mr-notification');
})

router.post('/mashup/claim-history-table/add-date',(req,res)=>{
  const { data } = req.session;

  if(data.day && data.month && data.year)
  {
    let eventDate = {};
    eventDate.day = data.day;
    eventDate.month = data.month;
    eventDate.year = data.year;
    eventDate.dateString = data.day + " " + convertMonth(data.month) + " " + data.year;
    eventDate.dateType = data.dateType;
    if(data.dateType == "originalDecisionDate")
      eventDate.title = "Original decision made";
    else if (data.dateType == "originalNotificationDate") {
      eventDate.title = "Notification sent";
    }
    else if (data.dateType == "mrRequest") {
      eventDate.title = "MR requested by appellant";
    }
    else if (data.dateType == "mrDecision") {
      eventDate.title = "MR decision made";
      eventDate.agreeWithOriginal = data.agreeWithOriginal;
      eventDate.dualClaim = data.dualClaim;
    }
    else if (data.dateType == "mrNotification") {
      eventDate.title = "MR notification sent ";
    }
    data.claimHistory.push(eventDate);
  }
  sortChrono(data.claimHistory);
  res.redirect('index');
})

router.post('/mashup/05-decision-dates',(req,res)=>{
  res.render('./mashup/01-task-list-new');
})






//////////////////////////////////////////////////////////////////////For forms


// UC 50

router.get('/s24/09-uc50-exists',(req,res,next)=>{
  const { data } = req.session;
  const {change,target} = req.query;

  if (data.uc50Exists == "Yes") {
    if( change == 1 )
      res.render('./s24/09-uc50-exists',{target});
    else
      res.render('./s24/09-uc50-summary',{target});
  }
  else
    res.render('./s24/09-uc50-exists',{target});
})

router.post('/s24/09-uc50-exists',(req,res)=>{
  const { data } = req.session;
  const {target} = req.query;
  if(data.uc50Exists == "No" || data.uc50Exists == "Yes, we do not have a copy of it"){
    if(target=='cya')
      res.render('./s24/11-check-answers');
    else
      res.render('./s24/01-task-list-new');
  }
  else if (data.uc50Exists == "Yes") {
    res.render('./s24/09-uc50',{target});
  }
})


//Health Conditions for table

router.get('/s24/health-conditions/index',(req,res,next) => {
  const { data } = req.session;
  const { edit, id, target } = req.query;
  const healthConditions = data.healthConditions;
  let targetURL = "";
  if(target == 'cya')
  {
    targetURL = "../11-check-answers";
  }
  else {
    targetURL = "../01-task-list-new";
  }

  if(healthConditions)
  {
    res.render('./s24/health-conditions/index',{healthConditions,targetURL});
  }
  else
    res.render('./s24/health-conditions/add-condition');
})

router.get('/s24/health-conditions/add-condition',(req,res,next) => {
  const { data } = req.session;
  const { change, id, target } = req.query;

  let condition = {};
  if(change==1)
  {
    condition = data.healthConditions[id];
    condition.id = id;
    condition.change = change;
    condition.target = target;
    res.render('./s24/health-conditions/add-condition',{condition});
  }
  else
    res.render('./s24/health-conditions/add-condition');
})

router.post('/s24/health-conditions/add-condition',(req,res)=>{
  const { data } = req.session;
  const { change, id, target } = req.query;

  if(!data.healthConditions){
    data.healthConditions = [];
  }
  let healthCondition = {};
  healthCondition.condition = data.conditionName;
  healthCondition.day = data.conditionDay;
  healthCondition.month = data.conditionMonth;
  healthCondition.year = data.conditionYear;
  healthCondition.date = data.conditionDay + " " + convertMonth(data.conditionMonth) + " " + data.conditionYear;
  healthCondition.restrictedWork = data.restrictedWork;
  healthCondition.fitNoteExists = data.fitNoteExists;

  if(data.fitNoteExists === "Yes"){
    healthCondition.fitNoteDay = data.fitNoteDay;
    healthCondition.fitNoteMonth = data.fitNoteMonth;
    healthCondition.fitNoteYear = data.fitNoteYear;
    healthCondition.fitNoteDate = data.fitNoteDay + " " + convertMonth(data.fitNoteMonth) + " " + data.fitNoteYear;
  }

  if (change == 1) {
    data.healthConditions.splice(id,1);
  }

  data.healthConditions.push(healthCondition);
  healthConditions = data.healthConditions;


  if(target == 'cya')
    res.redirect('../11-check-answers');
  else
    res.redirect('index');
})


router.post('/s24/05-decision-dates',(req,res)=>{
  const { target } = req.query;
  let { data } = req.session;

  data.dateCliamToUCDate = data.dateCliamToUCDay + " " + convertMonth(data.dateCliamToUCMonth) + " " + data.dateCliamToUCYear;
  data.dateOriginalDecisionDate = data.dateOriginalDecisionDay + " " + convertMonth(data.dateOriginalDecisionMonth) + " " + data.dateOriginalDecisionYear;
  data.dateOriginalNotifcationDate = data.dateOriginalNotifcationDay + " " + convertMonth(data.dateOriginalNotifcationMonth) + " " + data.dateOriginalNotifcationYear;
  data.dateMrDate = data.dateMrDay + " " + convertMonth(data.dateMrMonth) + " " + data.dateMrYear;
  data.dateMrDecisionDate = data.dateMrDecisionDay + " " + convertMonth(data.dateMrDecisionMonth) + " " + data.dateMrDecisionYear;
  data.dateMrNotificationDate = data.dateMrNotificationDay + " " + convertMonth(data.dateMrNotificationMonth) + " " + data.dateMrNotificationYear;
  data.dateHmctsAppealDate = data.dateHmctsAppealDay + " " + convertMonth(data.dateHmctsAppealMonth) + " " + data.dateHmctsAppealYear;
  data.dateDwpAppealDate = data.dateDwpAppealDay + " " + convertMonth(data.dateDwpAppealMonth) + " " + data.dateDwpAppealYear;


  if(target=='cya')
    res.render('./s24/11-check-answers',{data});
  else
    res.render('./s24/01-task-list-new');
})

router.get('/s24/05-decision-dates',(req,res)=>{
  const { target } = req.query;
  res.render('./s24/05-decision-dates',{target});
})

router.get('/s24/06-dual-claim',(req,res)=>{
  const { target } = req.query;
  res.render('./s24/06-dual-claim',{target});
})

router.post('/s24/06-dual-claim',(req,res)=>{
  const { target } = req.query;
  const { data } = req.session;
  data.dateDualClaimDate = data.dualClaimDay + " " + convertMonth(data.dualClaimMonth) + " " + data.dualClaimYear;
  if(target=='cya')
    res.render('./s24/11-check-answers', {data});
  else
    res.render('./s24/01-task-list-new',{data});
})

router.get('/s24/14-descriptors',(req,res)=>{
  const { target } = req.query;
  res.render('./s24/14-descriptors',{target});
})

router.post('/s24/14-descriptors',(req,res)=>{
  const { target } = req.query;
  const { data } = req.session;
  if(target=='cya')
    res.render('./s24/11-check-answers', {data});
  else
    res.render('./s24/01-task-list-new',{data});
})

router.get('/s24/11-check-answers',(req,res)=>{
  const { data } = req.session;
  res.render('./s24/11-check-answers',{data});
})

router.get('/s24/10-uc113',(req,res)=>{
  const { target } = req.query;
  res.render('./s24/10-uc113',{target});
})

router.post('/s24/10-uc113',(req,res)=>{
  const { target } = req.query;
  const { data } = req.session;

  data.uc113Date = data.uc113Day + " " + convertMonth(data.uc113Month) + " " + data.uc113Year;
  console.log("The UC 113 date is " + data.uc113Date);

  if(target=='cya')
    res.render('./s24/11-check-answers');
  else
    res.render('./s24/01-task-list-new');
})

router.get('/s24/10-health-assessment',(req,res)=>{
  const { target } = req.query;
  res.render('./s24/10-health-assessment',{target});
})

router.post('/s24/10-health-assessment',(req,res)=>{
  const { target } = req.query;
  const { data } = req.session;

  data.hcpAssessmentDate = data.hcpAssessmentDay + " " + convertMonth(data.hcpAssessmentMonth) + " " + data.hcpAssessmentYear;

  if(target=='cya')
    res.render('./s24/11-check-answers');
  else
    res.render('./s24/01-task-list-new');
})

router.post('/s24/09-uc50-summary',(req,res)=>{
  console.log("I am in the post function of uc50  summary");
  const { target } = req.query;
  if(target=='cya')
    res.render('./s24/11-check-answers');
  else
    res.render('./s24/01-task-list-new');
})

router.post('/s24/09-uc50',(req,res)=>{
  const { target } = req.query;

  console.log("The target in the post function of uc50 is " + target);
  if(target=='cya')
    res.render('./s24/11-check-answers');
  else
    res.render('./s24/01-task-list-new');
})

router.get('/s24/06-dual-claim',(req,res)=>{
  const { target } = req.query;
  res.render('./s24/06-dual-claim',{target});
})

router.get('/s24/09-uc50',(req,res)=>{
  const { change,target } = req.query;
  res.render('./s24/09-uc50',{target,change});
})

router.get('/s24/13-timeline',(req,res,next)=>{
  const { data } = req.session;
  let listOfEvents = getAllEvents(data);
  sortChrono(listOfEvents);
  //console.log("The lenght of events is" + listOfEvents.length);
  res.render('./s24/13-timeline',{listOfEvents});
})

router.get('/s24/13-timeline-table',(req,res,next)=>{
  const { data } = req.session;
  let listOfEvents = getAllEvents(data);
  sortChrono(listOfEvents);
  //console.log("The lenght of events is" + listOfEvents.length);
  res.render('./s24/13-timeline-table',{listOfEvents});
})


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

router.get('/timeline/response',(req,res)=>{
  const { data } = req.session;
  var response = {};
  var i = 0;
  var section1Items = [
                        "Name",
                        "Address",
                        "NI NO",
                        "Date of birth",
                        "Benefit",
                        "Date of outcome decision",
                        "Date outcome decision notified",
                        "Date of mandatory reconsideration decision",
                        "Date of mandatory reconsideration decision notified",
                        "Date appeal received by HMCTS",
                        "Date appeal received by DWP"
                      ];
  var section1Values = [
                          "Jane Doe",
                          "72 Guild Street, London SE23 6FH",
                          "QQ 12 34 45 Q",
                          "4 June 1972",
                          "Universal Credit – Work Capability Assessment"
                        ];
  var factsText = [];
  var originalClaimText = {};
  var mrText = {};
  var mrDecisionText = {};
  var cocText = {};
  var decisionText = {};
  var assessmentText = {};
  var dualClaimText = {};
  var uc113Text = {};
  var uc50Text = {};
  var appealText = {};

  response.section1=[];
  response.section4=[];
  section1Values.push(getOutcomeDecision(data.events));
  section1Values.push(getOutcomeNotification(data.events));
  section1Values.push(getMRDecision(data.events));
  section1Values.push(getMRNotification(data.events));
  section1Values.push(getHMCTSReceived(data.events));
  section1Values.push(getDWPReceived(data.events));

  for(i = 0; i<section1Items.length; i++)
  {
    response.section1[i] = {};
    response.section1[i].label = section1Items[i];
    response.section1[i].value = section1Values[i];
  }

  originalClaimText.type = "originalClaim";
  originalClaimText.text = "[-NAME-] made a claim to Universal Credit (UC). On [-NAME-]’s declaration they declared they did not have a health condition which restricts their ability to take up or look for work.";
  factsText.push(originalClaimText);

  mrText.type = "mr";
  mrText.text = "[-NAME-] requested a Mandatory Reconsideration of the decision.";
  factsText.push(mrText);

  mrDecisionText.type = "mrDecision";
  mrDecisionText.text = "Another Decision Maker looked at the decision and agreed with the HCP and previous decision maker. The activities considered are on pages [-------INSERT PAGE NUMBERS HERE-------] of the bundle. The decision in full is attached.";
  factsText.push(mrDecisionText);

  cocText.type = "coc";
  cocText.text = "xxx reported a change of health and disability and provided valid medical evidence. Their conditions were [-CONDITIONS-]. This was an application by xxx for an LCW / LCWRA element to be included in the award amounts of UC.";
  factsText.push(cocText);

  decisionText.type = "decision";
  decisionText.text = "The Decision Maker then carried out an assessment of [-NAME-] capability for work. Taking all the available evidence into account they decided that [-NAME-] scored [-PHYSICAL POINTS-] points on the physical and [-MENTAL POINTS-] points on the mental descriptors and it was also determined that they did not meet any of the “treated as” provisions in terms of LCW. The activities considered are on pages [-------INSERT PAGE NUMBERS HERE-------] of the bundle. The decision in full is attached.";
  factsText.push(decisionText);

  assessmentText.type = "assessment";
  assessmentText.text = "[-NAME-] was assessed via [-ASSESSMENT TYPE-] by an approved Healthcare Professional (HCP) from The Centre for Health and Disability Assessments (CHDA) in connection with the WCA.<br>The HCP’s findings were that [-NAME-] did not have sufficient restriction of capability within the physical and mental health descriptors relevant to LCW. It was also the HCP’s findings that [-NAME-] did not meet any of the “treated as” provisions relevant to LCW.";
  factsText.push(assessmentText);

  uc113Text.type = "uc113";
  uc113Text.text = "[-NAME-]’s GP completed a UC113 regarding their health conditions and provided a GP Printout";
  factsText.push(uc113Text);

  uc50Text.type = "uc113";
  uc50Text.text = "[-NAME-] completed a UC50 medical questionnaire form which asks the claimant to provide information about their capability to perform activities to assess whether they have LCW. [-NAME-] identified difficulties with [-DIFFICULTIES-].";
  factsText.push(uc50Text);

  appealText.type = "hmctsReceipt";
  appealText.text = "[-NAME-] appealed against the decision and submitted an SSCS1. On receipt of the appeal, all the available evidence was reviewed, and a lapse was considered. The respondent is unable to revise the decision and therefore has prepared a response.";
  factsText.push(appealText);



  res.render('./timeline/response',{response});
})

module.exports = router;
