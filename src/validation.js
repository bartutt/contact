const form = document.querySelector("#contactForm");
const inputs = document.querySelectorAll("[required]");
const msg = document.querySelector("#message");


// create characters counter
const countMsg = document.createElement("div");
countMsg.classList.add("count-msg");
msg.after(countMsg);


// SUPPORT - if javascript is disabled, then use HTML validation
form.setAttribute("novalidate", true);


/*
* 
*/
const deleteErrorTextField = function(input) {

    const error = input.nextElementSibling;

    if (error !== null ) {
        if (error.classList.contains("error-msg"))
            error.remove();
    }
};

/*
* 
*/
const createErrorTextField = function(input, msg) {
        
    deleteErrorTextField(input);

    const div = document.createElement("div");
        
    div.classList.add("error-msg");
    
    div.innerText = msg;
    
    input.after(div);

};


/*
* 
*/
const markErrorField = function(input, check) {

    if (check) {    
        input.classList.remove("valid");
        input.classList.add("invalid");   
    } else {     
        input.classList.add("valid");
        input.classList.remove("invalid");
              
        deleteErrorTextField(input);
    }
};


/*
* 
*/
const toggleErrorTextField = function(input, check) {  
    
    const error = input.nextElementSibling;
    
    if (check && !error.classList.contains("honey")) {
        error.style.setProperty("display", "block");
    }else {
        if (error.classList.contains("error-msg")) {
            error.style.setProperty("display", "none");
        }
    }
};


/*
* Check all inputs dynamically
*/
for (const input of inputs) {

    input.addEventListener("input", e => {
        markErrorField (e.target, !input.checkValidity());
        toggleErrorTextField(e.target, !input.checkValidity());
    })
};

/*
* Count message characters
*/
msg.addEventListener("input", e => {   
    countMsg.innerText = msg.value.length + "/250";
});


/*
* Check all inputs before submit
*/
form.addEventListener("submit", e => {
    

    e.preventDefault();

    let errors = false;

    for(const input of inputs) {
        //reset errors
        markErrorField(input, false);
        deleteErrorTextField(input);

        //check validation
        if (!input.checkValidity()) {
            markErrorField(input, true);
            createErrorTextField(input, input.dataset.textError);
            toggleErrorTextField(input, true);
            errors = true;
        }
    }
        

    if (!errors) {
        const submit = form.querySelector("[type=submit]");
        submit.disabled = true;
        submit.classList.add("sending");

        const formData = new FormData(form);

        const url = form.getAttribute("action");
        const method = form.getAttribute("method");

        fetch (url, {

            method: method.toUpperCase(),
            body: formData
        })
        .then(response => response.json())
        .then(response => {
            if (response.errors) {            
                const idErrorFields = response.errors.map(input => `#${input}`);
                const errorInputs = form.querySelectorAll(idErrorFields.join(","));
                
                for (const input of errorInputs) {
                    markErrorField(input, true);
                    createErrorTextField(input, input.dataset.textError);
                    toggleErrorTextField(input, true);
                    
                }
            } else { 
                if (response.status === "ok") {
                    form.innerHTML = "";
                    const div = document.createElement("div");
                    div.classList.add("form-success");
                    div.innerText = "Thank you!";
                    form.appendChild(div);
                }
                if (response.status === "error") {

                    const error = document.querySelector(".form-error");                 
                    if (error)
                        error.remove();
                    
                    const div = document.createElement("div");
                    div.classList.add("form-error");
                    div.innerHTML = ":( Something went wrong";
                    form.appendChild(div);
                }
            }
        }).finally(() => {

            submit.disabled = false;
            submit.classList.remove("sending");
        });     
    } 
});