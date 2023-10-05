import { useDispatch, useSelector } from "react-redux";
import spotImg from "../assets/spotify.png"
import spotBtnImg from "../assets/spotifyBtn.png"
import "./LoginPage.css"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { setScreenWidth } from "../store.tsx";

function LoginPage() {



  const dispatch = useDispatch();

  const handleResize = () => {
    dispatch(setScreenWidth(window.innerWidth));
  };

  useEffect(() => {

    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  var stateKey : string;

  const screenWidth = useSelector((state: any) => state.screenWidth);


  function generateRandomString(length : number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }


const authLogin =()=>{

  var client_id = '79901f93a438459e8ba2d2512d7395b5';
var redirect_uri = 'http://localhost:5173/home';

var state : string = generateRandomString(16);

localStorage.setItem(stateKey , state);
var scope = 'user-read-private user-read-email';

var url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
url += '&state=' + encodeURIComponent(state);


   
   

   

return url;

}

  return (
    <>
    
    {screenWidth > 600 ? 
    <>
    <div className="spotLogin">
        <img className="loginImg" src={spotImg} alt="" />
    </div>

    <section className="sec-2-login d-flex justify-content-center align-items-center">
  <div className="login-ctr">
    <button onClick={authLogin} className="btn-login">
    <Link to={authLogin()}> Login</Link> 

    </button>
    <img src={spotBtnImg} className="btn-spot-img" />
    </div>
</section>
    </>
  :
  <>
  <div className="spotLogin">
        <img className="loginImg" src={spotImg} alt="" />
    </div>

    <section className="sec-2-login d-flex justify-content-center align-items-center">
  <div className="login-ctr d-flex justify-content-center align-items-center">
    <button onClick={authLogin} className="btn-login">
    <Link to={authLogin()}> Login</Link> 
    <img src={spotBtnImg} className="btn-spot-img" />

    </button>
    </div>
</section>
 
  </>

  }
    

    </>
  )
}

export default LoginPage


