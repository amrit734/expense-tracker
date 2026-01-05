const formInput = document.querySelector("#form-input");
const formFilter = document.querySelector("#form-filter");
const btnClear = document.querySelector("#btn-clear");
const selSort = document.querySelector("#sel-sort");
const h1TotalAmount = document.querySelector("#h1-total-amount");
const transactionHistory = document.querySelector(".transaction-history");

var listTransactions = [];

//Get Submitted Details
const getContent = () => {
    try {
        var date = new Date;
        var mDate = Date.now();

        var tName = document.querySelector("#txt-name").value;
        var tAmount = document.querySelector("#txt-amount").value;
        var tCategory = document.querySelector("#sel-category").value;
        var tType = document.querySelector("#sel-type").value;
        var tDate = document.querySelector("#dt-trans").value;
        var tDateTS = document.querySelector("#dt-trans").valueAsNumber;
        
        var formattedDate = tDate.substring(8, 10) + "-" + tDate.substring(5, 7) + "-" + tDate.substring(0 , 4);
        tDate = formattedDate;

        if ((tAmount - tAmount) != 0) {
            alert("Amount field must be numeric");
            throw new Error("Invalid input");
        }

        if (tAmount <= 0) {
            alert("Amount must be greater than 0");
            throw new Error("Invalid input");
        }

        if ((tCategory == "Choose Category") != 0) {
            alert("Choose a valid category");
            throw new Error("Invalid input");
        }

        if ((tType == "Choose Type") != 0) {
            alert("Choose a valid type");
            throw new Error("Invalid input");
        }

        var transaction = {
            transactionName : tName,
            transactionAmount : tAmount,
            transactionCategory : tCategory,
            transactionType: tType,
            transactionDate : tDate,
            transactionDateTS : tDateTS,
            milliDate : mDate
        }

        listTransactions.push(transaction);
    } catch (e) {
        console.log("An error occured, try again");
    }
}

//Function To Display Summary
const showSummary = () => {
    var jan = feb = mar = apr = may = jun = jul = aug = sep = oct = nov = dec = 0;
    listTransactions.forEach((item) => {
        switch (item.transactionDate.substring(3, 5)) {
            case "01":
                if (item.transactionType == "income")
                    jan += parseInt(item.transactionAmount);
                else 
                    jan -= parseInt(item.transactionAmount);
                break;
            case "02":
                if (item.transactionType == "income")
                    feb += parseInt(item.transactionAmount);
                else
                    feb -= parseInt(item.transactionAmount);
                break;
            case "03":
                if (item.transactionType == "income")
                    mar += parseInt(item.transactionAmount);
                else
                    mar -= parseInt(item.transactionAmount);
                break;
            case "04":
                if (item.transactionType == "income")
                    apr += parseInt(item.transactionAmount);
                else
                    apr -= parseInt(item.transactionAmount);
                break;
            case "05":
                if (item.transactionType == "income")
                    may += parseInt(item.transactionAmount);
                else
                    may -= parseInt(item.transactionAmount);
                break;
            case "06":
                if (item.transactionType == "income")
                    jun += parseInt(item.transactionAmount);
                else
                    jun -= parseInt(item.transactionAmount);
                break;
            case "07":
                if (item.transactionType == "income")
                    jul += parseInt(item.transactionAmount);
                else
                    jul -= parseInt(item.transactionAmount);
                break;
            case "08":
                if (item.transactionType == "income")
                    aug += parseInt(item.transactionAmount);
                else
                    aug -= parseInt(item.transactionAmount);
                break;
            case "09":
                if (item.transactionType == "income")
                    sep += parseInt(item.transactionAmount);
                else
                    sep -= parseInt(item.transactionAmount);
                break;
            case "10":
                if (item.transactionType == "income")
                    oct += parseInt(item.transactionAmount);
                else
                    oct -= parseInt(item.transactionAmount);
                break;
            case "11":
                if (item.transactionType == "income")
                    nov += parseInt(item.transactionAmount);
                else
                    nov -= parseInt(item.transactionAmount);
                break;
            case "12":
                if (item.transactionType == "income")
                    dec += parseInt(item.transactionAmount);
                else
                    dec -= parseInt(item.transactionAmount);
                break;
            default:
                break;
        }       
    })

    var summary = `SUMMARY
---------------------------
January : ${jan}
February : ${feb}
March : ${mar}
April : ${apr}
May : ${may}
June : ${jun}
July : ${jul}
August : ${aug}
September : ${sep}
October : ${oct}
November : ${nov}
December : ${dec}
`
    alert(summary);
}

//Selecting Summary Button And Adding Event Handling
var btnSummary = document.querySelector("#btn-summary");
btnSummary.addEventListener("click", () => {
    showSummary();
});

//Function To Remove Transaction
const removeTransaction = (e, msec) => {
    var target = e.parentNode.parentNode.parentNode;
    target.removeChild(e.parentNode.parentNode);

    var temp = [];
    listTransactions.forEach((item) => {
        if (item.milliDate != msec) {
            temp.push(item);
        }
    })
    listTransactions = temp;
    updateTransactionList();
}

//Function To Update Transaction List
const updateTransactionList = () => {
    clearTransactionHistory();
    listTransactions.forEach((item) => {
        var transactionElement = document.createElement("div");
        var content = `
        <div class = "transaction">
            <span>${item.transactionName}</span>
            <span>${"$" + parseInt(item.transactionAmount)}</span>
            <span>${item.transactionCategory}</span>
            <span>${item.transactionType}</span>
            <span>${item.transactionDate}</span>
            <span><button onclick = "removeTransaction(this, ${item.milliDate})">-</button></span>
        </div>
        `;
        transactionElement.innerHTML = content;
        transactionHistory.appendChild(transactionElement);
    })

    var totalAmount = 0;
    listTransactions.forEach((item) => {
        if (item.transactionType == "income") {
            totalAmount += parseInt(item.transactionAmount);
        } else {
            totalAmount -= parseInt(item.transactionAmount);
        }
    })

    h1TotalAmount.textContent = "Total Balance : $" + totalAmount;

    localStorage.setItem("transactionData", JSON.stringify(listTransactions));
}

//Function To Clear Transaction History
const clearTransactionHistory = () => {
    transactionHistory.innerHTML = `
        <div class = "transaction">
            <span>Transaction Name</span>
            <span>Transaction Amount</span>
            <span>Transaction Category</span>
            <span>Transaction Type</span>
            <span>Transaction Date</span>
        </div>
        `;
}

const filterTransactions = () => {
    try {
        var startDate = document.querySelector("#date-start").value;
        var endDate = document.querySelector("#date-end").value; 

        if ( (confirm("Are you sure you want to filter transactions? Filtered content : " + startDate + " to " + endDate) == true) ) {
            var temp = [];
            listTransactions.forEach((item) => {
                var formattedDate = parseInt(item.transactionDate.substring(6, 10)  + item.transactionDate.substring(3, 5) + item.transactionDate.substring(0, 2));
                var formattedStart = parseInt(startDate.substring(0, 4)  + startDate.substring(5, 7) + startDate.substring(8 , 10));
                var formattedEnd = parseInt(endDate.substring(0, 4)  + endDate.substring(5, 7) + endDate.substring(8 , 10));

                if (formattedDate >= formattedStart && formattedDate <= formattedEnd) {
                    temp.push(item);
                }
            })

            console.log(temp)
            listTransactions = temp;
            updateTransactionList();
        }
    } catch {
        console.log("An error occured, try again");
    }
}

formFilter.addEventListener("submit", (e) => {
    e.preventDefault();
    filterTransactions();
});

//Event Handling For Form Submission
formInput.addEventListener("submit", (e) => {
    e.preventDefault();
    getContent();
    updateTransactionList();
});

//Event Handling For Clear Button
btnClear.addEventListener("click", () => {
    listTransactions = [];
    clearTransactionHistory();
    updateTransactionList();
});

//Function To Sort Transaction By Added
const sortAdded = () => {
    for (i = 0; i < listTransactions.length; i++) {
        for (j = i + 1; j < listTransactions.length; j++) {
            if (listTransactions[j].milliDate < listTransactions[i].milliDate) {
                var temp = listTransactions[j];
                listTransactions[j] = listTransactions[i];
                listTransactions[i] = temp;
            }
        }
    }
    updateTransactionList();
}

//Function To Sort Transactions By Category
const sortCategory = () => {
    sortDate();
    var catCos = [];
    var catEnt = [];
    var catEss = [];
    var catGif = [];
    var catGro = [];
    var catOth = [];
    var result = [];
    listTransactions.forEach((item) => {
        switch (item.transactionCategory) {
            case "cosmetics":
                catCos.push(item);
                break;
            case "entertainment":
                catEnt.push(item);
                break;
            case "essentials":
                catEss.push(item);
                break;
            case "gift":
                catGif.push(item);
                break;
            case "groceries":
                catGro.push(item);
                break;
            case "other":
                catOth.push(item);
                break;
            default:
                break;
        }
    });
    result = result.concat(catCos, catEnt, catEss, catGif, catGro, catOth);
    listTransactions = result;
    updateTransactionList();
}

//Function To Sort Transactions By Date
const sortDate = () => {
    for (i = 0; i < listTransactions.length; i++) {
        for (j = i + 1; j < listTransactions.length; j++) {
            if (listTransactions[j].transactionDateTS < listTransactions[i].transactionDateTS) {
                var temp = listTransactions[j];
                listTransactions[j] = listTransactions[i];
                listTransactions[i] = temp;
            }
        }
    }
    updateTransactionList();
}

//Function To Sort Transactions
const sort = () => {
    switch (selSort.value) {
        case "added":
            sortAdded();
            break;
        case "category":
            sortCategory();
            break;
        case "date":
            sortDate();
            break;
        default:
            break;
    }
}

//Event Handling For Sort Element

selSort.addEventListener("click", () => {
    selSort.value = "Sort By";
});

selSort.addEventListener("change", () => {
    sort();
});

//Downloading CSV Data

var csvContent;

//Function To Create A CSV File
const makeCSV = () => {
    var rows = [];
    var head = ["Transaction Name", "Transaction Amount", "Transaction Category", "Transaction Type", "Transaction Date"];

    rows.push(head.join(","))

    listTransactions.forEach((item) => {
        var row = [item.transactionName, item.transactionAmount, item.transactionCategory, item.transactionType, item.transactionDate];
        rows.push(row.join(","))
    });

    csvContent = rows.join("\n");
}

//Selecting Button
var btnCreateDownload = document.querySelector("#btn-create");

//Event Handling For Downlaod Button
btnCreateDownload.addEventListener("click", () => {
    makeCSV();
    var btnDownload = document.querySelector("#btn-download");
    var btnCreate = document.querySelector("#btn-create");

    var csv = new Blob([csvContent],{ type: 'text/csv' });

    var url = URL.createObjectURL(csv);
    btnDownload.href = url;
    btnDownload.textContent = "Download Transactions";
    btnCreate.textContent = "Update Download File"
})

//Loading Stored Data
if (localStorage.getItem("transactionData")) {
    var data = JSON.parse(localStorage.getItem("transactionData"));
    listTransactions = data;
    updateTransactionList();
}


