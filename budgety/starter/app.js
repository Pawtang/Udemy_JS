//Budget controller
var budgetController = (function(){
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var calculateTotal = function(type) {
      var sum = 0;
      data.allItems[type].forEach(function(el){
        sum += el.value;
        });
      data.totals[type] = sum;
    };

    var data = {
        allItems: {
         exp: [],
         inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };
    return{
      addItem: function(type, des, val){
        var newItem, ID;
        //Create new ID
        if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        } else ID = 0;
        // Create new item based on 'inc' or 'exp'
          if (type === 'exp'){
          newItem = new Expense(ID, des, val);
        } else if (type === 'inc'){
          newItem = new Income(ID, des, val);
        }
        //Push into data structure
        data.allItems[type].push(newItem);

        // Return the new element
        return newItem;
      },

      calculateBudget: function() {
        calculateTotal('exp');
        calculateTotal('inc');
        data.budget = data.totals.inc - data.totals.exp;
        if (data.totals.inc > 0){
        data.percentage = Math.round((data.totals.exp / data.totals.inc)*100);
        } else {
        data.percentage = -1;
        }
      },
      getBudget: function(){
        return{
          budget: data.budget,
          totalInc: data.totals.inc,
          totalExp: data.totals.exp,
          percentage: data.percentage
        }
      },
      testing: function() {
        console.log(data);
      }
    }
})(); // END BUDGET CONTROLLER

// UI Controller
var UIController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
    }
    return{
        getInput: function() {
          return {
              type: document.querySelector(DOMstrings.inputType).value, //inc or exp
              description: document.querySelector(DOMstrings.inputDescription).value,
              value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
            },
        addListItem: function(obj, type) {
              var html, newHtml, element;
              //Create HTML string with placeholder text
              if (type === 'inc'){
              element = DOMstrings.incomeContainer;
              html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp'){
              element = DOMstrings.expensesContainer;
              html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
              //Replace placeholder text with some data
              newHtml = html.replace('%id%', obj.id);
              newHtml = newHtml.replace('%description%', obj.description);
              newHtml = newHtml.replace('%value%', obj.value);
              //Insert HTML into DOM
              document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            },
        clearFields: function(){
                var fields, fieldsArr;
                var fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
                var fieldsArr = Array.prototype.slice.call(fields);
                fieldsArr.forEach(function(current, index, array) {
                    current.value = '';
                });
                fieldsArr[0].focus();
            },

          displayBudget: function(obj) {
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp;
            if (obj.percentage > 0) {
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
          } else {
            document.querySelector(DOMstrings.percentageLabel).textContent = '---';

          }
          },

          getDOMstrings: function() {
            return DOMstrings;
            }
          };
})();





//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
        document.addEventListener('keypress', function(event){
            if (event.keyCode === 13 || event.which === 13) ctrlAddItem();
          });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
      };

    var updateBudget = function() {
      budgetCtrl.calculateBudget();
      var budget = budgetCtrl.getBudget();
      UICtrl.displayBudget(budget);
    };

    var ctrlAddItem = function(){
      var input, newItem;
      var input = UIController.getInput();  // 1. Get field input data
      if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
        var newItem = budgetCtrl.addItem(input.type, input.description, input.value); // 2. Add item to the budget controller
        UICtrl.addListItem(newItem, input.type);  // 3. Add the item to the user interface
        UICtrl.clearFields(); //4. Clear the fields
        updateBudget(); //5. calculate and update budget
      }
    };

    var ctrlDeleteItem = function(event) {
      var itemID, splitID, type, ID;
      itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
      console.log(itemID);
      if (itemID) {
        splitID = itemID.split('-');
        type = splitID[0];
        ID = splitID[1];
      }

    };

    return {
        init: function(){
          console.log('App has started');
          setupEventListeners();
          UICtrl.displayBudget({
            budget: 0,
            totalInc: 0,
            totalExp: 0,
            percentage: -1
          })
        }
    };
})(budgetController, UIController);

controller.init();
