
    window.jsPDF = window.jspdf.jsPDF;
    var tuitionItemsList = [];
    var totalExpensesforReport = 0;
    var earnings = '';
  

    var annualClinInstructorCost = 0;
    var annualClassInstructorCost = 0;
    var firstYearStudents = 0;
    var totalStudents = 0;
    var sumCourses = 0;
    var validCourseNumbers = [];

    allTuitionCourseReportItems = [];


//     Gets lists for tuition items, and monthly expenses 
    function getBreakdownValues(){
        
        tuitionItems = getTuitionItems();

        expenseItems = getExpenseItems();
        variousItems = getVariousItems();

        courseNumbers = getCookie("validCourses").split("|").slice(0,-1);
        for (var z = 0; z < courseNumbers.length; z++) {
            if (getCookie("course" + courseNumbers[z] + "Complete")) {
                validCourseNumbers.push(courseNumbers[z]);
            }
        }

        for (let index = 0; index < validCourseNumbers.length; ++index) {
            //tuition items are on form5 and form6
            tuitionCourseReportItems = [];
            //expense items are on form3 and form4


            for (var i = 0; i < tuitionItems.length; i++) {
                var fullName = "course" + validCourseNumbers[index] + tuitionItems[i];
                if (getCookie(fullName)) {
                    tuitionCourseReportItems.push(tuitionItems[i] + ': $' + parseInt(getCookie(fullName)).toLocaleString());
                }
            }

            if (getCookie("course" + validCourseNumbers[index] + "Licensing Fee")) {
                var licFee = parseInt(getCookie("course" + validCourseNumbers[index] + "Maximum Number Of Enrolled Students Per Course")) *
                    parseInt(getCookie("course" + validCourseNumbers[index] + "Licensing Fee"));
                tuitionCourseReportItems.unshift('Licensing Fees: $' + licFee.toLocaleString());
            }

            tuitionCourseReportItems.unshift('Costs Associated with this Course:');

            theoryHours = parseInt(getCookie("course" + validCourseNumbers[index] + variousItems[0]));
            labHours = parseInt(getCookie("course" + validCourseNumbers[index] + variousItems[1]));
            clinHours = parseInt(getCookie("course" + validCourseNumbers[index] + variousItems[2]));
            courseWeeks = parseInt(getCookie("course" + validCourseNumbers[index] + variousItems[3]));

            var classInstructorSalary = getCookie("course" + validCourseNumbers[index] + "Hourly Rate For Class Ins") * (theoryHours + labHours);
            var clinInstructorSalary = getCookie("course" + validCourseNumbers[index] + "Hourly Rate For Clinical Instructor") * clinHours;
            
            tuitionCourseReportItems.push('Class/Lab Instructor: $' + classInstructorSalary.toLocaleString());
            tuitionCourseReportItems.push('Clinical Instructor: $' + clinInstructorSalary.toLocaleString());
            
            maxCourses = Math.floor(52 / courseWeeks);

            annualClassInstructorCost += (classInstructorSalary * maxCourses);
            annualClinInstructorCost += (clinInstructorSalary * maxCourses);

            allTuitionCourseReportItems.push(tuitionCourseReportItems);
        }

        expenseReportItems = [];

        for (var j = 0; j < expenseItems.length; j++) {
            totalExpensesforReport += parseInt(getCookie(expenseItems[j]));
            expenseReportItems.push(expenseItems[j] + ': $' + parseInt(getCookie(expenseItems[j])).toLocaleString());
        }
       
    }