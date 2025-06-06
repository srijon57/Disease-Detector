from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

# Loading model and encoder
with open("model.pkl", "rb") as f:
    model, mlb = pickle.load(f)

# Loading disease descriptions
desc_df = pd.read_csv("symptom_Description.csv")
desc_map = dict(zip(desc_df["Disease"], desc_df["Description"]))

# Loading precautions
precaution_df = pd.read_csv("symptom_precaution.csv")
precaution_map = {
    row["Disease"]: [
        row["Precaution_1"],
        row["Precaution_2"],
        row["Precaution_3"],
        row["Precaution_4"]
    ]
    for _, row in precaution_df.iterrows()
}

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    symptoms = data.get("symptoms", [])
    symptoms = [s.lower().strip().replace(" ", "_") for s in symptoms]

    try:
        input_vector = mlb.transform([symptoms])
    except Exception as e:
        return jsonify({"error": "Invalid symptoms or transformation failed", "details": str(e)}), 400

    probs = model.predict_proba(input_vector)[0]
    top_indices = np.argsort(probs)[::-1][:5]
    top_diseases = model.classes_[top_indices]
    top_probs = probs[top_indices]

    result = []
    for disease, prob in zip(top_diseases, top_probs):
        if prob > 0:
            result.append({
                "disease": disease,
                "probability": f"{round(float(prob) * 100, 2)}%",
                "description": desc_map.get(disease, "No description available."),
                "precautions": precaution_map.get(disease, [])
            })

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
