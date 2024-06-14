document.addEventListener('DOMContentLoaded', () => {
    const incomeForm = document.getElementById('income-form');
    const expenseForm = document.getElementById('expense-form');
    const transactionList = document.getElementById('transaction-list');
    const totalIncomeElement = document.getElementById('total-income');
    const totalExpenseElement = document.getElementById('total-expense');
    const totalIncomeSummary = document.getElementById('total-income-summary');
    const totalExpenseSummary = document.getElementById('total-expense-summary');
    const balanceElement = document.getElementById('balance');
    const clearAllButton = document.getElementById('clear-all');

    let transactions = [];

    incomeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('income-date').value;
        const name = document.getElementById('income-name').value;
        const amount = parseFloat(document.getElementById('income-amount').value).toFixed(2);
        
        transactions.push({ date, name, amount, type: 'income' });
        updateUI();
        incomeForm.reset();

        
    });

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('expense-date').value;
        const name = document.getElementById('expense-name').value;
        const amount = parseFloat(document.getElementById('expense-amount').value).toFixed(2);
        
        transactions.push({ date, name, amount, type: 'expense' });
        updateUI();
        expenseForm.reset();
    });

    transactionList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const index = e.target.dataset.index;
            transactions.splice(index, 1);
            updateUI();
        }
    });

    clearAllButton.addEventListener('click', () => {
        transactions = [];
        updateUI();
    });

    function updateUI() {
        transactionList.innerHTML = transactions.map((transaction, index) => `
            <tr class="${transaction.type}">
                <td>${transaction.date}</td>
                <td>${transaction.name}</td>
                <td>
                    ${transaction.type === 'income' ? transaction.amount + ' €' : ''}
                </td>
                <td>
                    ${transaction.type === 'expense' ? transaction.amount + ' €' : ''}
                </td>
                <td><button data-index="${index}">Löschen</button></td>
            </tr>
        `).join('');

        const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + parseFloat(t.amount), 0);
        const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + parseFloat(t.amount), 0);
        const balance = totalIncome - totalExpense;

        totalIncomeElement.textContent = totalIncome.toFixed(2) + ' €';
        totalExpenseElement.textContent = totalExpense.toFixed(2) + ' €';
        totalIncomeSummary.textContent = totalIncome.toFixed(2) + ' €';
        totalExpenseSummary.textContent = totalExpense.toFixed(2) + ' €';
        balanceElement.textContent = balance.toFixed(2) + ' €';
    }
});



// // Google Charts kütüphanesini yükleme
// google.charts.load('current', {'packages':['corechart']});
// google.charts.setOnLoadCallback(drawChart);

// // Grafiği çizme fonksiyonu
// function drawChart() {
//     // Veri setini oluştur (örnek veri)
//     var data = google.visualization.arrayToDataTable([
//         ['Category', 'Amount'],
//         ['Income', 60],
//         ['Expense', 40]
//     ]);

//     // Grafiği oluştur (pasta grafiği)
//     var options = {
//         title: 'Income vs Expense Ratio',
//         pieHole: 0.4, // Boşluk oranı
//         slices: {
//             0: { color: '#5cb85c' }, // Gelir rengi (yeşil)
//             1: { color: '#d9534f' } // Gider rengi (kırmızı)
//         },
//         legend: 'none' // Açıklamayı kaldır
//     };

//     var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
//     chart.draw(data, options);
// }




// script.js

// Print function
function printPage() {
    window.print();
}

// PDF export function using jsPDF
function exportToPDF() {
    // Yeni bir jsPDF nesnesi oluştur
    const doc = new jsPDF();

    // HTML elementini seç ve PDF'e dönüştür
    const element = document.querySelector('.container');
    doc.html(element, {
        callback: function (doc) {
            // PDF dosyasını indir
            doc.save('my_wallet.pdf');
        },
        x: 10,
        y: 10
    });
}
