import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './HomePage.css';

// Import local images
import image1 from '../../../assets/images/image1.png';
import image2 from '../../../assets/images/image2.png';
import image3 from '../../../assets/images/image3.png';
import image4 from '../../../assets/images/image4.png';
import image8 from '../../../assets/images/new4.jpg';
import image5 from '../../../assets/images/new3.jpg';
import image6 from '../../../assets/images/new2.jpg';
import image7 from '../../../assets/images/new1.jpg';
import doctor from '../../../assets/images/doctor.png'
import mainimg from '../../../assets/images/mainimg.png'
import ambulance from '../../../assets/images/ambulance.png'
import virus from '../../../assets/images/virus.png'
import doctor1 from '../../../assets/images/doctor1.png'
import doctor2 from '../../../assets/images/doctor2.png'
import checkup from '../../../assets/images/checkup.png'
import drugs from '../../../assets/images/drugs.png'

import c1 from '../../../assets/images/c1.jpg'
import c2 from '../../../assets/images/c2.jpg'
import star from '../../../assets/images/star.png'

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
             <p className="serviceName1">any time, any where</p>
        </div>
        <div className="serviceCard">
            <img src={image7} alt="booking appointments" className="serviceImage"/>
             <h2 className="serviceName">appointments</h2>
             <p className="serviceName1">confirmed appointment</p>
        </div>
        <div className="serviceCard">
            <img src={image8} alt="booking appointments" className="serviceImage"/>
             <h2 className="serviceName">best testing </h2>
             <p className="serviceName1">best testing machines</p>
        </div>
      </div>


      </div>



      <div className='mainmsg'>
        <div><p className='mainhead'>Meet our team</p></div>
        <div className='mainbox'>
          <div className='mainimg'>
          <img src={mainimg} alt="careConnect" className="mainimage"/>
          </div>
          <div className='maincon'>
            <h2 className='maintitle'>Meet the Experts<br></br> Who Care for You</h2>
            <p className='maindis'>Our dedicated team of skilled doctors is here to provide<br></br> you with the best care possible. From personalized consultations<br></br> to specialized treatments, our professionals are committed<br></br> to your well-being. Visit the 'Our Doctors' section to explore our team,<br></br> learn about their expertise, and easily book an appointment with<br></br> the doctor of your choice. Your journey to health and recovery starts here</p>
            <button className="mainbtn">
              Find Your Doctor
            </button>
          </div>
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



      <div className='success'>
        <div className='successtitle'>
          <h2 className='successmsg'>Success Story</h2>
        </div>
        <div className='successcon'>
          <div className='successcard'>
            <div className='head1'>
              <img src={c1} alt="careConnect" className="cimage"/>
                <div className='head2'>
                  <h3 className='cname'>Siriwardhana Gamage</h3>
                  <div className='starbox'>
                  <img src={star} alt="careConnect" className="star"/>
                  <img src={star} alt="careConnect" className="star"/>
                  <img src={star} alt="careConnect" className="star"/>
                  <img src={star} alt="careConnect" className="star"/>
                  <img src={star} alt="careConnect" className="star"/>
                  </div>
                </div>
            </div>

            <div className='successdis'>
              <p className='successtxt'> I had been suffering from chronic back pain for years, and it had taken a toll on every aspect of my life. Visiting care connect was the best decision I ever made. Dr. Emily and her team provided me with a clear diagnosis and a personalized treatment plan. After a minimally invasive procedure and dedicated physical therapy sessions, I am finally living pain-free. Thank you for giving me my life back!</p>
            </div>
          </div>

          <div className='successcard'>
            <div className='head1'>
              <img src={c2} alt="careConnect" className="cimage"/>
                <div className='head2'>
                  <h3 className='cname'>Yashodha Perera</h3>
                  <div className='starbox'>
                  <img src={star} alt="careConnect" className="star"/>
                  <img src={star} alt="careConnect" className="star"/>
                  <img src={star} alt="careConnect" className="star"/>
                  <img src={star} alt="careConnect" className="star"/>
                  <img src={star} alt="careConnect" className="star"/>
                  </div>
                </div>
            </div>

            <div className='successdis'>
              <p className='successtxt'> When I was diagnosed with heart disease, I was terrified. The team at [Hospital Name] not only treated my condition but also guided me on how to live a healthier life. The cardiac care unit was exceptional, and the staff treated me like family. Today, I feel stronger than ever and have even started cycling again. This hospital truly saved my life!</p>
            </div>
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


      <div className='map'>
        <h3 className='maptxt'>visit us</h3>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31681.388051252867!2d81.03841755091455!3d6.988833699936381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae462167fa6dad9%3A0x84d3d072c32aa246!2sBadulla!5e0!3m2!1sen!2slk!4v1734759041292!5m2!1sen!2slk" width="1000" height="300" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className='mapui'></iframe>
      </div>


      



    </div>
  );
};

export default HomePage;
