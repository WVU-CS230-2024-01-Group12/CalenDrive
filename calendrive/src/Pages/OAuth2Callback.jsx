import { useLocation, useNavigate } from 'react-router-dom';
import backend from '../Backend';

// Google redirects the user (along with their authorization code) to this page once they sign in
// We take that code, send it to our backend to use, and go back to the main page
function OAuth2Callback() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const params = new URLSearchParams(location.search);
    const authCode = params.get("code");
    
    if (authCode == null) {
        alert("Failed to get authorization code");
        return;
    }
    
    backend.OAuth2Callback(authCode).then(result => {
        const successResult = result.data.result;

        if (successResult !== "Success") {
            console.log(successResult);
            alert("Failed to login");
        }

        // Back to the main page
        navigate("/");
    });

    return (
        <div>

        </div>
    );
}

export default OAuth2Callback;