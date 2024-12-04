const LoginPage = () => {
    const handleLogin = () => {
      // Generate a random string for code_verifier
      const generateCodeVerifier = () => {
        const array = new Uint32Array(28);
        window.crypto.getRandomValues(array);
        return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
      };
  
      // Generate the code challenge from the code verifier using SHA-256
      const generateCodeChallenge = async (codeVerifier) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
        return btoa(String.fromCharCode(...new Uint8Array(digest)))
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
      };
  
      const generateState = () => {
        return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
      };
  
      // Generate the code_verifier and code_challenge
      const codeVerifier = generateCodeVerifier();
      generateCodeChallenge(codeVerifier).then(codeChallenge => {
        const state = generateState();
  
        // Authorization URL with PKCE parameters
        const custosAuthUrl = 
        `https://api.playground.usecustos.org/api/v1/identity-management/authorize?response_type=code&client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${encodeURIComponent(import.meta.env.VITE_REDIRECT_URL)}&scope=openid+profile+email&state=${encodeURIComponent(state)}&code_challenge=${encodeURIComponent(codeChallenge)}&code_challenge_method=S256`;
  
        // Store the code_verifier in localStorage for later use during token exchange
        localStorage.setItem('pkce_code_verifier', codeVerifier);
        localStorage.setItem('state', state);
  
        // Redirect the user to Custos for authentication
        window.location.href = custosAuthUrl;
      });
    };
  
    return (
<div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
  <div className="text-center">
    <h1 className="text-5xl font-extrabold text-white mb-8 tracking-wide shadow-md">
      VIP Project
    </h1>
    <button
      onClick={handleLogin}
      className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg transform transition duration-300 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
    >
      Login with Custos
    </button>
    <p className="mt-4 text-white text-sm">
      Secure access with your Custos account
    </p>
  </div>
</div>


    );
  };
  
  export default LoginPage;