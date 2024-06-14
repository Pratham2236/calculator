document.addEventListener("DOMContentLoaded", () => {
    const fields = [
      {
        input: document.querySelector("#input1"),
        valid: document.querySelector("#valid1"),
        validation: validateLength,
      },
      {
        input: document.querySelector("#input2"),
        valid: document.querySelector("#valid2"),
        validation: validateNumeric,
      },
      {
        input: document.querySelector("#input3"),
        valid: document.querySelector("#valid3"),
        validation: validateEmail,
      },
      {
        input: document.querySelector("#input4"),
        valid: document.querySelector("#valid4"),
        validation: validateAlphabetic,
      },
      {
        input: document.querySelector("#input5"),
        valid: document.querySelector("#valid5"),
        validation: validateCustom,
      },
    ];
  
    function validateLength(input, valid) {
      if (input.value === "") {
        valid.textContent = "please Enter your name";
        valid.style.color = "red";
        input.style.borderColor = "red";
      } else {
        input.style.borderColor = "green";
        valid.textContent = "Approved";
        valid.style.color = "green";
      }
    }
  
    function validateNumeric(input, valid) {
      if (/^\d+$/.test(input.value) && input.value.length == 10) {
        valid.textContent = "Approved";
        valid.style.color = "green";
        input.style.borderColor = "green";
      } else {
        input.style.borderColor = "red";
        valid.textContent = "please enter phone number (10 - digits )";
        valid.style.color = "red";
      }
    }
  
    function validateEmail(input, valid) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailPattern.test(input.value)) {
        valid.textContent = "Approved";
        valid.style.color = "green";
        input.style.borderColor = "green";
      } else {
        input.style.borderColor = "red";
        valid.textContent = "Please enter a valid email address";
        valid.style.color = "red";
      }
    }
  
    function validateAlphabetic(input, valid) {
      if (/^[a-zA-Z]+$/.test(input.value)) {
        valid.textContent = "Approved";
        valid.style.color = "green";
        input.style.borderColor = "green";
      } else {
        input.style.borderColor = "red";
        valid.textContent = "Please enter alphabetic characters only";
        valid.style.color = "red";
      }
    }
  
    function validateCustom(input, valid) {
      if (input.value.length === 5) {
        valid.textContent = "Approved";
        valid.style.color = "green";
        input.style.borderColor = "green";
      } else {
        input.style.borderColor = "red";
        valid.textContent = "Please enter exactly 5 characters";
        valid.style.color = "red";
      }
    }
  
    document.querySelector("#submit").addEventListener("click", () => {
      let allValid = true;
      fields.forEach((field) => {
        field.validation(field.input, field.valid);
        if (field.valid.style.color === "red") {
          allValid = false;
        }
      });
      if (allValid) {
        showSuccessToast();   
      } else {
        showErrorToast();
      }
    });
  });
  
  function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
      const toast = document.createElement("div");
  
      const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
      }, duration + 1000);
  
      toast.onclick = function (e) {
        if (e.target.closest(".toast__close")) {
          main.removeChild(toast);
          clearTimeout(autoRemoveId);
        }
      };
  
      const icons = {
        success: "fas fa-check-circle",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-circle",
        error: "fas fa-exclamation-circle",
      };
      const icon = icons[type];
      const delay = (duration / 1000).toFixed(2);
  
      toast.classList.add("toast", `toast--${type}`);
      toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
  
      toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
      main.appendChild(toast);
    }
  }
  
  function showSuccessToast() {
    toast({
      title: "Success",
      message: "You Logged In Successfully",
      type: "success",
      duration: 5000,
    });
  }
  
  function showErrorToast() {
    toast({
      title: "Failure",
      message: "An error occurred, please fill all the fields.",
      type: "error",
      duration: 5000,
    });
  }
  