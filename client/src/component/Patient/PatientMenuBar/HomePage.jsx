import React, { useState, useEffect } from 'react';
import './HomePage.css';

// Import local images
import image1 from '../../../assets/images/image1.png';
import image2 from '../../../assets/images/image2.png';
import image3 from '../../../assets/images/image3.png';
import image4 from '../../../assets/images/image4.png';
import image5 from '../../../assets/images/new3.jpg';
import image6 from '../../../assets/images/new2.jpg';
import image7 from '../../../assets/images/new1.jpg';
import doctor from '../../../assets/images/doctor.png'
import ambulance from '../../../assets/images/ambulance.png'
import virus from '../../../assets/images/virus.png'
import doctor1 from '../../../assets/images/doctor1.png'
import doctor2 from '../../../assets/images/doctor2.png'
import checkup from '../../../assets/images/checkup.png'
import drugs from '../../../assets/images/drugs.png'

const images = [
  {
    url: image1,
    text: '',
  },
  {
    url: image2,
    text: '',
  },
  {
    url: image3,
    text: '',
  },
  {
    url: image4,
    text: '',
  },
];

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="home-page">
      <div className="slider-container">
        <div className="slider">
          <img src={images[currentIndex].url} alt="Health Slide" />
          <div className="overlay-text">
            <p>{images[currentIndex].text}</p>
          </div>
          <button className="prev-button" onClick={goToPrevious}>‹</button>
          <button className="next-button" onClick={goToNext}>›</button>
        </div>
      </div>

      
      <div className='fasili'>
        <div className='fasilicard'>
        <img src={doctor} alt="careConnect" className="fasiliImage"/>
        <h2 className="fasiliName">Qualified Doctors</h2>
        <p className="fasiliName1">Developing whole individuals is<br/> our goal. We have a flexible hight<br/> trust envirinment</p>
        </div>

        <div className='fasilicard'>
        <img src={ambulance} alt="careConnect" className="fasiliImage"/>
        <h2 className="fasiliName">Emergency Ambulnce</h2>
        <p className="fasiliName1">The ambulance feature is now<br/> available even to middle class<br/> people saving lives</p>
        </div>

        <div className='fasilicard'>
        <img src={virus} alt="careConnect" className="fasiliImage"/>
        <h2 className="fasiliName">Covid-19</h2>
        <p className="fasiliName1">With rising covid 19 case, it is<br/> hard to imagine a positive start to<br/> your date</p>
        </div>
      </div>


      <div className='about'>
        <div className='aboutText'>
          <p className='aboutTitle'>about us</p>
          <h2 className='aboutMain'>welcome to<br/>careConnect Hospital</h2>

          <p className='aboutDis'>
          CareConnect is a trusted online platform dedicated to<br/> simplifying healthcare access. We connect patients with top doctors<br/> through a convenient, user-friendly interface, allowing you to schedule<br/> appointments, receive medical guidance, and manage your healthcare<br/> needs with ease. At CareConnect, we are committed to making<br/> quality healthcare accessible to everyone, anytime, anywhere
          </p>
          <div className='aboutCat'>
            <div className='subCat'>
            <p className='aboutList'>15+ years of excellence</p>
            <p className='aboutList'>24/7 Hour Medical Service</p>
            </div>
            <div className='subCat'>
            <p className='aboutList'>A Multispeciality Hospital</p>
            <p className='aboutList'>A team of professionals</p>
            </div>
            
          </div>
          <h2 className='aboutbtn'>Go to appointment</h2>
        </div>
        <div className='aboutImg'>
        <img src={doctor1} alt="careConnect" className="aboutImage"/>
        </div>
      </div>

      <div className='number'>
        <div className='anum'>
          <h1 className='num'>35+</h1>
          <h1 className='numtext'>National awards</h1>
        </div>
        <div className='anum'>
          <h1 className='num'>10+</h1>
          <h1 className='numtext'>Expert Doctors</h1>
        </div>
        <div className='anum'>
          <h1 className='num'>5k+</h1>
          <h1 className='numtext'>Satisfied Patients</h1>
        </div>
        <div className='anum'>
          <h1 className='num'>2k+</h1>
          <h1 className='numtext'>Operations success</h1>
        </div>
      </div>


      <div className='ourservice'>
        <div className='ourtext'>
          <p className='aboutTitle'>our service</p>
          <h2 className='ourmain'>Find Out More About<br/>Our Service</h2>
        </div>
      <div className='service'>
        <div className="serviceCard">
            <img src={image5} alt="Find your doctor" className="serviceImage"/>
             <h2 className="serviceName">Find your Doctor</h2>
             <p className="serviceName1">connect within 60sec</p>
        </div>
        <div className="serviceCard">
            <img src={image6} alt="easy communication" className="serviceImage"/>
             <h2 className="serviceName">communication</h2>
             <p className="serviceName1">connect within 60sec</p>
        </div>
        <div className="serviceCard">
            <img src={image7} alt="booking appointments" className="serviceImage"/>
             <h2 className="serviceName">appointments</h2>
             <p className="serviceName1">confirmed appointment</p>
        </div>
        <div className="serviceCard">
            <img src={image7} alt="booking appointments" className="serviceImage"/>
             <h2 className="serviceName">appointments</h2>
             <p className="serviceName1">confirmed appointment</p>
        </div>
      </div>


      </div>


      <div className='vision'>
        <div className='visionhead'>
          <h1 className='visionhead1'>our vision</h1>
        </div>
        <div className='visiontitle'>
          <p className='visiontitle1'>"To revolutionize healthcare access by creating<br/> a seamless connection between patients and trusted<br/> medical professionals, ensuring quality care is just a click away<br/> for everyone."</p>
        </div>


      </div>


      <div className='ourservice'>
        <div className='ourtext'>
          <p className='aboutTitle'>our work process</p>
          <h2 className='ourmain'>Let's See How We Work</h2>
        </div>
      <div className='work'>
        <div className="workCard">
            <img src={doctor2} alt="Find your doctor" className="workImage"/>
             <h2 className="workName">Seeing Patients</h2>
             <p className="workName1">connect within 60sec</p>
        </div>
        <div className="workCard">
            <img src={checkup} alt="easy communication" className="workImage"/>
             <h2 className="workName">Making a Diagnosis</h2>
             <p className="workName1">connect within 60sec</p>
        </div>
        <div className="workCard">
            <img src={drugs} alt="booking appointments" className="workImage"/>
             <h2 className="workName">Developing treatments</h2>
             <p className="workName1">confirmed appointment</p>
        </div>
      </div>


      </div>



    </div>
  );
};

export default HomePage;
