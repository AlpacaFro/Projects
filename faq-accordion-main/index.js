document.addEventListener("DOMContentLoaded", () => {
    const questionWrappers = document.querySelectorAll(".question-wrapper");
  
    questionWrappers.forEach((wrapper) => {
      const button = wrapper.querySelector(".question");
      const answer = wrapper.nextElementSibling;
      const icon = wrapper.querySelector("img");
  
      button.addEventListener("click", () => {
        const isActive = answer.style.display === "block";
  
        document.querySelectorAll(".answer").forEach((answer) => {
          answer.style.display = "none";
        });
        document.querySelectorAll(".question-wrapper img").forEach((img) => {
          img.src = "./assets/images/icon-plus.svg";
        });
  
       
        if (!isActive) {
          answer.style.display = "block";
          icon.src = "./assets/images/icon-minus.svg";
        }
      });
    });
  });
  