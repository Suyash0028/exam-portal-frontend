import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { getAllQuestions } from '../Utils/QuestionService';
import CustomSpinner from '../Components/Spinner';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Question {
  _id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  description: string;
}

declare global {
  interface Navigator {
    keyboard?: {
      lock: () => void;
      unlock: () => void;
    };
  }
}

export interface QuestionnaireRef {
  requestFullscreen: () => void;
  exitFullscreen: () => void;
}

const Questionnaire = forwardRef<QuestionnaireRef>(({},ref) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const history = useHistory();
  const containerRef = useRef<HTMLDivElement>(null);
  const location: any = useLocation();

  useImperativeHandle(ref, () => ({
    requestFullscreen: () => {
      if (containerRef.current) {
        const elem = containerRef.current as HTMLElement;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if ((elem as any).mozRequestFullScreen) {
          (elem as any).mozRequestFullScreen();
        } else if ((elem as any).webkitRequestFullscreen) {
          (elem as any).webkitRequestFullscreen();
        } else if ((elem as any).msRequestFullscreen) {
          (elem as any).msRequestFullscreen();
        }
      }
    },
    exitFullscreen: () => {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        }
      }
    }
  }));

  useEffect(() => {
    fetchQuestions();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e) {
        history.push('/user-dashboard');
        e.preventDefault();
        toast.error("Screenshots or copying the content is disabled on this page.", {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    window.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });

    window.addEventListener('copy', function (e) {
      e.preventDefault();
    });

    window.addEventListener('keydown', handleKeyDown);

    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const isScreenCaptured = devices.some(device => device.kind === 'videoinput' && device.label.includes('screen'));
        if (isScreenCaptured) {
          console.log('Screen capture is active.');
        } else {
          console.log('Screen capture is not active.');
        }
      })
      .catch(err => {
        console.error('Error enumerating devices:', err);
      });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [location.state, history]);

  const fetchQuestions = async () => {
    try {
      const response = await getAllQuestions();
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleOptionClick = (option: string) => {
    if (!isAnswered) {
      setSelectedOption(option);
      setIsAnswered(true);
      if (option === currentQuestion.correctAnswer) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  };

  const getOptionClass = (option: string) => {
    if (!isAnswered) return '';
    if (option === currentQuestion.correctAnswer) return 'bg-success text-white';
    if (option === selectedOption) return 'bg-danger text-white';
    return '';
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`You have completed the questionnaire! Your score is ${score}/${questions.length}`);
      localStorage.setItem('score', JSON.stringify(score));
      history.push('/user-dashboard');
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div className="d-flex justify-content-center">
      <CustomSpinner />
    </div>;
  }

  return (
    <>
      <div ref={containerRef} className="container mt-5" style={{ overflow: 'hidden' }}>
        <h2>{currentQuestionIndex + 1 + '. '}{currentQuestion.questionText}</h2>
        <div className="list-group">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              className={`list-group-item list-group-item-action ${getOptionClass(option)}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
        {isAnswered && (
          <div className="mt-3">
            <p>{currentQuestion.description}</p>
            <button className="btn btn-primary" onClick={handleNextQuestion}>
              Next Question
            </button>
          </div>
        )}
      </div>
    </>
  );
});

export default Questionnaire;
