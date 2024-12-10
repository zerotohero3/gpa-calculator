import { GPACalculator } from "./calculator.js";
import { UI } from "./ui.js";
import { Animations } from "./animations.js";

document.addEventListener("DOMContentLoaded", () => {
  const calculator = new GPACalculator();
  const ui = new UI(calculator);
  const animations = new Animations();

  animations.initializeParticles();
});
