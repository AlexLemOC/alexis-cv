import SimplexNoise from "simplex-noise";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import "./base.css";
import "./style.css";

const content = document.querySelector("#content");

gsap.registerPlugin(ScrollTrigger);

const simplex = new SimplexNoise();

// Creation de 1500 éléments auquel je donne une forme de cercle
for (let i = 0; i < 1500; i++) {
  // Je définie une étape tous les 250 cerlces (500px)
  const step = i % 250 === 0 && i !== 0;
  const div = document.createElement("div");

  if (step) {
    div.classList.add("step-circle");
  } else {
    div.classList.add("circle");
  }

  // J'utilise le "bruit de perlin" pour appliquer des coefficients qui multiplient des valeurs
  // Le coef est généré aléatoirement mais toujours légérement inférieur ou suppérieur à la précédente
  const c1 = simplex.noise2D(i * 0.003, i * 0.0033);
  const c2 = simplex.noise2D(i * 0.002, i * 0.001);

  const style = !step
    ? {
        transform: `translate(${c2 * 50}px) rotate(${c2 * 300}deg) scale(${
          3 + c1 * 3
        }, ${3 + c2 * 2})`,
        boxShadow: `0 0 0 .5px hsla(${Math.floor(i * 0.3)}, 70%, 70%, .1)`,
      }
    : {
        transform: `translate(${c2 * 50}px)`,
        border: `solid 5px hsla(${Math.floor(i * 0.3)}, 70%, 70%, 1)`,
      };
  Object.assign(div.style, style);
  content.appendChild(div);

  // Je définie la teinte de chaque cercle en fonction de sa position dans la liste
  if (step) {
    const div = document.createElement("div");
    div.classList.add("line");
    const style = {
      background: `linear-gradient(90deg, hsla(${Math.floor(
        i * 0.3
      )}, 70%, 70%, 1) 0%, black 100%)`,
    };
    Object.assign(div.style, style);
    content.appendChild(div);
  }
}

// Je créé une animation de cercle avec GSAP pour un déclanchement au centre de l'écran
const Circles = document.querySelectorAll(".circle");
const tl = gsap.timeline({
  scrollTrigger: {
    scrub: 1,
    start: "top top",
    end: "bottom center",
  },
});
Circles.forEach((c) => {
  tl.from(c, {
    opacity: 0,
  });
});

// Je créé une étape qui concerne un cerlcle en particulier qui sera une information du CV
const StepCircles = document.querySelectorAll(".step-circle");
StepCircles.forEach((step_circle) => {
  gsap.from(step_circle, {
    scrollTrigger: {
      trigger: step_circle,
      start: "top center",
      toggleActions: "restart none none reverse",
    },
    scale: 0,
    ease: "back",
  });
});

// Création de l'animation de la ligne qui indiquera l'étape d'une information du CV
const Lines = document.querySelectorAll(".line");
Lines.forEach((line) => {
  gsap.from(line, {
    scrollTrigger: {
      trigger: line,
      start: "top center",
      toggleActions: "restart none none reverse",
    },
    width: 0,
  });
});

// Animation des étapes
const Steps = document.querySelectorAll(".step");
Steps.forEach((step) => {
  gsap.from(step, {
    scrollTrigger: {
      trigger: step,
      start: "top center",
      toggleActions: "restart none none reverse",
    },
    opacity: 0,
  });
});