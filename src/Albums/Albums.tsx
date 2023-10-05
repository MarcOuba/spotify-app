import "./Albums.css"
import {  useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Loading from "../loading/loading";
import { useEffect } from "react";

function Albums() {


    



    const {id}=useParams();
const navigate=useNavigate();
const accessToken = localStorage.getItem("token");

useEffect(() => {
    if(!accessToken){
      alert("You don`t have access to spotify. Try logging in again or check your account.")
      navigate("/");
  }


})

const { data : artist, isLoading :isLoadingArtist, isError:isErrorArtist } = useQuery(
  "searchArtists2",
 async() => {

  try {
      const response: any = await axios.get(
         `  https://api.spotify.com/v1/artists/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      return response.data
      
      
    } catch (error: any) {
     if(error.response.data.error.message == "The access token expired"){
      navigate("/");
     }
      
    }

   
  }
 
);






    const { data, isLoading, isError } = useQuery(
        "searchAlbums",
       async() => {
 
        try {
            const response: any = await axios.get(
               `https://api.spotify.com/v1/artists/${id}/albums`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
        
            return response.data.items
            
            
          } catch (error: any) {
           if(error.response.data.error.message == "The access token expired"){
            navigate("/");
           }
            
          }
    
         
        }
      );

  return (

  

    <>
      {isLoadingArtist && <Loading />}
        {isErrorArtist && <div> <h1>Error loading data.</h1></div>}

        <h1 style={{ paddingTop:"30px" , paddingLeft:"80px"}}>{artist?.name}</h1>
    <h3 style={{color:"grey" , paddingLeft:"80px"}}>Albums</h3>

<div className="mt-5 mb-5">
{isLoading && <Loading />}
        {isError && <div> <h1>Unknown.</h1></div>}

       
        
          <div className="card-ctr d-flex justify-content-center align-items-center flex-wrap">

         

            {data?.map((album: any) => (
              <div className="albums-card" key={album.id} >
                <img src={album?.images[0]?.url} />
                <h2>{album.name}</h2>
                <h6 className='header-first'>{album.artists.map((art : any , index : number) => album.artists.length==0 || album.artists.length-1 ==index ? art.name : art.name + " , ")} </h6>
               <h6 className='header-second'>{album.release_date}</h6>
               <h6 className='header-third'>{album.total_tracks} {album.total_tracks <=1 ? "track" : "tracks"} </h6>
               <button> <a className="d-block w-100 h-100" href={album.external_urls.spotify}>Preview on spotify</a> </button>
              </div>
))}
          </div>
       
      </div>
      </>
    
  )
}

export default Albums