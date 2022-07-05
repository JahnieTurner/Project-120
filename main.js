previous_result = ""
label = ""
accuracy = 0
accuracy1 = 0

function preload() {
    array = [loadImage("helmet.png"), loadImage("croc.png"), loadImage("roku.jpg"), loadImage("mona lisa.jpg"), loadImage("bottle.jpeg"), loadImage("mona lisa.jpg"), loadImage("converse.jpg"), loadImage("mona lisa.jpg"), loadImage("waist beads.png"), loadImage("mona lisa.jpg"), loadImage("iphone13.jpg"), ]
}

function setup() {
    canvas = createCanvas(450, 350);
    canvas.center();

    classifier = ml5.imageClassifier('MobileNet', modelLoaded)
}

function draw() {
    image(array, 0, 0, 450, 350)
    classifier.classify(array, gotResult)
}

function modelLoaded() {
    console.log("model is loaded")
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        label = results[0].label;
        accuracy = results[0].confidence;
        accuracy1 = Math.floor(accuracy)

        if ((accuracy > 0.5) && (previous_result != label)) {
            previous_result = results[0].label;
            synth = window.speechSynthesis
            speakData = "object detected is " + previous_result
            utterthis = new SpeechSynthesisUtterance(speakData)
            synth.speak(utterthis)

            document.getElementById("result_object_name").innerHTML = results[0].label
            document.getElementById("result_object_accuracy").innerHTML = results[0].confidence
        }
    }
}