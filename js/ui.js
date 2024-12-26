export class UI {
  constructor(calculator) {
    this.calculator = calculator;
    this.gradesContainer = document.getElementById("gradesContainer");
    this.addGradeButton = document.getElementById("addGrade");
    this.gpa4Element = document.getElementById("gpa4");

    this.addGradeButton.addEventListener("click", () => this.addGradeRow());
    this.addGradeRow();
    this.initializeEventListeners();
  }

  addGradeRow() {
    if (this.gradesContainer.children.length >= 10) {
      this.showNotification("Máximo de 10 disciplinas atingido!");
      return;
    }

    const row = document.createElement("div");
    row.className = "grade-row";

    row.innerHTML = `
          <div class="input-group">
              <input type="number" class="grade" placeholder="Nota (0-10)" min="0" max="10" step="0.1">
          </div>
          <div class="input-group">
              <input type="number" class="credits" placeholder="Créditos" min="1" max="10">
          </div>
          <button class="btn-remove">×</button>
      `;

    this.setupRowEvents(row);
    this.gradesContainer.appendChild(row);
  }

  setupRowEvents(row) {
    const removeButton = row.querySelector(".btn-remove");
    const inputs = row.querySelectorAll("input");

    removeButton.addEventListener("click", () => {
      row.classList.add("fade-out");
      setTimeout(() => {
        row.remove();
        this.updateGPA();
      }, 300);
    });

    inputs.forEach((input) => {
      input.addEventListener("input", () => this.updateGPA());
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("focused");
      });
      input.addEventListener("blur", () => {
        input.parentElement.classList.remove("focused");
      });
    });
  }

  updateGPA() {
    const grades = Array.from(
      this.gradesContainer.querySelectorAll(".grade-row")
    )
      .map((row) => {
        return {
          grade: parseFloat(row.querySelector(".grade").value) || 0,
          credits: parseInt(row.querySelector(".credits").value) || 0,
        };
      })
      .filter((grade) => grade.grade && grade.credits);

    const { gpa4 } = this.calculator.calculateGPA(grades);
    this.animateValue(this.gpa4Element, gpa4);
  }

  animateValue(element, value) {
    if (value === "-" || element.textContent === value) {
      element.textContent = value;
      return;
    }

    const start = parseFloat(element.textContent) || 0;
    const end = parseFloat(value);
    const duration = 500;
    const startTime = performance.now();

    const updateValue = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentValue = start + (end - start) * this.easeOutQuad(progress);
      element.textContent = currentValue.toFixed(2);

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    requestAnimationFrame(updateValue);
  }

  easeOutQuad(t) {
    return t * (2 - t);
  }

  showNotification(message) {
    alert(message);
  }

  initializeEventListeners() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target.tagName === "INPUT") {
        const currentRow = e.target.closest(".grade-row");
        const nextRow = currentRow.nextElementSibling;

        if (!nextRow) {
          this.addGradeRow();
        }
      }
    });
  }
}
