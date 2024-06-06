
import { Carousel } from 'react-bootstrap';
import PatientNavBar from "../PatientNavBar/PatientNavBar";
import Image1 from './images/JadeSo.jpg'
import Image2 from './images/nymphia-wind.jpg'
import Image3 from './images/anetra.jpg'
import './HomePagePatient.css'
function HomePagePatient

 () {
//   const navigate = useNavigate();

//   const onButtonContainerClick = (() => {
//     navigate("/medapp/signup");
//   });

//   const onButtonContainer1Click = (() => {
//     navigate("/medapp/login");
//   });

  return (
    <>
            <PatientNavBar/>

            <div className='hp-container'>
            <Carousel data-bs-theme="dark" className='hp-carouselsize'>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={Image1}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h5 style={{color: 'white'}}>Miss Jade So - DRPH - Season 2</h5>
                  <p style={{color: 'white'}}>You Better Work. Hun.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={Image2}
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h5 style={{color: 'white'}}>Nymphia Wind</h5>
                  <p style={{color: 'white'}}>I love Bananas!.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={Image3}
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h5 >Third slide label</h5>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                  </p>
              </Carousel.Caption>
             </Carousel.Item>
            </Carousel>
           
            </div>
            


    
    </>
  );
};

export default HomePagePatient

;
