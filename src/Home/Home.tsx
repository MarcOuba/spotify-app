import "./Home.css";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react"; 
import { useQuery } from "react-query";
import axios from "axios";
import StarRatings from "react-star-ratings"
import { useNavigate } from "react-router-dom";
import Loading from "../loading/loading";
import { setScreenWidth } from "../store.tsx";

function Home() {
  
const navigate=useNavigate();
  
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
   
   var accessToken =localStorage.getItem("token");

   if(!accessToken){
    navigate("/");
}


  const screenWidth = useSelector((state: any) => state.screenWidth);

  const searchRef = useRef<string>("");

  var mobile: boolean = screenWidth < 600;

  const { data, isLoading, isError, refetch } = useQuery(
    "searchArtists",
   async() => {
if(searchRef.current != ""){
    try {
        const response: any = await axios.get(
           `https://api.spotify.com/v1/search?q=${searchRef.current}&type=artist`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        return response.data.artists.items
        
        
      } catch (error: any) {
       if(error.response.data.error.message == "The access token expired"){
        navigate("/");
       }
        
      }
}
     
    },
    {
      enabled: false,
    }
  );

  const updateSearch = (e: any) => {
    searchRef.current = e.target.value; // Update the value using .current
    refetch();
  };

  const checkAlbums =(id : string) => {
navigate(`/albums/${id}`) 
    

  }
  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <TextField
          placeholder="Search for an artist..."
          variant="outlined"
          value={searchRef.current} // Get the value using .current
          onChange={(e) => updateSearch(e)}
          sx={{ width: mobile ? "250px" : "500px" }}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </div>

      <div className="mt-5 mb-5">
        {isLoading && <Loading />}
        {isError && <div>Error loading data.</div>}


        
          <div className="card-ctr d-flex justify-content-center align-items-center flex-wrap">
            {data?.map((artist: any) => (
              <div className="card" key={artist.id} onClick={() => checkAlbums(artist.id)}>
                <img src={artist?.images[0]?.url} />
                <h2>{artist.name}</h2>
                <h6>{artist.followers.total} Followers</h6>
                <div className="stars-ctr">
                <StarRatings
        rating={artist.popularity / 20}
        starDimension="30px"
        starSpacing="0px"
        starRatedColor="gold"
      />
</div>
              </div>
))}
          </div>
       
      </div>
    </>
  );
}

export default Home;
