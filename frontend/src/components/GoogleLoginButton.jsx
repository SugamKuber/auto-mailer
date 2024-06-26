const GoogleLoginButton = () => {
    const BACKEND_URL = "http://localhost:8080";
    return (
        <a href={`${BACKEND_URL}/auth/google/login`}>
            <button>
                Connect Google
            </button>
        </a>
    );
};

export default GoogleLoginButton;
