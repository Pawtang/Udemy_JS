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
    }
    
})();

// UI Controller
var UIController = (function(){

    
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn'
    }
 
    return{
    getInput: function(){
        return{
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value,
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
        
        document.querySelector(DOM.inputButton).addEventListener("click", ctrlAddItem);
        
        document.addEventListener('keypress', function(e){
            if (e.keyCode === 13 || event.which === 13) ctrlAddItem();
        });
    };    
    
    var ctrlAddItem = function(){
         // 1. Get field input data
        var input = UIController.getInput();
        console.log(input);
         // 2. Add item to the budget controller
         // 3. Add the item to the user interface
         // 4. Calculate budget
         // 5. Display budget    
    };   
    
    return {
        init: function(){
            setupEventListeners();
        }
    };
})(budgetController, UIController);

controller.init();