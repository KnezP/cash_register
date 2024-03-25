const customerCash = document.getElementById("cash");
const result = document.getElementById("change-due");
const changeAmount = document.getElementById("change-value");
const purchaseBtn = document.getElementById("purchase-btn");

let cid =[
 ["PENNY", 1.01],
 ["NICKEL", 2.05],
 ["DIME", 3.1],
 ["QUARTER", 4.25],
 ["ONE", 90],
 ["FIVE", 55],
 ["TEN", 20],
 ["TWENTY", 60],
 ["ONE HUNDRED", 100]
];

const values = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
const price = 3.26;
cid.forEach((item) => { changeAmount.innerHTML += `<p id="${item[0]}" class="changes" >${item[0]}: $${item[1]}
</p>`});
const checkStatus = () => {
    let money = parseFloat(customerCash.value);
    let amount = parseFloat(cid.reduce((total, item) => total + parseFloat(item[1]), 0).toFixed(2));

    if (money < price) {
        alert("Customer does not have enough money to purchase the item");
    } else if (money === price) {
        result.innerText = "No change due - customer paid with exact cash";
    }
    else if(checkSufficient(money) === 0){
        result.innerText = "Status: INSUFFICIENT_FUNDS\u00A0";
    }
    else if ((amount - ((money-price).toFixed(2))) === 0 || amount === 0) {
        result.innerText = "Status: CLOSED\u00A0";
        let change = (money - price).toFixed(2);
        let startPoint = startingValue(change);
        calcChange(startPoint, change);
    } else {
        result.innerText = "Status: OPEN\u00A0";
        let change = (money - price).toFixed(2);
        let startPoint = startingValue(change);
        calcChange(startPoint, change);
    }
};
const startingValue = (total) => {
    for (let i = 0; i < values.length; i++) {
        if (total >= values[i]) return i;
    }
};

const calcChange = (start, change) => {
    let counter = 0;
    const ci = cid.reverse();
    console.log(ci)
    let temp = [ cid[6][0], cid[6][1]];
    ci[6][0] = cid[2][0];
    ci[6][1] = cid[2][1];
    ci[2][0] = temp[0];
    ci[2][1] = temp[1];
    for (let i = start; i < values.length; i++) {
        while (change >= values[i]   && (counter + 1) * values[i] <= ci[i][1] ) {
            change = (change - values[i]).toFixed(2);
            counter++;
        }
        if (change >= 0 && counter > 0) {
            result.innerText += `${ci[i][0]}: $${counter * values[i]}\n`;
            ci[i][1] = (ci[i][1] - counter * values[i]).toFixed(2);
            update(ci);
        }
        counter = 0;
    }
    cid = ci;
};
 const checkSufficient = (money) => {
    let counter = 0;
    let ci = cid.reverse();
    let change = (money - price).toFixed(2);
    for(let i=0;i< values.length; i++){
        while (change >= values[i] && (counter + 1) * values[i] <= ci[i][1]) {
            change = (change - values[i]).toFixed(2);
            counter ++;
        }
    }
    cid.reverse();
    return counter-1;
 };
const update = (cid) => {
    changeAmount.innerHTML = '<p><b>Change in drawer:</b></p>';
    cid.reverse().forEach((item) => {
        changeAmount.innerHTML += `<p id="${item[0]}" class="changes" >${item[0]} $${item[1]}</p>`;
    });
};
purchaseBtn.addEventListener("click", checkStatus);
