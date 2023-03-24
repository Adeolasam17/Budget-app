class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }

  submitBudgetForm() {
    const Value = this.budgetInput.value;
    if  (Value === '' || Value < 0) {
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innerHTML = `<p>Budget value can't be empty or negative!</p>`;
      const Self = this;
      setTimeout(() => {
        Self.budgetFeedback.classList.remove("showItem");
      },2000)
    } else {
      this.budgetInput.value = '';
      this.budgetAmount.textContent = Value;
      this.showBalance();
    }
  }

  showBalance() {
    let Expense = this.totalExpense();
    const Total = parseInt(this.budgetAmount.textContent) - Expense;
    this.balanceAmount.textContent = Total;

    if (Total < 0) {
      this.balance.classList.remove('showGreen', 'showBlack');
      this.balance.classList.add('showRed');
    } else if (Total > 0) {
      this.balance.classList.add('showGreen');
      this.balance.classList.remove("showRed", "showBlack");
    } else if (Total === 0) {
      this.balance.classList.add('showBlack');
      this.balance.classList.remove("showRed", "showGreen");
    }
  }

  submitExpenseForm() {
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;

    if (expenseValue === '' || amountValue === '' || amountValue < 0) {
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = `<p>Expense values can't be empty or negative!</p>`;
      const Self = this;
      setTimeout(() => {
        Self.expenseFeedback.classList.remove("showItem");
      }, 2000);
    } else {
      let amount = parseInt(amountValue);
      this.expenseInput.value = '';
      this.amountInput.value = '';

      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amount,
      };
  
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showBalance();
    }

  }

  addExpense(expense) {
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">

         <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
         <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

         <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </div>`;
    this.expenseList.appendChild(div);
  }

  totalExpense() {
    let total = 0;
    total = this.itemList.reduce((acc, curr) => {
      acc += curr.amount;
      return acc;
    }, 0);
    this.expenseAmount.textContent = total;
    return total;
  }

  editExpense(element) {
    const ID = parseInt(element.dataset.id);
    const Parent = element.parentElement.parentElement.parentElement;

    this.expenseList.removeChild(Parent);

    const Expense = this.itemList.filter((item) => {
      return item.id === ID;
    })
    this.expenseInput.value = Expense[0].title;
    this.amountInput.value = Expense[0].amount;
    
    const TempList = this.itemList.filter((item) => {
      return item.id !== ID;
    })
    this.itemList = TempList;
    this.showBalance();
  }
  
  deleteExpense(element) {
    const ID = parseInt(element.dataset.id);
    const Parent = element.parentElement.parentElement.parentElement;

    this.expenseList.removeChild(Parent);

    const TempList = this.itemList.filter((item) => {
      return item.id !== ID;
    });
    this.itemList = TempList;
    this.showBalance();
  }

}

function eventlisteners() {
  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");

  const ui = new UI();

  budgetForm.addEventListener('submit', (event) => {
    event.preventDefault();
    ui.submitBudgetForm();
  })
  expenseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    ui.submitExpenseForm();
  })
  expenseList.addEventListener('click', (event) => {
    if (event.target.parentElement.classList.contains('edit-icon')) {
      ui.editExpense(event.target.parentElement);
    } else if (event.target.parentElement.classList.contains("delete-icon")) {
      ui.deleteExpense(event.target.parentElement);
    }
  })

}

document.addEventListener('DOMContentLoaded', () => {
  eventlisteners();
})