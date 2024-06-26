import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Check() {
    const BACKEND_URL = "https://auto-mailer-server.up.railway.app";

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [expiry, setExpired] = useState(false);
    const [email, setEmail] = useState('');
    const [check, setCheck] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const passer = urlParams.get('id');
                if (passer) {
                    setEmail(passer);
                } else {
                    throw new Error('Passer not found in URL');
                }
                const response = await axios.get(`${BACKEND_URL}/auth/check?email=${passer}`);
                console.log('Response:', response.data);
                setCheck(true)
                if (response.data === 'Valid') {
                    setSuccess(true);
                }
                else if (response.data === "Expired") {
                    setSuccess(false);
                    setExpired(true);
                }
                else {
                    setSuccess(false);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleInputChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/auth/check?email=${email}`);
            console.log('Response:', response.data);
            setCheck(true)
            if (response.data === 'Valid') {
                setSuccess(true);
            }
            else if (response.data === "Expired") {
                setSuccess(false);
                setExpired(true);
            }
            else {
                setSuccess(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                <p>Enter the email</p>
                <input type="email" value={email} onChange={handleInputChange} />
                <button onClick={handleSubmit}>Submit</button>
            </div>

            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : check && success ? (
                    <p>Your auto mailer is on</p>
                ) : check && !success ? (
                    <p>Your auto mailer is not working, try logging in again</p>
                ) :
                    <p> </p>
                }
            </div>
            <div>
                {expiry && <p>Session Expired, log in again</p>}
            </div>

        </>
    );
}
