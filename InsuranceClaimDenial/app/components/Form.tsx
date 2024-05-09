import { ChangeEvent, FormEvent, useState } from 'react';
import Data from './Data';

interface User {
    PatientName: string;
    MostImportantFeatures: string[];
}

const UploadForm = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showData, setShowData] = useState<boolean>(true);
    const [users,setUsers] = useState<User[]>([]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setSelectedFile(file);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                const response = await fetch('http://127.0.0.1:5000/claimDetection', {
                    method: 'POST',
                    body: formData,
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                const data = await response.json();
                console.log(data)
                let temp: User[] = [];
                for (let i = 0; i < data.most_important_features.length; i++) {
                    temp.push(data.most_important_features[i]); // Output: 1, 2, 3, 4, 5
                }
                setUsers(temp)
                setShowData(false)
            } catch (error) {
                console.error('Error:', error);
            }

            // Clear the selected file after handling
            setSelectedFile(null);
        }
    };

    return (
        <>
            {
                showData ? (
                    <>
                        <form className="flex flex-col gap-4 justify-center items-center h-screen" onSubmit={handleSubmit}>
                            <label htmlFor="csvFile" className="font-semibold">Upload CSV File:</label>
                            <input
                                type="file"
                                id="csvFile"
                                accept=".csv"
                                onChange={handleFileChange}
                                className=" z-50 ml-10 border-none rounded p-2 outline-none flex flex-row items-center justify-center"
                                style={{ display: 'none' }} // Hide the default file input
                            />
                            <label htmlFor="csvFile" style={{ backgroundColor: '#2F3C46' }} className=" text-white border-none rounded p-2 cursor-pointer outline-none flex items-center justify-center bg-gray-200 hover:bg-gray-300">
                                Choose File
                            </label>
                            <span id="fileLabel" className="ml-2"></span> {/* Placeholder for "No file chosen" text */}
                            <button
                                type="submit"
                                disabled={!selectedFile}
                                style={{ backgroundColor: '#2F3C46' }}
                                className={`z-50 rounded-lg w-52 font-poppins pt-1 pb-1 text-white shadow-md border-2 border-gray-400 ${!selectedFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Predict
                            </button>
                        </form>
                    </>
                ) : 
                <Data users={users}/>
                }
        </>
    );
};

export default UploadForm;
