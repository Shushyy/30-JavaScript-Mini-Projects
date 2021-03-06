const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = `hsl(0, 100%, 50%)`;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

let drawing = false;
let lastX = 0;
let lastY = 0;
let strokeHue = 0;
let direction = true
ctx.lineWidth = 1;

const draw = (e) => {
  if (!drawing) return; //Prevents the function from running when mouse isn't down

  brushStroke(e, 0);

  if (ctx.lineWidth >= 20 || ctx.lineWidth < 1) direction = !direction;

  console.log(ctx.lineWidth);

  if (direction) {
    ctx.lineWidth += 0.25;
  } else {
    ctx.lineWidth -= 0.25;
  }
}

//Draws the line with an option to offset the X axis
const brushStroke = (event, offset) => {
  ctx.beginPath();
  ctx.moveTo(lastX, lastY + offset);
  ctx.lineTo(event.offsetX, event.offsetY + offset);
  ctx.strokeStyle = `hsl(${strokeHue}, 100%, 50%)`;
  ctx.stroke();
  [lastX, lastY] = [event.offsetX, event.offsetY];
  strokeHue += 0.3;
}

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
})
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', () => drawing = false)
canvas.addEventListener('mouseout', () => drawing = false)

//Clears canvas
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
})
