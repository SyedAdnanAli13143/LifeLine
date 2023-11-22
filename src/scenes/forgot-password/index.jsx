import React from "react";
import { Link } from "react-router-dom";


const ForgotLogin = () => {
  return (
    <>
      {/* Section: Design Block */}
      <section className="text-center text-lg-start">
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n    .cascading-right {\n      margin-right: -50px;\n    }\n\n    @media (max-width: 991.98px) {\n      .cascading-right {\n        margin-right: 0;\n      }\n    }\n  ",
          }}
        />
        {/* Jumbotron */}
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
                  <h2 className="fw-bold mb-5">Forgot Password</h2>
                  <form>
                    {/* 2 column grid layout with text inputs for the first and last names */}
                    <div className="row">
                      
                    </div>
                    {/* Email input */}
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="AA_Email"
                        name="AA_Email"
                        className="form-control"
                        placeholder="Enter email to reset password"
                      />
                      <label
                        className="form-label"
                        htmlFor="form3Example3"
                      >
                        Email
                      </label>
                    </div>
                    
                    
                    {/* Submit button */}
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                    >
                      Send Verification Email
                    </button>
                    <br/><Link to='/login'>Sign in?</Link>
                    
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
        {/* Jumbotron */}
      </section>
      {/* Section: Design Block */}
    </>
  );
};

export default ForgotLogin;
