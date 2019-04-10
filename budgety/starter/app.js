//Budget controller
var budgetController = (function(){

    var Expense = function(id, description, value){
        this.id = id;
        this. description = description;
        this.value = value;
    }

    var Income = function(id, description, value){
        this.id = id;
        this. description = description;
        this.value = value;
    }

    var data = {
        allItems: {
         exp: [],
         inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
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
        expensesContainer: '.expense__list'
    }

    return{
        getInput: function() {
        return {
            type: document.querySelector(DOMstrings.inputType).value, //inc or exp
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value
          };
            },
            addListItem: function(obj, type) {
              var html, newHtml, element;
              //Create HTML string with placeholder text
              if (type === 'inc'){
              element = DOMstrings.incomeContainer;
              html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp'){
              element = DOMstrings.expensesContainer;
              html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
              //Replace placeholder text with some data
              newHtml = html.replace('%id%', obj.id);
              newHtml = newHtml.replace('%description%', obj.description);
              newHtml = newHtml.replace('%value%', obj.value);
              //Insert HTML into DOM
              document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
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

        document.addEventListener('keypress', function(e){
            if (e.keyCode === 13 || event.which === 13) ctrlAddItem();
        });
    };

    var ctrlAddItem = function(){
      var input, newItem;
         // 1. Get field input data
        var input = UIController.getInput();
         // 2. Add item to the budget controller
         var newItem = budgetCtrl.addItem(input.type, input.description, input.value);

         // 3. Add the item to the user interface
         UICtrl.addListItem(newItem, input.type);
         // 4. Calculate budget
         // 5. Display budget
    };

    return {
        init: function(){
          console.log('App has started');
            setupEventListeners();
        }
    };
})(budgetController, UIController);

controller.init();