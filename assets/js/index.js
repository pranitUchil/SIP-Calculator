var spinner = function () {
    setTimeout(function () {
        if ($('#spinner').length > 0) {
            $('#spinner').removeClass('show');
        }
    }, 1);
};
spinner();

function formatCurrency(value) {
    if (value >= 10000000) {
        return (value / 10000000).toFixed(2) + ' Crore';
    } else if (value >= 100000) {
        return (value / 100000).toFixed(2) + ' Lakh';
    } else {
        return value.toFixed(2) + ' Rupees';
    }
}

function calculateSIPReturns(investmentAmount, sipFrequency, sipDuration, expectedRateOfReturn) {
    // Convert the rate of return to a decimal
    const rateOfReturn = expectedRateOfReturn / 100;

    // Calculate the number of SIP periods based on the frequency
    const sipPeriods = sipFrequency * sipDuration;

    // Calculate the maturity amount using the correct formula for SIP calculation
    const maturityAmount = investmentAmount * ((Math.pow(1 + rateOfReturn / sipFrequency, sipPeriods) - 1) / (rateOfReturn / sipFrequency)) * (1 + rateOfReturn / sipFrequency);

    // Calculate the total invested amount
    const totalInvestedAmount = investmentAmount * sipPeriods;

    return {
        maturityAmount: formatCurrency(maturityAmount),
        totalInvestedAmount: formatCurrency(totalInvestedAmount)
    };
}
function calculateSip() {
    const investmentAmount = parseInt(document.getElementById('amount').value); // Initial investment amount
    const sipFrequency = 12; // Monthly SIP (12 SIPs per year)
    const sipDuration = parseInt(document.getElementById('years').value); // SIP duration in years
    const expectedRateOfReturn = parseInt(document.getElementById('rate_of_return').value); // Expected rate of return in percentage (10% in this example)  
    const maturityAmount = calculateSIPReturns(investmentAmount, sipFrequency, sipDuration, expectedRateOfReturn);
    if (maturityAmount.maturityAmount != "NaN Rupees" && maturityAmount.totalInvestedAmount != "NaN Rupees") {
        document.getElementById('invested_amount').innerHTML = `₹ ${maturityAmount.totalInvestedAmount}`;
        document.getElementById('maturity_amount').innerHTML = `₹ ${maturityAmount.maturityAmount}`;
    }
    else {
        document.getElementById('invested_amount').innerHTML = `₹ ${0}`;
        document.getElementById('maturity_amount').innerHTML = `₹ ${0}`;
    }
}

