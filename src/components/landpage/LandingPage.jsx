import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage () {
  const navigate = useNavigate();

  const onButtonContainerClick = useCallback(() => {
    navigate("/medapp/signup");
  }, [navigate]);

  const onButtonContainer1Click = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className="landing-page">
      <div className="navbar-3">
        <div className="container">
          <div className="ddsgnr-library">
            <div className="ddsgnr-library1">
              <b className="medical-appointment">Medical Appointment</b>
            </div>
          </div>
          <div className="column">
            <div className="ddsgnr-library1">
              
                <button className="button1" onClick={onButtonContainerClick}>Sign Up</button>
            </div>
            <div className="ddsgnr-library1">
              
                <button className="button1" onClick={onButtonContainer1Click}>Log In</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <b className="h5-header-tag-sec-">Welcome</b>
            <b className="h1-headline-sec-">Online Appoinment</b>
            <div className="h4-sub-headline-sec-container">
              <p className="medical-functional-is">{`Medical Functional is most focused in helping you `}</p>
              <p className="medical-functional-is">
                discover your most beauiful smile
              </p>
            </div>
            <div className="cta">
              <div className="button-md-sec-">
                <button className="btn-text">Get Quote Now</button>
              </div>
              <div className="button-md-sec-1">
                <button className="btn-text2">Learn More</button>
              </div>
            </div>
          </div>
          <img className="col-md-6-icon" alt="" src="https://static.vecteezy.com/system/resources/previews/002/896/807/non_2x/female-doctor-using-her-digital-tablet-free-vector.jpg" />
        </div>
      </div>
      <div className="layout-1">
        <div className="container1">
          <div className="row1">
            <div className="main-content">
              <b className="h6-section-tag-sec-">Practice Advice</b>
              <b className="h2-section-title-3">Our Activity</b>
            </div>
          </div>
          <div className="row2">
            <div className="col-md-4">
              <div className="card">
                <img
                  className="icon-cool-icon-11"
                  alt=""
                  src="https://cdn-icons-png.flaticon.com/512/1834/1834954.png"
                />
                <b className="h5-header-tag-sec-">Emergency Case</b>
                <div className="fixed-width-fixed-height-sec-" />
                <div className="paragraph-feature-description-container">
                  <p className="medical-functional-is">{`For medical emergency `}</p>
                  <p className="medical-functional-is">{`please contact `}</p>
                  <p className="medical-functional-is">{`us immediately `}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <img
                  className="icon-cool-icon-11"
                  alt=""
                  src="https://previews.123rf.com/images/cosstudio/cosstudio1905/cosstudio190500681/123313780-healthcare-medical-emergency-call-vector-icon.jpg"
                />
                <b className="h5-header-tag-sec-">Health Queries</b>
                <div className="fixed-width-fixed-height-sec-" />
                <div className="paragraph-feature-description-container">
                  <p className="medical-functional-is">{`Any health-related `}</p>
                  <p className="medical-functional-is">{`queries or concerns `}</p>
                  <p className="medical-functional-is">{`should be addressed `}</p>
                </div>
              </div>
            </div>
            <div className="col-md-42">
              <div className="card">
                <img
                  className="icon-cool-icon-11"
                  alt=""
                  src="https://cdn-icons-png.flaticon.com/512/3845/3845373.png"
                />
                <b className="h5-header-tag-sec-">Painless procedures</b>
                <div className="fixed-width-fixed-height-sec-" />
                <div className="paragraph-feature-description-container">
                  <p className="medical-functional-is">{`Reduce patient `}</p>
                  <p className="medical-functional-is">{`discomfort using  `}</p>
                  <p className="medical-functional-is">{`innovative technologies `}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
