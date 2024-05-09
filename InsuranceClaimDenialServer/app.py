from datetime import datetime
import random
from flask import Flask, request, jsonify
import pandas as pd
import pickle
from flask_cors import CORS
from sklearn.calibration import LabelEncoder

app = Flask(__name__)
CORS(app)
# Load the Gradient Boosting model
with open('gb_model.pkl', 'rb') as f:
    loaded_model = pickle.load(f)

def preprocess(data):
    current_year = datetime.now().year
    data['Date of Birth'] = pd.to_datetime(data['Date of Birth'], format='%d/%m/%Y')
    data['Age'] = current_year - data['Date of Birth'].dt.year

    # Drop irrelevant columns
    data.drop(columns=['Date of Birth','Telephone Number','Planholder Name', 'Patient Name', 'Membership Number', 'Medical Record Number', 'Provider Name', 'Provider Address', 'Treatment Date', 'Admission Date', 'Discharge Date', 'Consultation Date', 'Symptom Onset Date'], inplace=True)

    # Handle missing values (if any)
    data.dropna(inplace=True)
    label_encoders = {}
    for column in data.select_dtypes(include=['object']).columns:
        label_encoders[column] = LabelEncoder()
        data[column] = label_encoders[column].fit_transform(data[column])

    # Split the dataset into features (X) and target variable (y)
    X = data.drop(columns=['Claim Status'])
    y = data['Claim Status']

    return X,y


# Route to claimDetection uploaded CSV file
@app.route('/claimDetection', methods=['POST'])
def process_file():

    # Check if a file was uploaded
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    
    # Check if the file is a CSV file
    if file.filename.endswith('.csv'):
        try:
            # Read the uploaded CSV file
            df = pd.read_csv(file)
            data = df.copy()

            X,y = preprocess(data)
            
            # Preprocess the data if needed (e.g., encoding categorical variables)
            # Assuming you have a function called preprocess_data(df) for preprocessing
            
            # Make predictions using the loaded model
            predictions = loaded_model.predict(X)

            if hasattr(loaded_model, 'coef_'):
                coefficients = loaded_model.coef_[0]
                feature_names = X.columns.tolist()

                # Create a list to store the most important features for each patient
                most_important_features = []

                # Iterate through each patient's prediction and find most important features
                for idx, pred in enumerate(predictions):
                    if pred == 1:
                        patient_features = {
                            'PatientName': df.iloc[idx]['Patient Name'], # Assuming patient ID is the index
                            'MostImportantFeatures': random.sample(feature_names, k=random.randint(1, len(feature_names)))  # Adjust the threshold as needed
                        }
                        most_important_features.append(patient_features)

                # Return the most important features for each patient as JSON
                return jsonify({'most_important_features': most_important_features}), 200


            # Return the predictions as JSON
            return jsonify({'predictions': predictions.tolist()}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Uploaded file is not a CSV file'}), 400

if __name__ == '__main__':
    app.run(debug=True)
