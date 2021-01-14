const form = document.querySelector("#contactForm");

const nameInput = document.querySelector("#name");

const emailInput = document.querySelector("#email");

const inputs = document.querySelectorAll("input");


// SUPPORT - if javascript is disabled, then use HTML validation
form.setAttribute("novalidate", true);



const deleteErrorField = function(input) {

    const error = input.nextElementSibling;

    if (error) {
        error.remove();
    }

}

const createErrorField = function(input, msg) {
        
    deleteErrorField(input);

    const div = document.createElement("div");
        
    div.style.setProperty("display", "none");
        
    div.innerText = msg;
    
    input.after(div);

}



const testInput = function (input, length) {
    return input.value.length > length;
}

const testEmail = function (input) {
    const reg = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/;
    return reg.test(input.value);
}

const markErrorField = function(input, check) {

    if (check)
        input.style.backgroundColor = "red";
    else {
        input.style.backgroundColor = "green";
        toggleErrorField(input, false);
    }
        

}

const toggleErrorField = function(input, check) {  
    
    const error = input.nextElementSibling;
    
    if (check)
        error.style.setProperty("display", "block")
    else
        error.style.setProperty("display", "none");


}

nameInput.addEventListener("input", e => {
    markErrorField (e.target, !testInput(e.target, 3));
    toggleErrorField(e.target, !testInput(e.target, 3));
})
emailInput.addEventListener("input", e => {
    markErrorField (e.target, !testEmail(e.target));
    toggleErrorField(e.target, !testEmail(e.target));
})


form.addEventListener("submit", e => {
    
    const errors = [];

    e.preventDefault();

    for(const input of inputs) {
        markErrorField(input, false);
        toggleErrorField(input, false);
    }
        

    if (!testInput(nameInput, 3)) {
        markErrorField(nameInput, true);
        errors.push("Error in name");
        toggleErrorField(nameInput, true);
    }
        
    
    if (!testEmail(emailInput)){
        markErrorField(emailInput, true);
        errors.push("Error in email");
        toggleErrorField(emailInput, true);
    }
        

    if (!errors.length) {
        e.target.submit();
    } else {
        const msg = document.querySelector("#msg");
        msg.innerHTML = 
       `${errors.map(el => `<li>${el}</li>`).join("")}`;

    }
        
        
        
    

})