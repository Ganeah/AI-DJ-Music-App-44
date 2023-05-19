music = "";
music2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0; 
song1_status = ""
song2_status = ""
function preload(){
    music = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(500,400);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw(){
    image(video,0,0,500,400);

    fill("red");
    stroke("red");
    song2_status = music2.isPlaying()
    
    if(scoreleftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        music.stop();
        if(song1_status==false){
            music2.play();
            document.getElementById("song_name").innerHTML = "Playing-Peter Pan";
        }
    }
    song1_status = music.isPlaying();
    
    if(scorerightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        music2.stop();
        if(song2_status==false){
            music.play();
            document.getElementById("song_name").innerHTML = "Playing-Harry Potter";
        }
    }
    
}

function modelLoaded(){
    console.log("PoseNet is intialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("Score left wrist = "+scoreleftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist x = "+leftWristX+"Left wrist y = "+leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist x = "+rightWristX+"Right wrist y = "+rightWristY);
    }
}