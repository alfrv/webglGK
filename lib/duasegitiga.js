var gl,
    shaderProgram,
    vertices;

initGL();
createShaders();
createVertices();
draw();

function initGL() {
  var canvas = document.getElementById("canvas");
  console.log(canvas);
  gl = canvas.getContext("webgl");
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1, 1, 1, 1);
}

function createShaders() {
  var vs = "";
  vs += "attribute vec4 coords;";
  vs += "attribute float pointSize;";
  vs += "void main(void) {";
  vs += "  gl_Position = coords;";
  vs += "  gl_PointSize = pointSize;";
  vs += "}";

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vs);
  gl.compileShader(vertexShader);

  var fs = "";
  fs += "precision mediump float;";
  fs += "uniform vec4 color;";
  fs += "void main(void) {";
  fs += "  gl_FragColor = color;";
  fs += "}";

  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fs);
  gl.compileShader(fragmentShader);

  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);
}

function createVertices() {
  vertices = [
    // Bentuk 'V' terbalik (kiri)
    -0.5,  0.5, 0.0,
    -0.3, -0.5, 0.0,

    -0.3, -0.5, 0.0,
    -0.1,  0.5, 0.0,

    // Bentuk 'A' (kanan)
     0.3, -0.5, 0.0,
     0.5,  0.5, 0.0,

     0.5,  0.5, 0.0,
     0.7, -0.5, 0.0
  ];

  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  var coords = gl.getAttribLocation(shaderProgram, "coords");
  gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(coords);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  var pointSize = gl.getAttribLocation(shaderProgram, "pointSize");
  gl.vertexAttrib1f(pointSize, 20);

  var color = gl.getUniformLocation(shaderProgram, "color");
  gl.uniform4f(color, 0, 0, 0, 1); // Garis berwarna hitam
}

function draw() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.LINES, 0, 4); // Menggambar bentuk 'V' terbalik (4 titik: 0-1 dan 2-3)
  gl.drawArrays(gl.LINES, 4, 4); // Menggambar bentuk 'A' (4 titik: 4-5 dan 6-7)
}