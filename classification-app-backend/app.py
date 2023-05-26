from flask import Flask, request, render_template
from keras.models import load_model
from PIL import Image
import numpy as np
import cv2
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
model = load_model("wasteClassification.h5")

@app.route('/')
def index():
    return "Deep Waste Classifcation"

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        print("I am working on predict")
        file = request.files['image']
        img = Image.open(file)
        img = np.array(img) 
        img = cv2.resize(img, (224, 224))
        img = np.reshape(img, [-1, 224, 224, 3])
        preds = np.argmax(model.predict(img))

        if preds == 1:
            result = "Recyclable"
        elif preds == 0:
            result = "Organic"
        return result

if __name__ == '__main__':
    app.run(host ="0.0.0.0", debug=True)
