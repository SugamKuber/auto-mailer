const GoogleLoginButton = () => {
    const BACKEND_URL = "https://auto-mailer-server.up.railway.app";
    return (
        <a href={`${BACKEND_URL}/auth/google/login`}>
            <button>
                Connect Google
            </button>
        </a>
    );
};

export default GoogleLoginButton;
