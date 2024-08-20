// Lenis smooth scroll
const lenis = new Lenis()
lenis.on('scroll', (e) => {
//   console.log(e)
})
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)


// Animate on scroll
gsap.registerPlugin(ScrollTrigger);

const bgs = document.querySelectorAll('.bg');
const spans = document.querySelectorAll('span')
const cursorInfo = document.getElementById('info')
const cursor = document.querySelector(".cursor")

bgs.forEach((bg, index) => {
    gsap.fromTo(bg, 
        {
            y: 100,
            rotateX: '60deg',
            opacity: 0
        }, 
        {
            y: 0,
            rotateX: '0',
            opacity: 1,
            duration: .8,
            stagger: 0.2,
            scrollTrigger: {
                ease: 'power3.inOut',
                duration: 1,
                trigger: bg,
                start: "top 75%", 
                end: "bottom 25%",
                // markers: true,
                toggleActions: "play none none reverse"
            }
        }
    )

    /* Show the cursor info  */
    bg.addEventListener("mouseenter", ()=> {
        // console.log("mouse enter")
        gsap.to(cursorInfo, {
            scale: 1,
            visibility: 'visible',
        })
        gsap.to(cursor, {
            visibility: 'hidden',
        })
        gsap.to(bg,{
            scale: 1.05,
        })
    })

    /* Hide the cursor info  */
    bg.addEventListener("mouseleave", ()=> {
        // console.log("mouse leave")
        gsap.to(cursorInfo, {
            scale: 0,
            visibility: 'hidden',
        })
        gsap.to(cursor, {
            visibility: 'visible',
        })
        gsap.to(bg,{
            scale: 1,
        })
    })
})


// Cursor Animation 
document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.querySelector(".cursor");
    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;

    // Lerp function to interpolate between positions
    function lerp(start, end, amount) {
        return (1 - amount) * start + amount * end;
    }

    // Update the cursor's position
    function updateCursor() {
        posX = lerp(posX, mouseX, 0.1); // 0.1 is the interpolation amount, adjust for more or less smoothing
        posY = lerp(posY, mouseY, 0.1);

        cursor.style.transform = `translate(${posX}px, ${posY}px)`;

        requestAnimationFrame(updateCursor);
    }

    // Update the mouse position on move
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Start the cursor update loop
    updateCursor();
});
