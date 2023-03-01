var noseX = 0;
var noseY = 0;
var rightEyeX = 0;
var rightEyeY = 0;
var leftEyeX = 0;
var leftEyeY = 0;
var rightWristX = 0;
var leftWristX = 0;

function preload() {
};

function setup() {
    video = createCapture(VIDEO)
    video.size(550, 500);
    canvas = createCanvas(550, 450);
    canvas.position(560, 222);
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
};

function draw() {
    background("#2B2929");
    fill("black");
    stroke("black");
    square(noseX, noseY, abs(floor(rightWristX - leftWristX)));
    triangle(leftEyeX, leftEyeY, rightEyeX, rightEyeY, noseX, noseY);
    document.getElementById("status_update_square").innerHTML = "The width and the height of the square is = " + abs(floor(rightWristX - leftWristX)) + "px";
    document.getElementById("status_update_triangle").innerHTML = "The length of the sides of the triangle are = " + abs(floor(leftEyeX - rightEyeX)) + "px, " + abs(floor(noseX - leftEyeX)) + "px, " + abs(floor(noseX - rightEyeX)) + "px";
};

function modelLoaded() {
    console.log("ml5 Version: " + ml5.version + ", model has been successfully loaded!");
};

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("Nose X = " + noseX + "Nose Y = " + noseY);
        rightWristX = results[0].pose.rightWrist.x;
        leftWristX = results[0].pose.leftWrist.x;
        leftEyeX = results[0].pose.leftEye.x;
        rightEyeX = results[0].pose.rightEye.x;
        leftEyeY = results[0].pose.leftEye.y;
        rightEyeY = results[0].pose.rightEye.y;
    }
    else {
        console.log("ERROR: POSENET IS NOT EXECUTED CORRECTLY.");
    };
};