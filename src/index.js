let gl,
shaderProgram,
vertices;

document.addEventListener("DOMContentLoaded", (e)=> {
    initGL();
    createShaders();
    createVertices();
    draw();
});


function initGL() {
    const canvas = document.getElementById("canvas");
    gl = canvas.getContext("webgl");
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1, 1, 1, 1);
}

function createShaders() {
    let vs = "";
    vs += "attribute vec4 coords;";
    vs += "attribute float pointSize;";
    vs += "void main(void) {";
    vs += " gl_Position = coords;";
    vs += " gl_PointSize = pointSize;";
    vs += "}";

    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vs);
    gl.compileShader(vertexShader);

    let fs = "";
    fs += "precision mediump float;"
    fs += "uniform vec4 color;";
    fs += "void main(void) {";
    fs += " gl_FragColor = color;";
    fs += "}"

    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
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
        -0.9, -0.9, 0.0,
        0.9, -0.9, 0.0,
        0.0, 0.9, 0.0
    ];

    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);


    let coords = gl.getAttribLocation(shaderProgram, "coords");
    //gl.vertexAttrib3f(coords, 0, 0, 0);
    gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coords);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    let pointSize = gl.getAttribLocation(shaderProgram, "pointSize");
    gl.vertexAttrib1f(pointSize, 10);

    let color = gl.getUniformLocation(shaderProgram, "color");
    gl.uniform4f(color, 1, 0.5, 0.5,1);
}

function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 3);
}