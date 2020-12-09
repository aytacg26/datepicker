const months = {
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  tr: [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ],

  de: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ],
  fr: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  it: [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ],
  es: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  el:[
    "Ιανουάριος",
    "Φεβρουάριος",
    "Μάρτιος",
    "Απρίλιος",
    "Μάιος",
    "Ιούνιος",
    "Ιούλιος",
    "Αύγουστος",
    "Σεπτέμβριος",
    "Οκτώβριος",
    "Νοέμβριος",
    "Δεκέμβριος"
  ]
};

const translations = {
  today:{
    en:"Today",
    tr:"Bugün",
    fr:"Aujourd'hui",
    es:"Hoy",
    de:"Heute",
    it:"Oggi"

  }
}

const settings = {
  language: "tr", //English - en, Turkish - tr
  type: "months", //months, date, dateTime
  monthLabelType: "short", //short=> Jan. Feb. Mar. Apr.; long=>January, February, March, April, May; string number => 01, 02, 03, 04,...,12
  idsAndValsForMonthType: "number", //number => string value : "01", "02", "03", ...., "12"; text => depending on month label type and Language (ex:en): "jan.", "feb."... or "january", "february"
  currentYearConstraint:true, //In month selection, if we want to prevent passed month selection in current year, this will be set to true, else it will be false
  maxYear:2101,
  minYear:getCurrentYear()
};


/**
 *  This function will create string numbers which will be used as label or other purposes in the module. The result will be
 *  an array of string numbers (ex: ["01", "02", "03", "04", "05"]) => 1 start and 5 is end number.
 *
 * @param {Number} start - For string numbers, it is the initial number which will be included in string numbers list (array)
 * @param {Number} end - For String numbers, it is the last number which will be included in the string numbers list (array)
 */
const createStringNum = (start = 1, end = 31) => {
  const stringNums = [];
  let stringNum = "";

  for (let i = start; i < end + 1; i++) {
    if (i.toString().length === 1) {
      stringNum = "0" + i;
    } else {
      stringNum = i.toString();
    }

    stringNums.push(stringNum);
  }

  return stringNums;
};




function getCurrentYear(){
  const today = new Date();
  const defaultYear = today.getFullYear();

  return defaultYear;
}

function getCurrentMonth(){
  const today = new Date();
  const defaultMonth = today.getMonth();
  const stringNums = createStringNum(1,12);

  const defaultMonthInText = months[settings.language][defaultMonth];
  const defaultMonthId = stringNums[defaultMonth];


  return {monthIndex:defaultMonth, monthText:defaultMonthInText, monthId:defaultMonthId};

}

function setDefaultMonthId(){

  const currentMonthObj = getCurrentMonth();
  const labelIndex = currentMonthObj["monthId"];
  
  return labelIndex;

}

function setDefaultMonthText(){

  const currentMonthObj = getCurrentMonth();
  const monthText = currentMonthObj["monthText"];

  return monthText;

}

function setDefaultMonthIndex(){
  const currentMonthObj = getCurrentMonth();
  const monthIndex = currentMonthObj["monthIndex"];

  return monthIndex;
}

const defaultDate = ()=>{

  const year = getCurrentYear();
  const month = setDefaultMonthText();
  const presenter = document.getElementById("date-picker-input");
  presenter.value = `${month} ${year}`;

}

const getSelectedMonth = ()=>{
  
}


const windowDefaultYearInput = document.getElementById("year-value");
windowDefaultYearInput.value = getCurrentYear();
defaultDate();

/**
 * Gets the type of date picker - datepicker can be months like in HTML5, date same as in HTML5 or dateTime again same as with HTML5 date-time
 * a private function
 */
const getType = () => {
  const datePickerType = settings["type"];

  return datePickerType;
};

/**
 * Gets the date-picker language from settings object.
 * a private function
 */
const getLanguage = () => {
  const lang = settings["language"];
  return lang;
};

/**
 * Gets the label type from settings object. Labels can be short (ex:"jan."), long (full month name) and string representation of month number (ex: "01").
 * A private function
 */
const getMonthLabelType = () => {
  const labelType = settings["monthLabelType"];

  return labelType;
};

/**
 * This function will help us to get selected year, but because it is possible to change this value from console,
 * we have to create another function to prevent changes from console.
 */
const selectedYear = ()=>{

  const targetInput = document.getElementById("year-value");
  const year = targetInput.value;

  return year;
}


const checkYearValue = ()=>{
  const maxYear =settings.maxYear;
  const minYear = settings.minYear;
  const year = parseInt(selectedYear());
  const validValue = year>=minYear && year<=maxYear && !isNaN(year);

  if(validValue){

    return year;

  }else{

    return minYear;

  }
  



}


const getSelectedYear = ()=>{

  return checkYearValue();

}

/**
 * Gets the required Ids and Values Format for Month Type, these will be used as Id and value for input[type='radio'] and also label for="" attribute.
 * a private function
 */
const getIdsAndValsForMonths = () => {
  const iVFM = settings["idsAndValsForMonthType"];

  return iVFM;
};




/**
 * According to the language and monthLabelType in settings, it will generate the labels that will be seen in UI by users. This is a private function
 * @param {String} language - language for labels, it will be assigned in settings object.
 */
const generateMonthLabels = (language) => {
  const labelType = getMonthLabelType();
  const monthsArr = months[language];
  const labels = [];

  switch (labelType) {
    case "long":
      monthsArr.forEach((month) => labels.push(month));
      break;

    case "number":
      //USE createStringNum function here....
      const stringNums = createStringNum(1, 12);
      stringNums.forEach((num) => {
        labels.push(num);
      });
      break;

    default:
      monthsArr.forEach((month) => {
        if (month.length > 3) {
          const short = month.substring(0, 3);
          const label = short + ".";
          labels.push(label);
        } else {
          labels.push(month);
        }
      });
      break;
  }

  return labels;
};

/**
 * This function will create input[type="radio"] element for month or day of month selection on datepicker window.
 * @param {String | Number} id - id attribute of created input[type="radio"] element
 * @param {String | Number} value - value attribute or value of created input[type="radio"] element
 * @param {String} name - name attribute of created input[type="radio"] element, for months; it will be "months", for date; it will be "days"
 */
const createRadioElement = (id, value, name) => {
  const input = document.createElement("input");
  input.setAttribute("type", "radio");
  input.setAttribute("id", id);
  input.setAttribute("value", value);
  input.setAttribute("name", name);

  return input;
};

/**
 * This function will use createRadioElement private function to create input and also will add label to the input element to complete the datepicker window.
 * this function is a single private function which will be used in createMonthOptions and createDayOptions functions to create complete datepicker window.
 * @param {String | Number} id -   id attribute of created input[type="radio"] element and also will be used on for attribute of label
 * @param {String | Number} value - value attribute or value of created input[type="radio"] element
 * @param {String} name -  name attribute of created input[type="radio"] element, for months; it will be "months", for date; it will be "days"
 * @param {String} text - label text this will be name of month or name of day or date in number
 */
const generateOption = (id, value, name, text, defaultMonthId=0) => {
  const inputNode = createRadioElement(id, value, name);
  const labelNode = document.createElement("label");
  const textNode = document.createTextNode(text);
  labelNode.setAttribute("for", id);
  labelNode.appendChild(textNode);
  labelNode.appendChild(inputNode);

  if(defaultMonthId!==0 && id===defaultMonthId){

    const labelType = getMonthLabelType();

    if(labelType==="short" || labelType==="number"){
      labelNode.classList.add("checked");
    }else if(labelType==="long"){

      labelNode.classList.add("checked-long");

    }
   
    

  }




  return labelNode;
};

const generateIdsAndValsForMonths = () => {
  const iVFM = getIdsAndValsForMonths(); //iVFM => ids and values for months type datepicker
  const lang = getLanguage();

  switch (iVFM) {
    case "text":
      const idsAndVals = generateMonthLabels(lang).map((label) =>
        label.toLowerCase()
      );
      return idsAndVals;

    default:
      return createStringNum(1, 12);
  }
};

/**
 * Function will create Month Options for "month" type datepicker
 */
const createMonthOptions = () => {
  const language = getLanguage();
  const monthLabels = generateMonthLabels(language);
  const iVFM = generateIdsAndValsForMonths();
  const defaultMonthId = setDefaultMonthId();
  const defaultMonthIndex = setDefaultMonthIndex();
  const selectedYear = getSelectedYear();
  const currentYear = getCurrentYear()
  const labelTags = [];

  iVFM.forEach((iv, index) => {
    console.log(selectedYear);
    console.log(currentYear);
  
      const labelTag = generateOption(iv, iv, "months", monthLabels[index], defaultMonthId);
      labelTags.push(labelTag);

   
  });

  return labelTags;
};

const appendOptions = (containerClass = "months-display") => {
  const datePickerType = getType();
  const container = document.querySelector(`.${containerClass}`);
  const options = createMonthOptions();

  options.forEach((option) => {
    container.appendChild(option);
  });

  /**
   * Module will need more and more functions to have complete datepicker
   * if type => months use createMonthOptions
   * if type => date use createDaysOptions
   */
};

const clearOptions = (containerClass="months-display")=>{

    document.querySelector(`.${containerClass}`).innerHTML="";

}


appendOptions();

const datePicker = document.querySelector("#date-picker-input");
const pickerWindow = document.querySelector(".date-picker-window");
const option = document.querySelectorAll(".months-display label");
const calenderClose = document.querySelector(".calender-close");
const yearChanger = document.querySelectorAll(".icon");
const yearVal = document.getElementById("year-value");

datePicker.onfocus = () => {

  const isOpened = calenderClose.childNodes[0].classList.contains("circle-close");

  if(!isOpened){
    datePicker.classList.add("focused");
    pickerWindow.classList.add("focused");
    calenderClose.childNodes[0].classList.remove("calender");
    calenderClose.childNodes[0].classList.add("circle-close");
    calenderClose.childNodes[0].setAttribute("style", "font-size:17px; color:#ff4500;")
  }

};


calenderClose.onclick = ()=>{

  const isOpened = calenderClose.childNodes[0].classList.contains("circle-close");

  if(!isOpened){
    datePicker.classList.add("focused");
    pickerWindow.classList.add("focused");
    calenderClose.childNodes[0].classList.remove("calender");
    calenderClose.childNodes[0].classList.add("circle-close");
    calenderClose.childNodes[0].setAttribute("style", "font-size:17px; color:#ff4500;")
  }else{

    datePicker.classList.remove("focused");
    pickerWindow.classList.remove("focused");
    calenderClose.childNodes[0].classList.add("calender");
    calenderClose.childNodes[0].classList.remove("circle-close");
    calenderClose.childNodes[0].removeAttribute("style", "font-size:17px; color:#ff4500;")
  }




}

document.onkeyup = (e)=>{

  const isOpened = calenderClose.childNodes[0].classList.contains("circle-close");

  if(e.key==="Escape" && isOpened){
    datePicker.classList.remove("focused");
    pickerWindow.classList.remove("focused");
    calenderClose.childNodes[0].classList.add("calender");
    calenderClose.childNodes[0].classList.remove("circle-close");
    calenderClose.childNodes[0].removeAttribute("style", "font-size:17px; color:#ff4500;")
  }


}

const checkSelectedOption = (opt)=>{

  const type = getMonthLabelType();
  const option = document.querySelectorAll(".months-display label");

  if(type.toLowerCase()==="short" || type.toLowerCase()==="number"){
    option.forEach(o=>o.classList.remove("checked"));
    opt.classList.add("checked");
 
  }else{
    option.forEach(o=>o.classList.remove("checked-long"));
    opt.classList.add("checked-long");

  }



}



option.forEach((op, index)=>{
   
  op.addEventListener("click", (e)=>{

    

    if(e.target.nodeName==="LABEL"){

      const currentYear = getCurrentYear();
      const currentMonth = setDefaultMonthIndex();
      const selectedYear = getSelectedYear();
      const isCurrentYear = currentYear === selectedYear;

    

      if(settings.currentYearConstraint){
   
        if(index>=currentMonth && isCurrentYear){
          checkSelectedOption(op);
        }else if(!isCurrentYear){
          checkSelectedOption(op);
        }
       
      }else{
        checkSelectedOption(op);
      }


    }else{
      e.stopPropagation();
      return false;
    }
    

  })

});

yearChanger.forEach((yc, index)=>{

  yc.addEventListener("click", ()=>{

      const targetIndex = index; //index-0 left, index-1 right
      const year = getSelectedYear();
      const currentYear = getCurrentYear();

      let val = year;
      const minYear = settings.minYear;
      const maxYear = settings.maxYear;
      const target = document.getElementById("year-value");
  

      if(targetIndex===0 && val>minYear){
        target.value = val-1;
        
      }else if(targetIndex===1 && val<maxYear){
        target.value = val+1;
      
      }
      
      option.forEach(o=>o.classList.remove("checked"));
      option[0].classList.add("checked");
      const newYear = getSelectedYear();

      if(newYear!==currentYear){

        checkSelectedOption(option[0]);

      }else{

        const currentMonth = getCurrentMonth();
        const index = currentMonth["monthIndex"];
        checkSelectedOption(option[index]);


      }
      


    
  })


});

