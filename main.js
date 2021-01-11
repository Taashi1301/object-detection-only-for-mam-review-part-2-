img="";
status="";
objects=[];
function preload(){
    img=loadImage("dogs-and-babies-header.jpg");
}

function setup(){
    canvas=createCanvas(600,600);
    canvas.center();
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded(){
    console.log("Model has been loaded");
    status=true;
    document.getElementById("status").innerHTML="Status: Detecting objects";
    objectdetector.detect(img, gotResults);
}

function draw(){
    image(img, 0, 0, 600, 600);
    if(status != ""){
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML="Status: objects detected.";
            fill(255, 0, 0);
            stroke(255,0,0);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+ " "+percent+" %", objects[i].x, objects[i].y-15);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    if(results){
        console.log(results);
        objects=results;
    }
}