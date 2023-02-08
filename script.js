status = "";
objectsIdentified = [];

function setup(){
    canvas = createCanvas(490, 390);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status: Currently Detecting the Objects";
    objectsName = document.getElementById("object").value;
}

function draw(){
    image(video, 0, 0, 490, 390);
    if(status != ""){
        for(i=0; i<objectsIdentified.length; i++){
            document.getElementById("status").innerHTML = "Status: The objects have been detected";

            fill("#FF0000");
            percentage = floor(objectsIdentified[i].confidence*100);
            text(objectsIdentified[i].label+" "+percent+"%", objectsIdentified[i].x+14, objectsIdentified[i].y+14);
            noFill();
            stroke("#FF0000");
            rect(objectsIdentified[i].x, objectsIdentified[i].y, objectsIdentified[i].width, objectsIdentified[i].height);

            if(objectsIdentified[i].label == objectsName){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("objectFoundOrNot").innerHTML = objectsName+" has been found";
                synthesis = window.speechSynthesis;
                speakThat = new SpeechSynthesisUtterance(objectsName+" has been found");
                synthesis.speak(speakThat);
            }
            else {
                document.getElementById("objectFoundOrNot").innerHTML = objectsName+" has not been found";
            }
        }
    }
}

function modelLoaded(){
    console.log("Model is Loaded");
    status = true;
}

function gotResults(error, result){
    if(error){
        console.log(error);
    }
    console.log(result);
    objectsIdentified = result;
}