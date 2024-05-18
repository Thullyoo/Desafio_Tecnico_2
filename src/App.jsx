import { useEffect, useRef, useState } from 'react';
import './App.css'

function App() {
  const arrayImagens = [
    {
      url: "https://cdn.pixabay.com/photo/2022/11/17/08/47/brown-bear-7597616_1280.jpg",
      alt: "Urso predador",
      link: "https://pixabay.com/pt/photos/urso-pardo-urso-predador-ca%C3%A7ador-7597616/"
    },
    {
      url: "https://cdn.pixabay.com/photo/2023/04/28/05/43/polar-bear-7955893_1280.jpg",
      alt: "Urso polar",
      link: "https://pixabay.com/pt/photos/urso-polar-urso-rocha-esperar-7955893/"
    },
    {
      url: "https://cdn.pixabay.com/photo/2022/11/14/13/39/brown-bear-7591629_1280.jpg",
      alt: "Urso pardo",
      link: "https://pixabay.com/pt/photos/urso-pardo-urso-predador-ca%C3%A7ador-7591629/"
    },
    {
      url: "https://cdn.pixabay.com/photo/2023/05/16/09/17/andean-bear-7997056_1280.jpg",
      alt: "Urso andino",
      link: "https://pixabay.com/pt/photos/urso-andino-urso-de-%C3%B3culos-animal-7997056/"
    }
  ];

  const [indexAtual, setIndexAtual] = useState(0);
  const intervalRef = useRef(null);


  //Passando para proximo slide
  const handleProximoSlide = () => {
    setIndexAtual((index) => {
      const newIndex = index === arrayImagens.length - 1 ? 0 : index + 1;
      resetInterval();
      return newIndex;
    });
    
  };

  //Passando para slide antigo
  const handleAntigoSlide = () => {
    setIndexAtual((index) => {
      const newIndex = index === 0 ? arrayImagens.length - 1 : index - 1;
      resetInterval();
      return newIndex;
    });
  };

  //Passando slide pela bolinha de navegação
  const handleBolaClique = (index) =>{
    setIndexAtual(index)
    resetInterval()
  }
  
  //Passada de slide automatica
  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setIndexAtual((index) => (index === arrayImagens.length - 1 ? 0 : index + 1));
      }, 5000);
    };

    startInterval();

    return () => clearInterval(intervalRef.current);
  }, [arrayImagens.length]);

  //Reset da passada de slide automatica
  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndexAtual((index) => (index === arrayImagens.length - 1 ? 0 : index + 1));
    }, 5000);
  };

  return (
    <>
      <div className='slider_container'>
        <button className='antigoSlide' onClick={handleAntigoSlide}> {"<"} </button>
        {arrayImagens.length > 0 && (
          arrayImagens.map((element, index) => (
            <div 
              key={index} 
              className={`conteudo_slide ${index === indexAtual ? 'active' : 'block'}`}>
              <a 
              href={element.link} target='_blank'>
                <img 
                className='img_slide' 
                src={element.url} 
                alt={element.alt} 
                />
              </a>
            </div>
          ))
        )}
        <button className='proximoSlide' onClick={handleProximoSlide}>{">"}</button>
        <div className='navegacao_manual'>
          {arrayImagens.map((_, i) => (
            <span 
            key={i} 
            className={`navegacao_bolinha ${i === indexAtual ? 'check' : ''}`} 
            onClick={() => handleBolaClique(i)}>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
