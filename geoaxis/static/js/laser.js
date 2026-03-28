(function () {
  var canvas = document.getElementById('laser-bg');
  var hero = document.querySelector('.hero');
  if (!canvas || !hero) return;
  var ctx = canvas.getContext('2d');

  var mouseX = -1, mouseY = -1;
  var mouseActive = false;
  var beams = [];
  var lastSpawn = 0;
  var nextDelay = 600;

  // Virtual target when mouse is away
  var virtualX = 0, virtualY = 0;
  var lastVirtualMove = 0;
  var virtualBeamsSpawned = 0;
  var virtualBeamsPerPoint = 4;

  function resize() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
    pickVirtualPoint();
  }
  window.addEventListener('resize', resize);
  resize();

  function pickVirtualPoint() {
    var pad = 0.15;
    virtualX = canvas.width * (pad + Math.random() * (1 - 2 * pad));
    virtualY = canvas.height * (pad + Math.random() * (1 - 2 * pad));
    virtualBeamsSpawned = 0;
  }

  hero.addEventListener('mouseenter', function () { mouseActive = true; });
  hero.addEventListener('mouseleave', function () { mouseActive = false; mouseX = -1; });
  hero.addEventListener('mousemove', function (e) {
    var rect = hero.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  function randomEdgePoint() {
    var edge = Math.random() * 4 | 0;
    var w = canvas.width, h = canvas.height;
    if (edge === 0) return { x: Math.random() * w, y: 0 };
    if (edge === 1) return { x: w, y: Math.random() * h };
    if (edge === 2) return { x: Math.random() * w, y: h };
    return { x: 0, y: Math.random() * h };
  }

  function formatDist(x1, y1, x2, y2) {
    var px = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    return (px * 0.15).toFixed(2) + ' m';
  }

  function targetX() { return mouseActive && mouseX >= 0 ? mouseX : virtualX; }
  function targetY() { return mouseActive && mouseY >= 0 ? mouseY : virtualY; }

  function spawnBeam() {
    var start = randomEdgePoint();
    beams.push({
      x: start.x, y: start.y,
      tx: targetX(), ty: targetY(),
      life: 1,
      decay: 0.15 + Math.random() * 0.15,
      dist: formatDist(start.x, start.y, targetX(), targetY())
    });
  }


  function draw(now) {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (mouseActive) {
      if (now - lastSpawn > nextDelay && beams.length < 5) {
        spawnBeam();
        lastSpawn = now;
        nextDelay = 600 + Math.random() * 1000;
      }
    } else {
      if (now - lastSpawn > nextDelay && beams.length < 5) {
        spawnBeam();
        lastSpawn = now;
        virtualBeamsSpawned++;
        if (virtualBeamsSpawned >= virtualBeamsPerPoint) {
          // Wait a pause then pick new point
          nextDelay = 3000 + Math.random() * 2000;
          pickVirtualPoint();
        } else {
          nextDelay = 800 + Math.random() * 600;
        }
      }
    }

    for (var i = beams.length - 1; i >= 0; i--) {
      var b = beams[i];
      b.life -= b.decay / 60;
      if (b.life <= 0) { beams.splice(i, 1); continue; }

      var alpha = b.life * 0.5;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(255,255,255,0.5)';
      ctx.beginPath();
      ctx.moveTo(b.x, b.y);
      ctx.lineTo(b.tx, b.ty);
      ctx.stroke();

      // Distance label at midpoint
      var mx = (b.x + b.tx) / 2;
      var my = (b.y + b.ty) / 2;
      ctx.shadowBlur = 0;
      ctx.font = '11px monospace';
      ctx.fillStyle = '#fff';
      ctx.globalAlpha = alpha * 0.9;
      ctx.fillText(b.dist, mx + 6, my - 4);
      ctx.restore();
    }
  }

  virtualX = canvas.width / 3;
  virtualY = canvas.height / 3;

  requestAnimationFrame(draw);
})();
