prediction1 = ""
prediction2 = ""
// tHESE are the variable that will show 2 predictions to the emotion shown

Webcam.set({
    width:350,
    height: 350,
    image_format: "png",
    png_quality:90
});
// this is the web cam properties for the camera

camera = document.getElementById("camera");
// is the variable taking the div element were the live preview will be shown

Webcam.attach(camera);
// this is thre function wich is telling the selecter know wich element should the live preview be shown in


function take_snapshot() //function that will take a snap shot of the live preview
{
 // Webcam.snap is a inbuilt function of the webcam.js library
    Webcam.snap(function(data_uri)  {
        document.getElementById("result").innerHTML = "<img id='captured_image' src='" +data_uri+ "'/>";
        //the action above is getting the result elements and adding a captured image to the result div tag to present the image it self
    });
}



console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/GvLOQxJ6K/model.json", modelLoaded);


function modelLoaded() //the function to load the model
{
    console.log("Model LOADED");// the console display to tell us that the model loaded

}
function Check() // this is the function is for comparing the captured image wiht the trainde model image
{
    img = document.getElementById("captured_image");
    classifier.classify(img , gotResult); //classifier wich holds the traind model //classify is a pre-defined ml5 library function wich will compare the images
}

function speak() //to say what the predictions are
{
    var synth = window.speechSynthesis;
    speak_data1 = " The first prediction is " + prediction1;//variable that has words and the prediction to be said
    speak_data2 = " And The second prediction is " + prediction2;//variable that has words and the prediction to be said
    var utterThis = new SpeechSynthesisUtterance(speak_data1+speak_data2);//to put the first prediction and second prediction with added words
    synth.speak(utterThis);//to say what is in the utterThis variable out loud
}

function gotResult(error , results)// this is were the results are loaded
{

if (error)
{
    console.error(error);
}else 
{
console.log(results);
document.getElementById("result_emotion_name").innerHTML = results[0].label;
document.getElementById("result_emotion_name2").innerHTML = results[1].label;
prediction1 = results[0].label;
prediction2 = results[1].label;
speak();
if(results[0].label == "happy")
{
    document.getElementById("update_emoji").innerHTML = "&#128522";
}
if(results[0].label == "sad")
{
    document.getElementById("update_emoji").innerHTML = "&#128532";
}
if(results[0].label == "angry")
{
    document.getElementById("update_emoji").innerHTML = "&#128545";
}
if(results[0].label == "frustrated")
{
    document.getElementById("update_emoji").innerHTML = "&#128548";
}
if(results[1].label == "happy")
{
    document.getElementById("update_emoji2").innerHTML = "&#128522";
}
if(results[1].label == "sad")
{
    document.getElementById("update_emoji2").innerHTML = "&#128532";
}
if(results[1].label == "angry")
{
    document.getElementById("update_emoji2").innerHTML = "&#128545";
}
if(results[1].label == "frustrated")
{
    document.getElementById("update_emoji2").innerHTML = "&#128548";
}
}
}