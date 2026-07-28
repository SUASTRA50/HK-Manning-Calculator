// Semua input yang mempengaruhi perhitungan
const inputs = document.querySelectorAll(
    "#tonightOcc, #arrival, #departure, #backlog, #pickup, #turndown, #stayCredit, #depCredit, #backCredit, #pickCredit, #turnCredit, #creditRA"
);

// Jalankan calculate setiap ada perubahan input
inputs.forEach(input => {
    input.addEventListener("input", calculate);
});

// Jalankan sekali saat pertama kali halaman di-load
calculate();

function calculate() {
    //===========================
    // INPUT
    //===========================
    let tonightOcc = Number(document.getElementById("tonightOcc").value) || 0;
    let departure = Number(document.getElementById("departure").value) || 0;
    let backlog = Number(document.getElementById("backlog").value) || 0;
    let pickup = Number(document.getElementById("pickup").value) || 0;
    let turndown = Number(document.getElementById("turndown").value) || 0;

    //===========================
    // CREDIT WEIGHT
    //===========================
    let stayCredit = Number(document.getElementById("stayCredit").value) || 0;
    let depCredit = Number(document.getElementById("depCredit").value) || 0;
    let backCredit = Number(document.getElementById("backCredit").value) || 0;
    let pickCredit = Number(document.getElementById("pickCredit").value) || 0;
    let turnCredit = Number(document.getElementById("turnCredit").value) || 0;

    let creditRA = Number(document.getElementById("creditRA").value) || 1;

    //===========================
    // STAYOVER CALCULATION
    //===========================
    let stayover = tonightOcc - departure;
    if (stayover < 0) {
        stayover = 0;
    }

    //===========================
    // ISI QTY FIELD
    //===========================
    document.getElementById("stayQty").value = stayover;
    document.getElementById("depQty").value = departure;
    document.getElementById("backQty").value = backlog;
    document.getElementById("pickQty").value = pickup;
    document.getElementById("turnQty").value = turndown;

    //===========================
    // CONTRIBUTION / SUBTOTAL
    //===========================
    let stayTotal = stayover * stayCredit;
    let depTotal = departure * depCredit;
    let backTotal = backlog * backCredit;
    let pickTotal = pickup * pickCredit;
    let turnTotal = turndown * turnCredit;

    document.getElementById("stayTotal").innerHTML = stayTotal.toFixed(1);
    document.getElementById("depTotal").innerHTML = depTotal.toFixed(1);
    document.getElementById("backTotal").innerHTML = backTotal.toFixed(1);
    document.getElementById("pickTotal").innerHTML = pickTotal.toFixed(1);
    document.getElementById("turnTotal").innerHTML = turnTotal.toFixed(1);

    //===========================
    // TOTAL CLEANING CREDIT
    //===========================
    let total = stayTotal + depTotal + backTotal + pickTotal + turnTotal;
    document.getElementById("totalCleaning").innerHTML = total.toFixed(1);

    //===========================
    // REQUIRED ROOM ATTENDANT
    //===========================
    let ra = Math.ceil(total / creditRA);
    document.getElementById("requiredRA").innerHTML = ra;
}
