import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    if (selectedSymptoms.length === 0) {
      setErrorMessage('Please select at least one symptom.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

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
        setErrorMessage('No results found for the selected symptoms. Add more.');
        setResults([]);
      } else {
        setErrorMessage('');
        setResults(data);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error connecting to backend.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSymptoms = symptomsList.filter(symptom =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-zinc-800 via-neutral-800 to-stone-800 overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-64 h-64 bg-gradient-to-r from-zinc-500/30 to-neutral-500/30 rounded-full animate-float blur-3xl top-10 left-10"></div>
        <div className="absolute w-96 h-96 bg-gradient-to-r from-neutral-500/30 to-stone-500/30 rounded-full animate-float-slow blur-3xl bottom-20 right-20"></div>
        <div className="absolute w-48 h-48 bg-gradient-to-r from-stone-500/30 to-zinc-500/30 rounded-full animate-float-fast blur-2xl top-1/3 left-1/4"></div>
      </div>
      <Header />
      <main className="flex-grow p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto bg-zinc-900/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-neutral-700/50"
        >
          <h1 className="text-5xl font-extrabold text-center text-neutral-100 mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-stone-400">
            Disease Detector
          </h1>
          
          {/* Search Input */}
          <motion.div
            className="mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="text"
              placeholder="Search symptoms..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-4 rounded-lg bg-neutral-800/80 text-neutral-100 placeholder-neutral-400 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all duration-300"
            />
            <AnimatePresence>
              {searchTerm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 max-h-48 overflow-y-auto bg-neutral-800/90 rounded-lg border border-neutral-600"
                >
                  {filteredSymptoms.map((symptom, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => addSymptom(symptom)}
                      className="cursor-pointer p-3 hover:bg-gradient-to-r hover:from-neutral-700 hover:to-stone-700 text-neutral-100 rounded-lg transition-colors duration-200"
                    >
                      {symptom}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Selected Symptoms */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-neutral-100 mb-3">Selected Symptoms</h2>
            <div className="flex flex-wrap gap-3">
              <AnimatePresence>
                {selectedSymptoms.map((symptom, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-r from-stone-700 to-neutral-700 text-neutral-100 px-4 py-2 rounded-full flex items-center gap-2 shadow-md hover:bg-gradient-to-r hover:from-stone-600 hover:to-neutral-600 transition-all duration-200"
                  >
                    {symptom}
                    <button
                      onClick={() => removeSymptom(symptom)}
                      className="text-sm font-bold hover:text-stone-400 transition-colors duration-200"
                    >
                      ×
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Predict Button */}
          <motion.button
            onClick={handleSubmit}
            disabled={isLoading}
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(168, 162, 158, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-stone-600 to-neutral-600 text-neutral-100 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Predicting...' : 'Predict Disease'}
          </motion.button>

          {/* Spinner */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-6"
            >
              <div className="w-10 h-10 border-4 border-stone-400 border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-center text-red-400 font-medium"
            >
              {errorMessage}
            </motion.p>
          )}

          {/* Results */}
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <h2 className="text-3xl font-bold text-neutral-100 mb-6">Possible Diseases</h2>
              <AnimatePresence>
                {results.map((r, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="bg-neutral-800/90 border-l-4 border-stone-400 p-6 rounded-lg mb-4 shadow-lg hover:bg-gradient-to-r hover:from-neutral-700/90 hover:to-stone-700/90 transition-all duration-300"
                  >
                    <h3 className="text-2xl font-semibold text-stone-300">{r.disease}</h3>
                    <p className="text-sm text-neutral-400 italic mb-3">Probability: {r.probability}</p>
                    <p className="text-neutral-200 mb-4">{r.description}</p>
                    <ul className="list-disc list-inside text-neutral-300 text-sm">
                      {(r.precautions || [])
                        .filter(p => typeof p === 'string' && p.trim() !== '')
                        .map((p, i) => (
                          <li key={i} className="mb-2">{p}</li>
                        ))}
                    </ul>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default App;