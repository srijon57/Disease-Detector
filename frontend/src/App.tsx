import { useState } from 'react';
import axios from 'axios';
import Header from './header';
import Footer from './footer';
const symptomsList: string[] = [
  "Fungal infection", "discolored_patches",
  "Allergy", "itching", "skin_rash", "nodal_skin_eruptions", "dischromic_patches",
  "continuous_sneezing", "shivering", "chills", "watering_from_eyes",
  "stomach_pain", "acidity", "ulcers_on_tongue", "vomiting", "cough",
  "chest_pain", "yellowish_skin", "nausea", "loss_of_appetite",
  "abdominal_pain", "yellowing_of_eyes", "burning_micturition",
  "spotting_urination", "passage_of_gases", "internal_itching",
  "indigestion", "muscle_wasting", "patches_in_throat", "high_fever",
  "fatigue", "weight_loss", "restlessness", "lethargy",
  "blurred_and_distorted_vision", "obesity", "excessive_hunger",
  "increased_appetite", "polyuria", "sunken_eyes", "dehydration",
  "diarrhoea", "breathlessness", "mucoid_sputum", "headache",
  "dizziness", "loss_of_balance", "lack_of_concentration",
  "stiff_neck", "depression", "irritability", "visual_disturbances",
  "back_pain", "weakness_in_limbs", "neck_pain",
  "weakness_of_one_body_side", "altered_sensorium", "dark_urine",
  "sweating", "muscle_pain", "mild_fever", "swelled_lymph_nodes",
  "malaise", "red_spots_over_body", "joint_pain", "pain_behind_the_eyes",
  "constipation", "toxic_look_(typhos)", "belly_pain", "yellow_urine",
  "receiving_blood_transfusion", "receiving_unsterile_injections", "coma",
  "stomach_bleeding", "acute_liver_failure", "swelling_of_stomach",
  "distention_of_abdomen", "history_of_alcohol_consumption",
  "fluid_overload", "phlegm", "blood_in_sputum", "throat_irritation",
  "redness_of_eyes", "sinus_pressure", "runny_nose", "congestion",
  "loss_of_smell", "fast_heart_rate", "rusty_sputum",
  "pain_during_bowel_movements", "pain_in_anal_region", "bloody_stool",
  "irritation_in_anus", "cramps", "bruising", "swollen_legs",
  "swollen_blood_vessels", "prominent_veins_on_calf", "weight_gain",
  "cold_hands_and_feets", "mood_swings", "puffy_face_and_eyes",
  "enlarged_thyroid", "brittle_nails", "swollen_extremeties",
  "abnormal_menstruation", "muscle_weakness", "anxiety", "slurred_speech",
  "palpitations", "drying_and_tingling_lips", "knee_pain", "hip_joint_pain",
  "swelling_joints", "painful_walking", "movement_stiffness",
  "spinning_movements", "unsteadiness", "pus_filled_pimples", "blackheads",
  "scarring", "bladder_discomfort", "foul_smell_of_urine",
  "continuous_feel_of_urine", "skin_peeling", "silver_like_dusting",
  "small_dents_in_nails", "inflammatory_nails", "blister",
  "red_sore_around_nose", "yellow_crust_ooze"
];

interface DiseasePrediction {
  disease: string;
  probability: string;
  description: string;
  precautions: string[];
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<DiseasePrediction[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const addSymptom = (symptom: string) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
      setSearchTerm('');
    }
  };

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(item => item !== symptom));
  };

  const handleSubmit = async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/predict`, { symptoms: selectedSymptoms });
    let data = response.data;
    if (!Array.isArray(data)) {
      if (data && typeof data === 'object') {
        data = [data]; 
      } else {
        data = [];
      }
    }

    if (data.length === 0) {
      setErrorMessage('No results found for the selected symptom add more.');
      setResults([]);
    } else {
      setErrorMessage('');
      setResults(data);
    }
  } catch (error) {
    console.error(error);
    setErrorMessage("Error connecting to backend.");
    setResults([]);
  }
};

  const filteredSymptoms = symptomsList.filter(symptom =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-900 to-blue-900 text-gray-200">
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-300">Disease Detector</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search for symptoms..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
          {searchTerm && (
            <div className="mt-2 max-h-40 overflow-y-auto">
              {filteredSymptoms.map((symptom, index) => (
                <div
                  key={index}
                  onClick={() => addSymptom(symptom)}
                  className="cursor-pointer p-2 hover:bg-gray-600 rounded"
                >
                  {symptom}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2 text-blue-200">Selected Symptoms:</h2>
          <div className="flex flex-wrap gap-2">
            {selectedSymptoms.map((symptom, index) => (
              <div key={index} className="bg-blue-600 text-white px-3 py-1 rounded-md flex items-center">
                {symptom}
                <button onClick={() => removeSymptom(symptom)} className="ml-2">×</button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-md mt-4 hover:bg-blue-700 transition-colors shadow-md"
        >
          Predict Disease
        </button>

        {/* Error or No result message */}
        {errorMessage && (
          <p className="mt-6 text-center text-red-400">{errorMessage}</p>
        )}

        {/* Results rendering */}
        {results.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-200">Possible Diseases:</h2>
            {results.map((r, idx) => (
              <div key={idx} className="bg-gray-700 border-l-4 border-blue-500 p-4 rounded-md mb-3 shadow-sm">
                <h3 className="font-semibold text-xl text-blue-300">{r.disease}</h3>
                <p className="text-sm italic mb-2 text-blue-100">Probability: {r.probability}</p>
                <p className="text-sm mb-3 text-gray-300">{r.description}</p>
                <ul className="list-disc list-inside text-sm text-gray-400">
                  {(r.precautions || [])
                    .filter(p => typeof p === 'string' && p.trim() !== '')
                    .map((p, i) => (
                      <li key={i} className="mb-1">{p}</li>
                    ))
                  }
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    <Footer />
  </div>
  );
};

export default App;
