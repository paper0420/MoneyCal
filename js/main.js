function checkValue(x) {
    if (isNaN(x)) {
        return 0;
    } else {
        return x;
    }
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function calculateRetirementFunds  (
    age,
    retirementAge,
    lifeSpan,
    inflation,
    expensePerMonth,
    currentSavingMoney) {

    inflation = inflation / 100;
    lifetime = lifeSpan - age;
    yearsAfterRetirement = lifeSpan - retirementAge;

    var totalRetirementMoney = 0;
    for (var count = 0; count < yearsAfterRetirement; count++) {

        expenseWithInflation = expensePerMonth * Math.pow((1 + inflation), retirementAge + count);
        expenseWithInflation = expenseWithInflation * 12;
        totalRetirementMoney = totalRetirementMoney + expenseWithInflation;

    }

    worktime = retirementAge - age;
    savingMoney = totalRetirementMoney - currentSavingMoney;
    savingMoney = totalRetirementMoney / (worktime);

    return {
        savingMoney: savingMoney,
        totalRetirementMoney: totalRetirementMoney
    };
}

function retirementCalInput() {
    var age = parseInt(document.getElementById("age").value);
    var retirementAge = parseInt(document.getElementById("retirementAge").value);
    var lifeSpan = parseInt(document.getElementById("lifeSpan").value);
    var inflation = parseInt(document.getElementById("inflation").value);
    var expensePerMonth = parseInt(document.getElementById("expensePerMonth").value);
    var currentSavingMoney = parseInt(document.getElementById("currentSavingMoney").value);

    age = checkValue(age);
    retirementAge = checkValue(retirementAge);
    lifeSpan = checkValue(lifeSpan);
    inflation = checkValue(inflation);
    expensePerMonth = checkValue(expensePerMonth);
    currentSavingMoney = checkValue(currentSavingMoney);

    var result = calculateRetirementFunds(
        age,
        retirementAge,
        lifeSpan,
        inflation,
        expensePerMonth,
        currentSavingMoney);

    var totalRetirementMoneyString = formatNumber(result.totalRetirementMoney.toFixed(0));
    var savingMoneyString = formatNumber(result.savingMoney.toFixed(0));

    document.getElementById("savingMoney").innerText = savingMoneyString;
    document.getElementById("retirementMoney").innerText = totalRetirementMoneyString;
}

function openInflationInfo() {
    var inflationInfo = document.getElementById("inflationInfo");
    inflationInfo.style.display = "block";
}

function closeInflationInfo() {

    inflationInfo.style.display = "none";

}

function calculateTax(
    salary,
    expensPersonalEtc,
    expensInsuranceInvest,
    expensEconomy,
    expensDonate) {

    var expensPersonal = 60000;
    var annualSalary = salary * 12;
    var tax = 0;
    //expese 50% of salary
    var expense_50 = annualSalary * 50 / 100;
    if (expense_50 > 100000) {
        expense_50 = 100000;
    }

    var totalExpenses = expensPersonal + expensPersonalEtc + expensInsuranceInvest + expensEconomy + expensDonate;
    var netIncome = annualSalary - expense_50 - totalExpenses;

    if (netIncome <= 150000) {
        tax = 0;
        //document.getElementById("taxyoupay").innerText = "No tax";
    }
    else if (netIncome >= 151000 && netIncome <= 300000) {
        netIncome = netIncome - 150000;
        //netIncome = netIncome - 150001;
        tax = netIncome * 5 / 100; //Max 7500
    }

    else if (netIncome >= 300001 && netIncome <= 500000) {
        netIncome = netIncome - 150000 - 150000;
        //netIncome = 300001 - netIncome;
        tax = netIncome * 10 / 100 + 7500;
  
    }

    else if (netIncome >= 500001 && netIncome <= 750000) {
        netIncome = netIncome - 150000 - 150000 - 200000;
        //netIncome = netIncome - 500001;
        tax = netIncome * 15 / 100 + 7500 + 20000;
 

    }
    else if (netIncome >= 750001 && netIncome <= 1000000) {
        netIncome = netIncome - 150000 - 150000 - 150000 - 250000;
        //netIncome = netIncome - 750001;
        tax = netIncome * 20 / 100 + 7500 + 20000 + 37500;

    }

    else if (netIncome >= 1000001 && netIncome <= 2000000) {
        netIncome = netIncome - 150000 - 150000 - 150000 - 250000 - 250000;
        //netIncome = netIncome - 1000001;
        tax = netIncome * 25 / 100 + 7500 + 20000 + 37500 + 50000;
   

    }
    else if (netIncome >= 2000001 && netIncome <= 5000000) {
        netIncome = netIncome - 150000 - 150000 - 150000 - 250000 - 250000 - 1000000;
        //netIncome = netIncome - 2000001;
        tax = netIncome * 30 / 100 + 7500 + 20000 + 37500 + 50000 + 250000;

    }
    else if (netIncome >= 5000001) {
        netIncome = netIncome - 150000 - 150000 - 150000 - 250000 - 250000 - 1000000 - 3000000;
        netIncome = netIncome - 5000001;
        tax = netIncome * 35 / 100 + 7500 + 20000 + 37500 + 50000 + 250000 + 900000;

    }
    
    return {
        tax: tax,
        annualSalary: annualSalary
    };
}

function taxCalInput() {
    var salary = parseInt(document.getElementById("salary").value);
    var expensPersonalEtc = parseInt(document.getElementById("expens-personal-etc").value);
    var expensInsuranceInvest = parseInt(document.getElementById("expens-insurance-invest").value);
    var expensEconomy = parseInt(document.getElementById("expens-economy").value);
    var expensDonate = parseInt(document.getElementById("expens-donate").value);

    salary = checkValue(salary);
    expensPersonalEtc = checkValue(expensPersonalEtc);
    expensInsuranceInvest = checkValue(expensInsuranceInvest);
    expensEconomy = checkValue(expensEconomy);
    expensDonate = checkValue(expensDonate);

    var result = calculateTax(
        salary,
        expensPersonalEtc,
        expensInsuranceInvest,
        expensEconomy,
        expensDonate);

    var taxString = formatNumber(result.tax.toFixed(0));
    var annualSalaryString = formatNumber(result.annualSalary.toFixed(0));

    document.getElementById("taxyoupay").innerText = "Tax you have to pay  " + taxString;
    document.getElementById("annualSalary").innerText = annualSalaryString;
}

function lifeInsurance() {
    var debt = parseInt(document.getElementById("debt").value);
    var inheritance = parseInt(document.getElementById("inheritance").value);
    var assets = parseInt(document.getElementById("assets").value);
    var lifeInsuranceFromEmployer = parseInt(document.getElementById("lifeInsuranceFromEmployer").value);

    debt = checkValue(debt);
    inheritance = checkValue(inheritance);
    assets = checkValue(assets);
    lifeInsuranceFromEmployer = checkValue(lifeInsuranceFromEmployer);

    var lifeinsuranceneed = (debt + inheritance) - (assets + lifeInsuranceFromEmployer);
    document.getElementById("lifeinsuranceneed").innerText = lifeinsuranceneed;
}

function calculateDepreciation(
    cost,
    salvageValue,
    usefulLife) {
    var depreDouble = new Array();
    var depreciaionStraightLine = (cost - salvageValue) / usefulLife;
    var depreciationDoubleDeclineRatio = (100 / usefulLife) * 2;
    for (var count = 0; count < usefulLife; count++) {

        depreP = cost * depreciationDoubleDeclineRatio / 100;
        depreDouble[count] = depreP;
        cost = cost - depreP;
    }

    return {
        depreciaionStraightLine: depreciaionStraightLine,
        depreDouble: depreDouble
    };

}

function depreciationCalInput() {

    var cost = parseInt(document.getElementById("cost").value);
    var salvageValue = parseInt(document.getElementById("salvage-value").value);
    var usefulLife = parseInt(document.getElementById("useful-life").value);

    cost = checkValue(cost);
    salvageValue = checkValue(salvageValue);
    usefulLife = checkValue(usefulLife);

    var result = calculateDepreciation(
        cost,
        salvageValue,
        usefulLife);

    var depreciationStraighLineString = formatNumber(result.depreciaionStraightLine.toFixed(0));
    
    var ul = document.createElement("ul");
    ul.type = "1";

    for (var count = 0; count < usefulLife; count++) {
        var li = document.createElement("li");
        li.innerText = "Year " + (count + 1) + ": " + formatNumber(result.depreDouble[count].toFixed(0));
        
        ul.appendChild(li);
    }

    document.getElementById("depreicatiton-straigh-line").innerText = depreciationStraighLineString;

    var el = document.getElementById("depreicatiton-double-decline");
    ul.type = "1";
    el.innerHTML = "";
    el.appendChild(ul);

}

