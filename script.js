window.onscroll = function () {
  scrollFunction();
};

const header = document.getElementById("navbar"); // Déplacez la déclaration de la variable header ici

function scrollFunction() {
  if (!document.body.classList.contains("nav-open")) {
    // Vérifiez si le menu burger n'est pas ouvert
    header.style.background = "#212529"; // Changez la couleur de fond du header en fonction de la position de défilement
    header.style.position = "fixed"; // Fixez le header en haut de l'écran
  } else {
    header.style.background = "transparent"; // Remettez la couleur de fond transparente
    header.style.position = "relative"; // Remettez la position normale
  }
}

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav__link");

navToggle.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
  scrollFunction(); // Appelez la fonction scrollFunction lorsque le menu est ouvert/fermé
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    scrollFunction(); // Appelez la fonction scrollFunction lorsque l'un des liens est cliqué
  });
});

// modified version of random-normal
function normalPool(o){var r=0;do{var a=Math.round(normal({mean:o.mean,dev:o.dev}));if(a<o.pool.length&&a>=0)return o.pool[a];r++}while(r<100)}function randomNormal(o){if(o=Object.assign({mean:0,dev:1,pool:[]},o),Array.isArray(o.pool)&&o.pool.length>0)return normalPool(o);var r,a,n,e,l=o.mean,t=o.dev;do{r=(a=2*Math.random()-1)*a+(n=2*Math.random()-1)*n}while(r>=1);return e=a*Math.sqrt(-2*Math.log(r)/r),t*e+l}

const NUM_PARTICLES = 600;
const PARTICLE_SIZE = 0.5; // View heights
const SPEED = 20000; // Milliseconds

let particles = [];

function rand(low, high) {
  return Math.random() * (high - low) + low;
}

function createParticle(canvas) {
  const colour = {
    r: 255,
    g: randomNormal({ mean: 125, dev: 20 }),
    b: 50,
    a: rand(0, 1),
  };
  return {
    x: -2,
    y: -2,
    diameter: Math.max(0, randomNormal({ mean: PARTICLE_SIZE, dev: PARTICLE_SIZE / 2 })),
    duration: randomNormal({ mean: SPEED, dev: SPEED * 0.1 }),
    amplitude: randomNormal({ mean: 16, dev: 2 }),
    offsetY: randomNormal({ mean: 0, dev: 10 }),
    arc: Math.PI * 2,
    startTime: performance.now() - rand(0, SPEED),
    colour: `rgba(${colour.r}, ${colour.g}, ${colour.b}, ${colour.a})`,
  }
}

function moveParticle(particle, canvas, time) {
  const progress = ((time - particle.startTime) % particle.duration) / particle.duration;
  return {
    ...particle,
    x: progress,
    y: ((Math.sin(progress * particle.arc) * particle.amplitude) + particle.offsetY),
  };
}

function drawParticle(particle, canvas, ctx) {
  canvas = document.getElementById('particle-canvas');
  const vh = canvas.height / 100;

  ctx.fillStyle = particle.colour;
  ctx.beginPath();
  ctx.ellipse(
    particle.x * canvas.width,
    particle.y * vh + (canvas.height / 2),
    particle.diameter * vh,
    particle.diameter * vh,
    0,
    0,
    2 * Math.PI
  );
  ctx.fill();
}

function draw(time, canvas, ctx) {
  // Move particles
  particles.forEach((particle, index) => {
    particles[index] = moveParticle(particle, canvas, time);
  })

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the particles
  particles.forEach((particle) => {
    drawParticle(particle, canvas, ctx);
  })

  // Schedule next frame
  requestAnimationFrame((time) => draw(time, canvas, ctx));
}

function initializeCanvas() {
  let canvas = document.getElementById('particle-canvas');
  canvas.width = canvas.offsetWidth * window.devicePixelRatio;
  canvas.height = canvas.offsetHeight * window.devicePixelRatio;
  let ctx = canvas.getContext("2d");

  window.addEventListener('resize', () => {
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx = canvas.getContext("2d");
  })

  return [canvas, ctx];
}

function startAnimation() {
  const [canvas, ctx] = initializeCanvas();

  // Create a bunch of particles
  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push(createParticle(canvas));
  }
  
  requestAnimationFrame((time) => draw(time, canvas, ctx));
};

// Start animation when document is loaded
(function () {
  if (document.readystate !== 'loading') {
    startAnimation();
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      startAnimation();
    })
  }
}());

//Curseur
let script = document.currentScript

window.addEventListener("DOMContentLoaded",() => {

    let iDiv = document.createElement('div');
    iDiv.id = 'cursor';
    if(script.getAttribute("difference") == "disable"){
        iDiv.className = 'mscursor-cursor';
    } else {
        iDiv.className = 'mscursor-cursor mscursor-difference';
    }
    document.getElementsByTagName('body')[0].appendChild(iDiv);

    let pauseAnimation = script.getAttribute("pause-animation");
  
    let innerDiv = document.createElement('div');

    if(script.getAttribute("color") !== null){
        iDiv.style.backgroundColor = script.getAttribute("color");
    } else {
        if(script.getAttribute("difference") == "disable"){
            iDiv.style.backgroundColor = "black"
        } else {
            iDiv.style.backgroundColor = "#D5CEA3 "
        }
    }

        if(pauseAnimation !== null && pauseAnimation == "disable"){
            if(script.getAttribute("circle-outline") == "disable"){
                innerDiv.className = 'mscursor-circle';
            } else {
                innerDiv.className = 'mscursor-circle new';
            }
        } else{
            if(script.getAttribute("circle-outline") == "disable"){
                innerDiv.className = 'mscursor-circle mscursor-border-transform';
            } else {
                innerDiv.className = 'mscursor-circle new mscursor-border-transform';
            }
        }

        
  
    iDiv.appendChild(innerDiv); 

    let size = Number(script.getAttribute("size")) || 30
  
    for(let i = 0; i < size; i++){
      let innerDiv = document.createElement('div');
      if(pauseAnimation !== null && pauseAnimation == "disable"){
        innerDiv.className = 'mscursor-circle';
    } else {
        innerDiv.className = 'mscursor-circle mscursor-border-transform';
    }
    
    if(script.getAttribute("color") !== null){
        innerDiv.style.backgroundColor = script.getAttribute("color");
    } else {
        if(script.getAttribute("difference") == "disable"){
            innerDiv.style.backgroundColor = "black"
        } else {
            innerDiv.style.backgroundColor = "#D5CEA3"
        }
    }
      iDiv.appendChild(innerDiv);
    }

  
  
  const coords = { x: 0, y: 0 };
  let timeout
  const circles = document.querySelectorAll(".mscursor-circle");
  
  const cursor = document.querySelector(".mscursor-cursor");
  
  circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    if(script.getAttribute("gradient") !== null){
        let colors = script.getAttribute("gradient").split(",")
        circle.style.backgroundColor = colors[Math.floor((index * colors.length)/ circles.length)];

        document.querySelector("div.new").border = `0.5px solid ${colors[0]}`
    }
  });
  
  const addclass = (e) => {
    if(script.getAttribute("pause-animation") !== "disable"){
      document.body.classList.remove("mscursor-nocursor")
      if(script.getAttribute("circle-outline") !== "disable"){
        document.querySelector("div.new").classList.remove("mscursor-scale-outline")
        document.querySelector("div.new").style.border=""
      }
      document.querySelectorAll("div.mscursor-circle").forEach(element => {
          element.classList.remove("mscursor-scale")
      })
    }
        coords.x = e.clientX;
        coords.y = e.clientY;
  };

  window.addEventListener("mousemove", (e) => addclass(e)) 
  window.addEventListener("touchmove", (e) => addclass(e.touches[0])) 
  
    function animateCircles() {
        let x = coords.x;
        let y = coords.y;
  
        cursor.style.top = x;
        cursor.style.left = y;
        
        circles.forEach(function (circle, index) {
          circle.style.left = x - 12 + "px";
          circle.style.top = y - 12 + "px";
  
          circle.style.scale = (circles.length - index) / circles.length;
  
          circle.x = x;
          circle.y = y;
  
          const nextCircle = circles[index + 1] || circles[0];
          x += (nextCircle.x - x) * 0.3;
          y += (nextCircle.y - y) * 0.3;
        });
  
        requestAnimationFrame(animateCircles);
      }
  
      animateCircles();

      if(script.getAttribute("cursor") == "disable"){
        document.body.classList.add("mscursor-nocursor")
      }
  
      if(script.getAttribute("pause-animation") !== "disable"){        
        const moove = () => {
            clearTimeout(timeout);
            timeout = setTimeout(
            () => {    
            document.body.classList.add("mscursor-nocursor")
            if(script.getAttribute("mscursor-circle-outline") !== "disable"){
                document.querySelector("div.new").classList.add("mscursor-scale-outline")

                if(script.getAttribute("color") !== null){
                    if(script.getAttribute("color-outline") !== null){
                        document.querySelector("div.new").style.border= `0.5px solid ${script.getAttribute("color-outline")}`;
                    } else {
                        document.querySelector("div.new").style.border= `0.5px solid ${script.getAttribute("color")}`;
                    }
                } else {
                    if(script.getAttribute("color-outline") !== null){
                        document.querySelector("div.new").style.border= `0.5px solid ${script.getAttribute("color-outline")}`;
                    } else {
                        if(script.getAttribute("difference") == "disable"){
                            document.querySelector("div.new").style.border= `0.5px solid black`
                        } else {
                            document.querySelector("div.new").style.border= `0.5px solid #D5CEA3 `
                        }
                    }
                }
                
            }
            document.querySelectorAll("div.mscursor-circle").forEach(element => {
                element.classList.add("mscursor-scale")
            })
            }, 100)
        }

        document.onmousemove = moove;
        document.ontouchmove = moove;
      }
  })

  function isMobileDevice() {
    return window.innerWidth <= 768; // Vous pouvez ajuster cette valeur en fonction de votre design responsive
  }


  // Back to top bouton
