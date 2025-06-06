import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.naive_bayes import MultinomialNB
import pickle

# Loading the training dataset
df = pd.read_csv("dataset.csv")  
df = df.dropna(how="all", axis=1)

# Combining the symptom columns into a list
symptom_cols = [col for col in df.columns if col.startswith("Symptom")]
df["Symptoms"] = df[symptom_cols].values.tolist()
df["Symptoms"] = df["Symptoms"].apply(lambda x: [str(i).strip().lower().replace(" ", "_") for i in x if str(i) != 'nan'])

# Encoding the symptoms
mlb = MultiLabelBinarizer()
X = mlb.fit_transform(df["Symptoms"])
y = df["Disease"]

# Training model yeaah
model = MultinomialNB()
model.fit(X, y)

# Save the model and symptom encoder
with open("model.pkl", "wb") as f:
    pickle.dump((model, mlb), f)

print("Model trained and saved successfully Boss.")
