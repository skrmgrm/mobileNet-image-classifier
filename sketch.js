// const bird = document.getElementById("bird");
// const kitten = document.getElementById("kitten");
const result = document.getElementById("result"); // The result tag in the HTML
const probability = document.getElementById("probability"); // The probability tag in the HTML

const chooseFile = document.getElementById("choose-file");
const imgPreview = document.getElementById("img-preview");

chooseFile.addEventListener("change", () => {
  getImgData();
});

function getImgData() {
  const files = chooseFile.files[0];
  if (files) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);
    fileReader.addEventListener("load", function () {
      imgPreview.style.display = "block";
      imgPreview.innerHTML = '<img id="image" src="' + this.result + '" />';

      const image = document.getElementById("image");

      modelLoaded(image);
    });
  }
}
const modelLoaded = async (image) => {
  const results = await classifier.classify(image, (error, results) => {
    return results;
  });

  result.innerText = results[0].label;
  probability.innerText = results[0].confidence;
};

const classifier = ml5.imageClassifier("MobileNet", modelLoaded);
