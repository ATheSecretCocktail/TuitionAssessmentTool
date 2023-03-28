var form1Names = ["Theory", "Lab", "Clinical"];
var form2Names = ["Length Of Course", "Hourly Rate For Class Ins", "Hourly Rate For Clinical Instructor", "Maximum Number Of Students Per Class Instructor", "Maximum Number Of Students Per Clinical Instructor", "Maximum Number Of Enrolled Students Per Course"];
var global1Names = ["Rent", "Utilities", "Professional Liability Insurance", "Student Insurance (Surety Board)", "Lab Supplies"];
var global2Names = ["Program Coordinator Salary", "Secretary Salary", "Marketing", "Loan Repayment", "Other"];
var form5Names = ["Application Fee", "Textbook", "Uniform", "I.D. Badge", "Blood Pressure Cuff & Stethoscope", "Second Hand Watch"];
var form6Names = ["State Competency Examination", "CPR Certification", "Background Check", "PPD Test", "Drug Screening", "CNA Registration Fee"];
var currentForm;
var validCourses = [];

var form1Default = [75,0,40];
var form2Default = [4,20,20,10,10,10];
var global1Default = [1500,300,25,25,100];
var global2Default = [4000,1000,1000,0,100];
var form5Default = [50,35,30,5,17,5];
var form6Default = [125,65,25,10,50,50];

window.onbeforeunload = function() {
    switch (getPage()) {
        case 1:
            form1Save();
            break;
        case 2:
            form2Save();
            break;
        case 3:
            global1Save();
            break;
        case 4:
            global2Save();
            break;
        case 5:
            form5Save();
            break;
        case 6:
            form6Save();
            break;
        case 7:
            overviewSave();
            break;
        case 8:
            courseOptionSave();
        default:
            // Not a form page, so no need to save any inputs.
            break;
    }
}

// Made new getPage() to return page instead of using currentForm. getPage allows onbeforeload to check for pages other than form pages (-1), since we don't want to save a page if we're not on it.
function getPage() {
    // does this need to be changed? other methods using pathname had problems
    switch (window.location.pathname) {
        case "/form.html":
            return 1;
        case "/form2.html":
            return 2;
        case "/global1.html":
            return 3;
        case "/global2.html":
            return 4;
        case "/form5.html":
            return 5;
        case "/form6.html":
            return 6;
        case "/overview.html":
            return 7;
        case "/courseOption.html":
            return 8;
        default:
            return -1;
    }
}

function inputsAreValid(inputs) {
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i] == '' || (parseInt(inputs[i]) < 0)) {
            return false;
        }
    }
    return true;
}

function goToDesiredTuition() {
    window.location.href = "desiredTuition.html";
    return;
}


function submit() {
    window.location.href = "report.html";
    return;
}

//sets the cookie using the course number, variable name, and value
function setCookie(name,value) {
    document.cookie = name + "=" + (value || "") + "; path=/";
}

function getCookie(name) {
    var currName = name + "=";
    var allCookie = document.cookie.split(';');
    for(var i=0; i < allCookie.length;i++) {
        var c = allCookie[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(currName) == 0) return c.substring(currName.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function courseOptionSave() {
    inputs = [];
    checkboxes = [];
    input = document.getElementById("Licensing Fee").value;
    inputs.push(input);
    for (let i = 1; i <= 3; i++) {
        if (document.getElementById("input" + i).checked) {
            var fullName = "course" + getCookie("currentCourse") + "Course Option";
            setCookie(fullName, document.getElementById("input" + i).value);
        }
    }
    var fullName = "course" + getCookie("currentCourse") + "Licensing Fee";
    if (document.getElementById("input2").checked) {
        if(inputsAreValid(inputs)) {
            setCookie(fullName, inputs[0]);
        }
    }
    if (!document.getElementById("input2").checked) {
        if (document.getElementById("input1").checked || document.getElementById("input3").checked) {
            eraseCookie(fullName);
        return true;
        } else {
            return false;
        }
    }
    return inputsAreValid(inputs);
}

function form1Save() {
    inputs = []
    // Add all inputs to an array.
    for (var i = 1; i <= form1Names.length; i++) {
        input = document.getElementById("input" + i).value;
        inputs.push(input);
    }

    // Set cookies for all inputs that are valid.
    for (var i = 0; i < inputs.length; i++) {
        if (inputsAreValid([inputs[i]]))
        var fullName = "course" + getCookie("currentCourse") + form1Names[i];
            setCookie(fullName, inputs[i]);
    }

    // Return if all inputs are valid
    return inputsAreValid(inputs);
}

function form2Save() {
    inputs = []
    // Add all inputs to an array.
    for (var i = 1; i <= form2Names.length; i++) {
        input = document.getElementById("input" + i).value;
        inputs.push(input);
    }

    // Set cookies for all inputs that are valid.
    for (var i = 0; i < inputs.length; i++) {
        if (inputsAreValid([inputs[i]]))
        var fullName = "course" + getCookie("currentCourse") + form2Names[i];
            setCookie(fullName, inputs[i]);
    }

    // Return if all inputs are valid
    return inputsAreValid(inputs);
}

function global1Save() {
    inputs = []
    // Add all inputs to an array.
    for (var i = 1; i <= global1Names.length; i++) {
        input = document.getElementById("input" + i).value;
        inputs.push(input);
    }

    // Set cookies for all inputs that are valid.
    for (var i = 0; i < inputs.length; i++) {
        if (inputsAreValid([inputs[i]]))
            setCookie(global1Names[i], inputs[i]);
    }

    // Return if all inputs are valid
    return inputsAreValid(inputs);
}

function global2Save() {
    inputs = []
    // Add all inputs to an array.
    for (var i = 1; i <= global2Names.length; i++) {
        input = document.getElementById("input" + i).value;
        inputs.push(input);
    }

    // Set cookies for all inputs that are valid.
    for (var i = 0; i < inputs.length; i++) {
        if (inputsAreValid([inputs[i]]))
            setCookie(global2Names[i], inputs[i]);
    }

    //if fields on global2 are entered correctly, then all the global costs have been entered.
    if (inputsAreValid(inputs)) {
        setCookie("globalCostsEntered", 1);
    }
    // Return if all inputs are valid
    return inputsAreValid(inputs);
}

function form5Save() {
    inputs = []
    checkboxes = []
    let allValid = 0;

    // Add all inputs to an array.
    for (var i = 1; i <= form5Names.length; i++) {
        input = document.getElementById("input" + i).value;
        checkbox = document.getElementById("check" + i).checked;
        inputs.push(input);
        checkboxes.push(checkbox);
    }

    // Set cookies for valid and checked.
    for (let i = 0; i < checkboxes.length; i++) {
        var fullName = "course" + getCookie("currentCourse") + form5Names[i];
        if (checkboxes[i] == true) {
            if (inputsAreValid([inputs[i]])) {
                setCookie(fullName, inputs[i]);
            } else {
                allValid = 1;
            }
        }
    }

    // Prompt user about unchecked boxes that have values
    for (let i = 0; i < checkboxes.length; i++) {
        // If there is an unchecked box that has an input in it, need to ask if they would like to move on (delete cookies too) or stay on this page
        if (!checkboxes[i] && inputs[i] != "") {
            if (confirm("You have a value that has not been checked. Do you want to continue?")) {
                // Delete cookies for all unchecked boxes
                for (let i = 0; i < checkboxes.length; i++) {
                    if (!checkboxes[i]) {
                        var fullName = "course" + getCookie("currentCourse") + form5Names[i];
                        eraseCookie(fullName);
                    }
                }
            } else {
                allValid = 2; // Used in form5Next() to signify that there is an unchecked field with an input and user does not want to move to next page
            }
            break;
        }
    }

    return allValid;
}

function form6Save() {
    inputs = []
    checkboxes = []
    let allValid = 0;

    // Add all inputs to an array.
    for (var i = 1; i <= form6Names.length; i++) {
        input = document.getElementById("input" + i).value;
        checkbox = document.getElementById("check" + i).checked;
        inputs.push(input);
        checkboxes.push(checkbox);
    }

    // Set cookies for valid and checked.
    for (let i = 0; i < checkboxes.length; i++) {
        var fullName = "course" + getCookie("currentCourse") + form6Names[i];
        if (checkboxes[i] == true) {
            if (inputsAreValid([inputs[i]])) {
                setCookie(fullName, inputs[i]);
            } else {
                allValid = 1;
            }
        }
    }

    // Prompt user about unchecked boxes that have values
    for (let i = 0; i < checkboxes.length; i++) {
        // If there is an unchecked box that has an input in it, need to ask if they would like to move on (delete cookies too) or stay on this page
        if (!checkboxes[i] && inputs[i] != "") {
            if (confirm("You have a value that has not been checked. Do you want to continue?")) {
                // Delete cookies for all unchecked boxes
                for (let i = 0; i < checkboxes.length; i++) {
                    if (!checkboxes[i]) {
                        var fullName = "course" + getCookie("currentCourse") + form6Names[i];
                        eraseCookie(fullName);
                    }
                }
            } else {
                allValid = 2; // Used in form6Next() to signify that there is an unchecked field with an input and user does not want to move to next page
            }
            break;
        }
    }

    return allValid;
}

function overviewSave() {
    inputs1 = []
    inputs2 = []
    inputs3 = []
    inputs4 = []
    inputs5 = []
    inputs6 = []

    // Add all inputs to an array. 1
    for (var i = 1; i <= form1Names.length; i++) {
        input = document.getElementById("form1input" + i).value;
        inputs1.push(input);
    }
    // Set cookies for all inputs that are valid.
    for (var i = 0; i < inputs1.length; i++) {
        if (inputsAreValid([inputs1[i]])) {
            var fullName = "course" + getCookie("currentCourse") + form1Names[i];
            setCookie(fullName, inputs1[i]);
        }
    }

    // Add all inputs to an array. 2
    for (var i = 1; i <= form2Names.length; i++) {
        input = document.getElementById("form2input" + i).value;
        inputs2.push(input);
    }
    // Set cookies for all inputs that are valid.
    for (var i = 0; i < inputs2.length; i++) {
        if (inputsAreValid([inputs2[i]])) {
            var fullName = "course" + getCookie("currentCourse") + form2Names[i];
            setCookie(fullName, inputs2[i]);
        }
    }

    // Add all inputs to an array. 3
    for (var i = 1; i <= global1Names.length; i++) {
        input = document.getElementById("form3input" + i).value;
        inputs3.push(input);
    }
    // Set cookies for all inputs that are valid.
    for (var i = 0; i < inputs3.length; i++) {
        if (inputsAreValid([inputs3[i]]))
            setCookie(global1Names[i], inputs3[i]);
    }

    // Add all inputs to an array. 4
    for (var i = 1; i <= global2Names.length; i++) {
        input = document.getElementById("form4input" + i).value;
        inputs4.push(input);
    }
    // Set cookies for all inputs that are valid.
    for (var i = 0; i < inputs4.length; i++) {
        if (inputsAreValid([inputs4[i]]))
            setCookie(global2Names[i], inputs4[i]);
    }

    // Add all inputs to an array. 5
    for (var i = 1; i <= form5Names.length; i++) {
        let input = null;
        if (document.getElementById("form5input" + i)) {
            input = document.getElementById("form5input" + i).value;
        }

        inputs5.push(input);
    }
    // Set cookies for all inputs that are valid.
    for (var i = 0; i < inputs5.length; i++) {
        if (inputsAreValid([inputs5[i]])) {
            var fullName = "course" + getCookie("currentCourse") + form5Names[i];
            setCookie(fullName, inputs5[i]);
        }
    }

    // Add all inputs to an array. 6
    for (var i = 1; i <= form6Names.length; i++) {
        let input = null;
        if (document.getElementById("form6input" + i)) {
            input = document.getElementById("form6input" + i).value;
        }

        inputs6.push(input);
    }
    // Set cookies for all inputs that are valid.
    for (var i = 0; i < inputs6.length; i++) {
        if (inputsAreValid([inputs6[i]])) {
            var fullName = "course" + getCookie("currentCourse") + form6Names[i];
            setCookie(fullName, inputs6[i]);
        }
    }

    return inputsAreValid(inputs1) && inputsAreValid(inputs2) && inputsAreValid(inputs3)
        && inputsAreValid(inputs4) && inputsAreValid(inputs5) && inputsAreValid(inputs6);
}

// desired tuition is global and not per course?
function tuitionSave() {
    if (inputsAreValid([document.getElementById("input1").value])) {
        var fullName = "course" + getCookie("currentCourse") + "Desired Tuition";
        setCookie(fullName, document.getElementById("input1").value)
    }

    return inputsAreValid([document.getElementById("input1").value]);
}

function courseOptionNext() {
    if (courseOptionSave()) {
        goToForm1();
    } else {
        if (document.getElementById("input2").checked) {
            alert("Error:  Licensing fee per student must not be empty or negative.");
        } else {
            alert("Error: Please select a course option.");
        }
    }
}

function global1Next() {
    if (global1Save()) {
        goToglobal2();
    } else {
        alert("Error: Fields must not be empty or negative.");
    }
}

function global2Next() {
    if (global2Save()) {
        if (getCookie("editActive") == null || getCookie("editActive") == "false") {
            goToCourseOption();
        } else {
            goToCoursePage();
        }
    } else {
        alert("Error: Fields must not be empty or negative.");
    }
}

function form1Next() {
    if (form1Save()) {
        goToForm2();
    } else {
        alert("Error: Fields must not be empty or negative.");
    }
}

function form2Next() {
    if (form2Save()) {
        goToForm5();
    } else {
        alert("Error: Fields must not be empty or negative.");
    }
}

function form5Next() {
    let errorCheck = form5Save();
    if (errorCheck == 0) {
        goToForm6();
    } else if (errorCheck == 1) {
        alert("Error: Checked fields must not be empty or negative.");
    } else {
        alert("Error: Checkboxes must be checked to save the value inputted.")
    }
}

function form6Next() {
    let errorCheck = form6Save();
    if (errorCheck == 0) {
        goToOverview();
    } else if (errorCheck == 1) {
        alert("Error: Checked fields must not be empty or negative.");
    } else {
        alert("Error: Checkboxes must be checked to save the value inputted.")
    }
}

function overviewNext() {
    if (overviewSave()) {
        var fullName = "course" + getCookie("currentCourse") + "Complete";
        if (!(getCookie(fullName))) {
            setCookie(fullName, "true");
        }
        goToDesiredTuition();
    } else {
        alert("Error: Fields must not be empty or negative.");
    }
}

function tuitionNext() {
    if (tuitionSave()) {
        submit();
    } else {
        alert("Error: Fields must not be empty or negative.");
    }
}

function global1Back() {
    if (global1Save()) {
        goToCoursePage();
    } else {
        alert("Error: Fields must not be empty or negative.");
    }
}

function global2Back() {
    if (global2Save()) {
        goToglobal1();
    } else {
        alert("Error: Fields must not be empty or negative.");
    }
}

function courseOptionBack() {
    if (courseOptionSave()) {
        goToglobal2();
    } else {
        alert("Error: Please select a course option.");
    }
}

function form1Back() {
    if(form1Save()) {
        goToCourseOption();
    } else {
        alert("Error: Fields must not be empty or negative.");
    }
} 
function form2Back() {
    if (form2Save()) {
        goToForm1();
    } else {
        alert("Error: Fields must not be empty or negative.");
    }
}

function form5Back() {
    let errorCheck = form5Save();
    if (errorCheck == 0) {
        goToForm2();
    } else if (errorCheck == 1) {
        alert("Error: Checked fields must not be empty or negative.");
    } else {
        alert("Error: Checkboxes must be checked to save the value inputted.")
    }
}

function form6Back() {
    let errorCheck = form6Save();
    if (errorCheck == 0) {
        goToForm5();
    } else if (errorCheck == 1) {
        alert("Error: Checked fields must not be empty or negative.");
    } else {
        alert("Error: Checkboxes must be checked to save the value inputted.")
    }
}

function overviewBack() {
    if (overviewSave()) {
        goToForm6();
    } else {
        alert("Error: Fields must not be empty or negative.");
    }
}
function tuitionBack() {
    tuitionSave();
    goToOverview();

}


function courseOptionLoad() {
    currentForm = 0;
    var fullName = "course" + getCookie("currentCourse") + "Licensing Fee";
    if(getCookie(fullName)) {
        document.getElementById("input2").checked = true;
        document.getElementById("Licensing Fee").value = getCookie(fullName);
    } else {
        var fullName2 = "course" + getCookie("currentCourse") + "Course Option";
        if(getCookie(fullName2) == "Hybrid (Video Conferencing)") {
            document.getElementById("input3").checked = true;
        }
        if (getCookie(fullName2) == "In-Person") {
            document.getElementById("input1").checked = true;
        }
    }
    updateOnInput();
}

function global1Load() {
    currentForm = 3;
    for (var i = 1; i <= global1Names.length; i++) {
        if (getCookie(global1Names[i - 1])) {
            document.getElementById("input" + i).value = getCookie(global1Names[i - 1]);
        } else {
        }
    }

    updateOnInput();
}

function global2Load() {
    currentForm = 4;
    for (var i = 1; i <= global2Names.length; i++) {
        if (getCookie(global2Names[i - 1])) {
            document.getElementById("input" + i).value = getCookie(global2Names[i - 1]);
        } else {
        }
    }

    updateOnInput();
}

function form1Load() {
    currentForm = 1;
    for (var i = 1; i <= form1Names.length; i++) {
        var fullName = "course" + getCookie("currentCourse") + form1Names[i - 1];
        if (getCookie(fullName)) {
            document.getElementById("input" + i).value = getCookie(fullName);
        } else {
        }
    }

    updateOnInput();
}

function form2Load() {
    currentForm = 2;
    for (var i = 1; i <= form2Names.length; i++) {
        var fullName = "course" + getCookie("currentCourse") + form2Names[i - 1];
        if (getCookie(fullName)) {
            document.getElementById("input" + i).value = getCookie(fullName);
        } else {
        }
    }

    updateOnInput();
}

function form5Load() {
    currentForm = 5;
    for (var i = 1; i <= form5Names.length; i++) {
        var fullName = "course" + getCookie("currentCourse") + form5Names[i - 1];
        if (getCookie(fullName)) {
            document.getElementById("check" + i).checked = true;
            document.getElementById("input" + i).value = getCookie(fullName);
        } else {
        }
    }

    updateOnInput();
}

function form6Load() {
    currentForm = 6;
    for (var i = 1; i <= form6Names.length; i++) {
        var fullName = "course" + getCookie("currentCourse") + form6Names[i - 1];
        if (getCookie(fullName)) {
            document.getElementById("check" + i).checked = true;
            document.getElementById("input" + i).value = getCookie(fullName);
        } else {
        }
    }

    updateOnInput();
}

function overviewLoad() {
    currentForm = 7;

    for (var i = 1; i <= form1Names.length; i++) {
        var fullName = "course" + getCookie("currentCourse") + form1Names[i - 1];
        if (getCookie(fullName)) {
            document.getElementById("form1input" + i).value = getCookie(fullName);
        }
    }
    for (var i = 1; i <= form2Names.length; i++) {
        var fullName = "course" + getCookie("currentCourse") + form2Names[i - 1];
        if (getCookie(fullName)) {
            document.getElementById("form2input" + i).value = getCookie(fullName);
        }
    }
    for (var i = 1; i <= global1Names.length; i++) {
        if (getCookie(global1Names[i - 1])) {
            document.getElementById("form3input" + i).value = getCookie(global1Names[i - 1]);
        }
    }
    for (var i = 1; i <= global2Names.length; i++) {
        if (getCookie(global2Names[i - 1])) {
            document.getElementById("form4input" + i).value = getCookie(global2Names[i - 1]);
        }
    }
    for (var i = 1; i <= form5Names.length; i++) {
        var fullName = "course" + getCookie("currentCourse") + form5Names[i - 1];
        if (getCookie(fullName)) {
            document.getElementById("form5input" + i).value = getCookie(fullName);
        } else {
            document.getElementById("form5item" + i).innerHTML = "";
        }
    }
    for (var i = 1; i <= form6Names.length; i++) {
        var fullName = "course" + getCookie("currentCourse") + form6Names[i - 1];
        if (getCookie(fullName)) {
            document.getElementById("form6input" + i).value = getCookie(fullName);
        } else {
            document.getElementById("form6item" + i).innerHTML = "";
        }
    }

    updateOnInput();
}

function computeGrowth(courseNum) {
    const growthPercentages = [.25, .35, .50, .75, .85];

    firstYearStudents = 0;
    maxCourses = (52 / (getCookie("course" + courseNum + "Length Of Course")));
    for (let x = 1; x <= maxCourses; x++) {
        if (x <= 5) {
        firstYearStudents += Math.floor(parseInt(getCookie("course" + courseNum + "Maximum Number Of Enrolled Students Per Course")) * growthPercentages[x - 1]);
        } else {
            firstYearStudents += parseInt(getCookie("course" + courseNum + "Maximum Number Of Enrolled Students Per Course"));  
        }
    }
    return firstYearStudents;
}

function tuitionLoad() {

    var growthPercentages = [.25, .35, .50, .75, .85];
    var totalAssessmentCost = 0;
    validCourseNumbers = getCookie("validCourses").split("|");
    var maxStudents = 0;
    var maxCourses = 0;
    // var firstYearStudents = 0;
    var totalFirstYearStudents = 0;
    document.getElementById('courses').innerHTML = '';
    for (let i = 0; i < validCourseNumbers.length - 1; i++) {
        var list_element = document.getElementById("courses");
        const course_element = document.createElement("course");
        course_element.classList.add("course");
        const course_content_element = document.createElement("h3");
        course_content_element.style=("height: 25px;line-height: 25px;text-align: center;");
        course_content_element.classList.add("content");
        course_content_element.innerText = "Course " + validCourseNumbers[i];
        course_element.appendChild(course_content_element);
        const innerCourseText = document.createElement("h3");
        list_element.appendChild(course_element);
        
        if (getCookie("course" + validCourseNumbers[i] + "Complete")) {
            firstYearStudents = 0;
            innerCourseText.innerText = "Course Cost: $" + calculateCourseCost(validCourseNumbers[i]).toLocaleString();
            innerCourseText.innerHTML += "\n First Year Student Estimate: ";
            firstYearStudents = computeGrowth(validCourseNumbers[i]);
            maxCourses = (52 / (getCookie("course" + validCourseNumbers[i] + "Length Of Course")));

            totalFirstYearStudents += firstYearStudents;
            innerCourseText.innerText += firstYearStudents + "\n Maximum Number of Courses Annually: " + maxCourses + "\n Yearly Cost: $" + (calculateCourseCost(validCourseNumbers[i]) * maxCourses).toLocaleString();
            totalAssessmentCost += (calculateCourseCost(validCourseNumbers[i]) * maxCourses);
            setCookie("course" + validCourseNumbers[i] + "Cost", calculateCourseCost(validCourseNumbers[i]) * maxCourses);
            maxStudents += Math.floor(maxCourses * getCookie("course" + validCourseNumbers[i] + "Maximum Number Of Enrolled Students Per Course"));
        } else {
            innerCourseText.innerText = "This course is not completed!";
        }
        course_element.appendChild(innerCourseText);
    }
    totalAssessmentCost += calculateGlobalCost();
    setCookie("totalAssessmentCost", totalAssessmentCost);
    currentForm = 8;
    document.getElementById("breakEven").innerHTML = "Breakeven Tuition (Variable + Operating Costs) at capacity:"
    document.getElementById("costsCourse").innerHTML = "Total Assessment Cost: $";
    document.getElementById("courseNum").innerHTML = '';
    document.getElementById("totalStudents").innerHTML = "Total First Year Student Estimate: ";
    document.getElementById("firstYearReturns").innerHTML = '';
    document.getElementById("maxStudents").innerHTML = "Total Annual Students at Capacity: ";
    
    var fullName = "course" + "Desired Tuition";
    var totalTuition = parseInt(getCookie(fullName)) * maxStudents;
    setCookie("Total Tuition", totalTuition);
    
    if (getCookie(fullName)) {
        document.getElementById("input1").value = getCookie(fullName);
    }
    document.getElementById("breakEven").innerHTML += "$" + Math.ceil(totalAssessmentCost / maxStudents).toLocaleString();
    document.getElementById("costsCourse").innerHTML += "" + totalAssessmentCost.toLocaleString();
    document.getElementById("maxStudents").innerHTML += "" + maxStudents.toLocaleString();


    document.getElementById("totalStudents").innerHTML += "" + totalFirstYearStudents;
    document.getElementById("firstYearTuition").innerHTML = "Potential Annual Gain from First Year: $" + (totalTuition ? (totalFirstYearStudents * parseInt(getCookie(fullName)) - totalAssessmentCost): 0).toLocaleString();
    if (totalTuition) {
     document.getElementById("firstYearReturns").innerHTML += "Potential Annual Gain at Capacity: $" + (totalTuition - totalAssessmentCost).toLocaleString();
    } else {
        document.getElementById("firstYearReturns").innerHTML += "Potential Annual Gain at Capacity: $0";
    }
}
function programTotalLoad() {
    //Should fill out each section inside programTotal.html.
}

//Selects or de-selects every checkbox (for form 5 & 6 only).
function select() {

    checkboxes = []
    filled = 0;

    // Add all checkboxes to an array.
    if (getPage() == 5) {
        for (var i = 1; i <= form5Names.length; i++) {
            checkbox = document.getElementById("check" + i);
            checkboxes.push(checkbox);

            if (checkbox.checked == true) {
                filled++;
            }
        }
    } else {
        for (var i = 1; i <= form6Names.length; i++) {
            checkbox = document.getElementById("check" + i);
            checkboxes.push(checkbox);

            if (checkbox.checked == true) {
                filled++;
            }
        }
    }
    for (let i = 0; i < checkboxes.length; i++) {
        if (filled >= checkboxes.length / 2) {
            checkboxes[i].checked = false;
        } else {
            checkboxes[i].checked = true;
        }
    }
}

//Fills in blank inputs with default values.
function fill() {

    var names = [];
    var defaults = [];
    const form = window.location.pathname.substring(window.location.pathname.lastIndexOf("/"));
    
    switch(form) {
        case '/form.html':
            names = form1Names;
            defaults = form1Default;
            break;
        case '/form2.html':
            names = form2Names;
            defaults = form2Default;
            break;
        case '/global1.html':
            names = global1Names;
            defaults = global1Default;
            break;
        case '/global2.html':
            names = global2Names;
            defaults = global2Default;
            break;
        case '/form5.html':
            names = form5Names;
            defaults = form5Default;
            break;
        case '/form6.html':
            names = form6Names;
            defaults = form6Default;
            break;
    }

    for (var i = 1; i <= names.length; i++) {
        input = document.getElementById("input" + i);

        if(input.value == '')
            input.value = defaults[i-1];
    }

    updateOnInput();
}

//Resets only the page the user is on (i.e. makes all the inputs empty).
function resetPage() {
    var names = [];
    const form = window.location.pathname.substring(window.location.pathname.lastIndexOf("/"));

    switch(form) {
        case '/form.html':
            names = form1Names;
            break;
        case '/form2.html':
            names = form2Names;
            break;
        case '/global1.html':
            names = global1Names;
            break;
        case '/global2.html':
            names = global2Names;
            break;
        case '/form5.html':
            names = form5Names;
            break;
        case '/form6.html':
            names = form6Names;
            break;
        //no reset for overview form
    }

    for (var i = 1; i <= names.length; i++) {
        input = document.getElementById("input" + i);
        input.value = '';
    }
    
    updateOnInput();
}

function resetAll() {
    for (var i = 0; i < form1Names.length; i++) {
        var fullName = "course" + getCookie("currentCourse") + form1Names[i];
        eraseCookie(fullName);
    }
    for (var i = 0; i < form2Names.length; i++) {
        var fullName = "course" + getCookie("currentCourse") + form2Names[i];
        eraseCookie(fullName);
    }
    for (var i = 0; i < form5Names.length; i++) {
        var fullName = "course" + getCookie("currentCourse") + form5Names[i];
        eraseCookie(fullName);
    }
    for (var i = 0; i < form6Names.length; i++) {
        var fullName = "course" + getCookie("currentCourse") + form6Names[i];
        eraseCookie(fullName);
    }
    resetPage();
    window.location.href = "index.html";
    
}

function goToCoursePage() {
    window.location.href = "index.html";
}

function goToCourseOption() {
    window.location.href = "courseOption.html";
}

function goToForm1() {
    window.location.href = "form.html";
}

function goToForm2() {
    window.location.href = "form2.html";
    
}

function goToglobal1() {
    window.location.href = "global1.html";
}

function editButtonActive() {
    setCookie("editActive", "true");
}

function goToglobal2() {
    window.location.href = "global2.html";
}

function goToForm5() {
    window.location.href = "form5.html";
}

function goToForm6() {
    window.location.href = "form6.html";
}

function goToOverview() {
    window.location.href = "overview.html";
}

function goToProgramTotal() {
    window.location.href = "programTotal.html";
}

function generateReport() {
    var form1Values = [];
    var form2Values = [];
    var global1Values = [];
    var global2Values = [];
    var form5Values = [];
    var form6Values = [];

    var fullName2 = "course" + getCookie("currentCourse") + "Course Option";
    if (getCookie(fullName2) != null) {
        document.getElementById("Course Option").innerHTML += getCookie(fullName2);
    }
    fullName2 = "course" + getCookie("currentCourse") + "Licensing Fee";
    if (getCookie(fullName2) != null) {
        document.getElementById("Licensing Fee").innerHTML += getCookie(fullName2);
    } else {
        document.getElementById("Licensing Fee").innerHTML = '';
    }
    for (var i = 0; i < form1Names.length; i++) {
        var fullName = "course" + getCookie("currentCourse") + form1Names[i];
        form1Values.push(getCookie(fullName));

        document.getElementById(form1Names[i]).innerHTML += form1Values[i];
    }
    for (var i = 0; i < form2Names.length; i++) {
        var fullName = "course" + getCookie("currentCourse") + form2Names[i];
        form2Values.push(getCookie(fullName));

        document.getElementById(form2Names[i]).innerHTML += form2Values[i];
    }
    for (var i = 0; i < global1Names.length; i++) {
        global1Values.push(getCookie(global1Names[i]));

        document.getElementById(global1Names[i]).innerHTML += global1Values[i];
    }
    for (var i = 0; i < global2Names.length; i++) {
        global2Values.push(getCookie(global2Names[i]));

        document.getElementById(global2Names[i]).innerHTML += global2Values[i];
    }
    for (var i = 0; i < form5Names.length; i++) {
        var fullName = "course" + getCookie("currentCourse") + form5Names[i];
        form5Values.push(getCookie(fullName));
        if (getCookie(fullName)) {
            document.getElementById(form5Names[i]).innerHTML += form5Values[i];
        } else {
            document.getElementById(form5Names[i]).innerHTML = '';
        }
    }
    for (var i = 0; i < form6Names.length; i++) {
        var fullName = "course" + getCookie("currentCourse") + form6Names[i];
        form6Values.push(getCookie(fullName));

        if (getCookie(fullName)) {
            document.getElementById(form6Names[i]).innerHTML += form6Values[i];
        } else {
            document.getElementById(form6Names[i]).innerHTML = '';
        }
    }

    return;
}

function courseListLoad() {
    setCookie("editActive", "false");
    validCourseCookie = getCookie("validCourses");
    if (getCookie("validCourses") != null) {
        let validCourses = validCourseCookie.split("|");
        validCourses = validCourses.splice(0, validCourses.length-1);
        validCourses.forEach(element => addListElement(element));
    }
}

function addListElement(number) {
    //does not use the htmlfile to create the list elements
    courseCount = parseInt(getCookie("courseCount")) || 0;
    
    var list_element = document.getElementById("courses");

    const course_element = document.createElement("course");
    course_element.classList.add("course");


    const course_content_element = document.createElement("h3");
    course_content_element.style=("height: 100px;line-height: 100px;text-align: center;");
    course_content_element.classList.add("content");
    course_content_element.innerText = "Course " + number;
    course_element.appendChild(course_content_element);
    
    const btnGroup = document.createElement("div");
    btnGroup.classList.add("courseButtonGroup");

    course_element.appendChild(btnGroup);

    const editBtn = document.createElement("button");
    editBtn.classList.add("courseButton");
    editBtn.innerText = "Edit";
    editBtn.onclick = function() {
        document.cookie = "currentCourse" + "=" + number + "; path=/";
        if (getCookie("globalCostsEntered") == 1) {
            goToCourseOption();
        } else {
            goToglobal1();
        }
    }

    btnGroup.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("courseButton");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = function(){
        this.parentNode.parentNode.remove();
        validCourseNumbers = getCookie("validCourses").replace(number.toString() + "|", "");
        
        currentNumberOfCourses = parseInt(getCookie("numberOfCourses"));
        document.cookie = "numberOfCourses" + "=" + ((currentNumberOfCourses - 1) || "") + "; path=/";

        var fullName = "course" + number + "Complete";
        eraseCookie(fullName);

        document.cookie = "validCourses" + "=" + validCourseNumbers + "; path=/";

    }
    btnGroup.appendChild(deleteBtn);

    list_element.appendChild(course_element);



}

function courseCreation() {

    //sends you directly to course costs

    courseCount = parseInt(getCookie("courseCount")) || 0;
    currentNumberOfCourses = parseInt(getCookie("numberOfCourses")) || 0;
    if (currentNumberOfCourses <= 4) {
    course_content_element = addListElement(courseCount + 1);
    document.cookie = "courseCount" + "=" + ((courseCount + 1) || "") + "; path=/";
    document.cookie = "numberOfCourses" + "=" + ((currentNumberOfCourses + 1) || "") + "; path=/";

    const validCourseText = getCookie("validCourses") || "";
    document.cookie = "validCourses" + "=" + validCourseText + (courseCount + 1) + "|" + "; path=/";

    return;
    } else {
        alert("Error:  Number of Courses is limited to 5.");
    }
}

function getTuitionItems() {
    return form5Names.concat(form6Names);
}

function getExpenseItems() {
    return global1Names.concat(global2Names);
}

function getVariousItems() {
    return form1Names.concat(form2Names)
}

function updateOnInput() {
    switch (currentForm) {
        case 1:
            totalCourseHours = (parseInt(document.getElementById("input1").value) || 0) + (parseInt(document.getElementById("input2").value) || 0) + (parseInt(document.getElementById("input3").value) || 0);
            document.getElementById("update").innerText = "Total Course Hours: " + totalCourseHours;
            break;
        case 4:
            annualSalary = parseInt(document.getElementById("input1").value) * 12;
            document.getElementById("update").innerText = "Annually: $" + annualSalary;
            break;
        case 8:
            var fullName = "course" + "Desired Tuition";
            if (inputsAreValid([document.getElementById("input1").value])) {
                setCookie(fullName, document.getElementById("input1").value);
                tuitionLoad();
            }
            break;
        default:
            break;
    }
}

function autocheck(checkNumber) {
    checkbox = document.getElementById("check" + checkNumber);
    checkbox.checked
    
    = true;
}

function calculateCourseCost() {
    let courseCost = 0;
    for (var i = 1; i <= form1Names.length; i++) {
        var fullName = "course" + getCookie("currentCourse") + form1Names[i - 1];
        if (getCookie(fullName)) {
            if(i < 3) {
            courseCost += getCookie(fullName) * getCookie("course" + getCookie("currentCourse") + "Hourly Rate For Class Ins");
            } else {
                courseCost += getCookie(fullName) * getCookie("course" + getCookie("currentCourse") + "Hourly Rate For Clinical Instructor");
            }
        }
    }

    for (var i = 1; i <= form5Names.length; i++) {
        var fullName = "course" + getCookie("currentCourse") + form5Names[i - 1];
        if (getCookie(fullName)) {
            courseCost += parseInt(getCookie(fullName));
        }
    }
    for (var i = 1; i <= form6Names.length; i++) {
        var fullName = "course" + getCookie("currentCourse") + form6Names[i - 1];
        if (getCookie(fullName)) {
            courseCost += parseInt(getCookie(fullName));
        }
    }
    return courseCost;
}

function createTooltip(id, title, message) {
    var btn  = document.getElementById(id);
    var modal = document.getElementById("myModal");
    modal.getElementsByTagName('h1')[0].innerHTML = title;
    modal.getElementsByTagName('p')[0].innerHTML = message;

    modal.style.display = "block";
}

function calculateCourseCost(courseNumber) {
    // Calculates Course cost with instructor salaries and student specific costs (DOES NOT INCLUDE LECTURING FEE FOR HYBRID)
    let courseCost = 0;
    for (var i = 1; i <= form1Names.length; i++) {
        var fullName = "course" + courseNumber + form1Names[i - 1];
        if (getCookie(fullName)) {
            if(i < 3) {
            courseCost += getCookie(fullName) * getCookie("course" + courseNumber + "Hourly Rate For Class Ins");
            } else {
                courseCost += getCookie(fullName) * getCookie("course" + courseNumber + "Hourly Rate For Clinical Instructor");
            }
        }
    }

    for (var i = 1; i <= form5Names.length; i++) {
        var fullName = "course" + courseNumber + form5Names[i - 1];
        if (getCookie(fullName)) {
            courseCost += parseInt(getCookie(fullName));
        }
    }
    for (var i = 1; i <= form6Names.length; i++) {
        var fullName = "course" + courseNumber + form6Names[i - 1];
        if (getCookie(fullName)) {
            courseCost += parseInt(getCookie(fullName));
        }
    }
    if (getCookie("course" + courseNumber + "Licensing Fee")) {
        courseCost += parseInt(getCookie("course" + courseNumber + "Maximum Number Of Enrolled Students Per Course")) * parseInt(getCookie("course" + courseNumber + "Licensing Fee"));
    }
    return courseCost;
}

function calculateGlobalCost() {
    var globalCost = 0;
    for (let i = 0; i < global1Names.length; i++) {
        globalCost += parseInt(getCookie(global1Names[i])) * 12;
    }
    for (let i = 0; i < global2Names.length; i++) {
        globalCost += parseInt(getCookie(global2Names[i])) * 12;
    }
    setCookie("Program Costs", globalCost);
    return globalCost;
}