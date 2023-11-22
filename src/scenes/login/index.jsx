import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [AA_UserName, setUsername] = useState("");
  const [AA_Password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    onLogin(AA_UserName, AA_Password, navigate);

    try {
      const response = await fetch('http://localhost:5206/api/Admin_Cr/ALog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          AaUserName: AA_UserName,
          AaPassword: AA_Password,
        }),
      });

      if (response.ok) {
        console.log('Login successful');


        // Redirect to the dashboard
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        // Handle login failure
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <>
      <section className="text-center text-lg-start">
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n    .cascading-right {\n      margin-right: -50px;\n    }\n\n    @media (max-width: 991.98px) {\n      .cascading-right {\n        margin-right: 0;\n      }\n    }\n  ",
          }}
        />
        <div className="container py-4">
          <div className="row g-0 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div
                className="card cascading-right"
                style={{
                  background: "hsla(0, 0%, 100%, 0.55)",
                  backdropFilter: "blur(30px)",
                }}
              >
                <div className="card-body p-5 shadow-5 text-center">
                  <h2 className="fw-bold mb-5">Sign in</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="AA_UserName"
                        name="AA_UserName"
                        className="form-control"
                        placeholder="Enter Username"
                        value={AA_UserName}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <label
                        className="form-label"
                        htmlFor="form3Example3"
                      >
                        User Name
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="AA_Password"
                        name="AA_Password"
                        className="form-control"
                        placeholder="Enter Password"
                        value={AA_Password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label
                        className="form-label"
                        htmlFor="form3Example4"
                      >
                        Password
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                    >
                      Sign in
                    </button>
                    <br />
                    <Link to="/forgot-password">Forgot your password?</Link>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0">
              <img
                src={`../../assets/user.png`}
                className="w-100 rounded-4 shadow-4"
                alt="LifeLine_Admin"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
