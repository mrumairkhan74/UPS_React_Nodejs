import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Submited = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('file', file); // Ensure studentId is added
    
            const res = await axios.post(`http://localhost:3000/assignment/submit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Successfully Submitted');
            setFile(null);
            navigate('/student/assignment');
        } catch {
            setError("Not Submitted Try Again Later");
            toast.error("Not Submitted.... Try Again Later!!!");
        }
    };
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600">
            <form
                className="w-full sm:w-[50%] rounded-md p-10 shadow-md shadow-purple-500/50 z-10"
                onSubmit={handleSubmit}
            >
                <h2 className="text-center text-white text-xl mb-4">Submit Your Assignment</h2>

                {error && (
                    <div className="text-red-500 text-center mb-4">{error}</div>
                )}

                <input 
                    type="file" 
                    onChange={(e) => setFile(e.target.files[0])} 
                    required 
                    placeholder='Upload File' 
                    className="w-full p-2 mb-4 rounded-md"
                />
                <button 
                    type='submit' 
                    className={`w-full p-2 rounded-md ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`} 
                    disabled={loading} 
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default Submited;
