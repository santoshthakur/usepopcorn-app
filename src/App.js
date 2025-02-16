import { useEffect, useState } from "react";
import StartRating from "./StartRating";

const tempMovieData=[
  {
    imDbId:"tt3645",
    title:"The Shawshank Redemption",
    year:"1994",
    poster:'https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_QL75_UX140_CR0,1,140,207_.jpg'
  },
  {
    imDbId:"tt3646",
    title:"The Lord of the Rings: The Fellowship of the Ring",
    year:"2001",
    poster:'https://m.media-amazon.com/images/M/MV5BNzIxMDQ2YTctNDY4MC00ZTRhLTk4ODQtMTVlOWY4NTdiYmMwXkEyXkFqcGc@._V1_QL75_UX140_CR0,0,140,207_.jpg'
  },
  {
    imDbId:"tt3647",
    title:"The Godfather",
    year:"1972",
    poster:'https://m.media-amazon.com/images/M/MV5BYTJkNGQyZDgtZDQ0NC00MDM0LWEzZWQtYzUzZDEwMDljZWNjXkEyXkFqcGc@._V1_QL75_UY207_CR3,0,140,207_.jpg'
  },

];
const tempWatchedData=[
  {
   imDbId:"tt3645",
    title:"The Shawshank Redemption",
    year:"1994",
    poster:'https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_QL75_UX140_CR0,1,140,207_.jpg',
    runTime:148,
    imDbRating:8.9,
    userRating:10,
  },
  {
    imDbId:"tt3646",
    title:"The Lord of the Rings: The Fellowship of the Ring",
    year:"2001",
    poster:'https://m.media-amazon.com/images/M/MV5BNzIxMDQ2YTctNDY4MC00ZTRhLTk4ODQtMTVlOWY4NTdiYmMwXkEyXkFqcGc@._V1_QL75_UX140_CR0,0,140,207_.jpg',
     runTime:148,
     imDbRating:9.0,
     userRating:8,
   },
   {
    imDbId:"tt3647",
    title:"The Godfather",
    year:"1972",
    poster:'https://m.media-amazon.com/images/M/MV5BYTJkNGQyZDgtZDQ0NC00MDM0LWEzZWQtYzUzZDEwMDljZWNjXkEyXkFqcGc@._V1_QL75_UY207_CR3,0,140,207_.jpg',
     runTime:148,
     imDbRating:9.2,
     userRating:8,
   }
];
const average= (arr)=>
arr.reduce((acc,cur,i,arr)=> acc + cur /arr.length, 0);
const KEY= '381dc6a8';

function App() {
  const [query, setQuery] = useState('interception');
  const [movies, setMovies]=useState([]);
  const [watched, setWatched]= useState([]);
  const [isLoading, setIsLoading]= useState(false);
  const [error, setError]= useState("")
  const [selectId, setSelectId]= useState(null)
  // useEffect(()=>{
  //   console.log('After initial render')
  // },[])
  // useEffect(()=>{
  //   console.log('After every re-render')
  // })
  // console.log("During render")

  // useEffect(()=>{
  //   fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=dil`)
  //   .then(res=>res.json())
  //   .then((data)=> {
  //     setMovies(data.Search)
  //     console.log(data)
  //   }
  // )
    
  // },[])
function handleSelectMovie(id){
  setSelectId((selectId)=>(id=== selectId)? 'null': id)
}
function handleCloseMovie(){
  setSelectId(null)
}
  useEffect(
    function (){
      async function fetchMovies (){
      try{
          setIsLoading(true);
          setError("")
          const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
          if(!res.ok){
            throw new Error ("Something went wrong with fetching")
          }
         const data= await res.json()
         if(data.Response === 'False') {
          throw new Error("Moving not fond")
         }
         console.log(data)
         setMovies(data.Search)
         console.log(data)
        } catch(err){
          console.log(err)
          setError(err.message)
        } finally{
          setIsLoading(false);

        }
        
      }
      if(query.length < 3){
        setMovies([]);
        setError('');
        return
      }
      fetchMovies();
    },[query])

  return (
    <div className="p-4 flex flex-col w-full">
    <Navbar>
      <Search query={query} setQuery={setQuery} />
      <NumResults movies={movies}/>
    </Navbar>
    <Main>
    <Box>
      {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
      {isLoading && <Loader />}
      {!isLoading && !error && <MovieList movies={movies} onSelectMovie= {handleSelectMovie} />}
      {error && <ErrorMessage message={error} />}
    </Box>
    <Box>
      {
        selectId ? 
        (
        <MovieDetails selectId={selectId} onCloseMovie={handleCloseMovie} />
        ) 
      :
       (
       <>
       <WatchedSummary watched={watched} />
       <WatchedList watched={watched} />
        </>
       )
      }
        
    </Box>
    {/* <WatchedBox /> */}
    </Main>
    </div>
  );
}
function Loader(){
  return (
    
<div className="text-center p-4" role="status">
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>

  )
}


function ErrorMessage({message}){
  return(
    <p className="error text-red-500 text-center p-4">
      {message}
    </p>
  )
}

function MovieDetails({selectId, onCloseMovie}){
  const [movie, setMovie]= useState({});
  const {
    Title: title,
    Year: year,
    Poster:poster,
    Runtime: runtime,
    imdbRating,
    Plot:plot,
    Released:released,
    Actors:actors,
    Director:director,
  }= movie;
  // console.log("====",movie)
  useEffect(function(){
      async function getMovieDetails(){        
        const res= await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectId}`);
        const data= await res.json();
        setMovie(data)
        console.log("Detail ======", data)
      }
      getMovieDetails()
  }, [selectId])
return(
  <div className="detail">
     <header className="flex relative bg-red-900">
     <button className="border p-2 rounded-md d-block mb-6 absolute top-0 bg-black" onClick={onCloseMovie}>Back</button>
      <div className="mr-3">
      <img src={poster} alt={`Poster of ${title}`} />
      </div>
      <div className="mt-4 grow">
          <h2>{title}</h2>
          <p className="text-sm text-gray-300 mb-2">
            {released} &bull; {runtime}
          </p>
          <p className="text-sm text-gray-300 mb-2">
            {imdbRating} IMDb rating
          </p>
      </div>
    </header>
    <section className="p-6 mx-auto">
      <div className="text-center p-4 flex bg-gray-900 justify-center">
        <StartRating maxRating={10} size={20} />
      </div>
      <p className="text-sm text-gray-300 mb-2 mt-4">
       <em>{plot}</em> 
      </p>
      <p className="text-sm text-gray-300 mb-2">
        Starring: {actors}
      </p>
      <p className="text-sm text-gray-300 mb-2">
        Director by: {director}
      </p>
    </section>
  <div>
   
  {selectId}

  </div>

   
  </div>
)
}

function Navbar({children}){
  return(
    <nav className="nav-bar min-h-16 bg-purple-700  text-white  rounded-md px-4 flex justify-between items-center">
        <Logo/>
        {children}
        
    </nav>
  )
}
function Logo(){
  return  <div className="logo">
  {/* <span role="img"></span> */}
  <h1>Logo</h1>
</div>
}
function NumResults({movies}){
  return <p>
  Found <strong>{movies.length}</strong> result
</p>
}
function Search({query, setQuery}){
  
  return(
    <input className="border-0 p-2 rounded-md bg-purple-200 min-w-80" value={query} onChange={(e)=> setQuery(e.target.value)} placeholder="Search Movie" />

  )
}
function Main({children}){
  return(
    <main className="main grow px-6 flex gap-6 pt-4">
    {children}
        
    </main>
  )
}

function Box({children}){
  const [open, setIsOpen]=useState(true)
  return(
    <div className="box w-6/12 rounded-lg p-2 text-white relative">    
      <div className="flex justify-end">
      <button onClick={()=>{setIsOpen((open) => !open)}} className="shadow-sm  w-6 h-6 p-0 bg-black rounded-full text-white border-0 leading-none absolute top-3 right-3">
        {open ? '- ':'+'}
      </button>
      </div>
      { open && (
        children
      )}
    </div>
  )
}

function MovieList({movies, onSelectMovie}){
  return(
    <ul className="movie-list list-none">
      {
        movies.map((movie)=><Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />)
      }         
    </ul>
  )
}
function Movie({movie, onSelectMovie}){
  return(
    <li className="border-b border-b-black px-4 py-2 cursor-pointer" onClick={()=> onSelectMovie(movie.imdbID)}>
    <div className="flex items-center">
      <div className="w-[60px] h-[80px] mr-3">
        <img src={movie.Poster} alt="" className="w-[60px] h-[80px] object-cover
" />
      </div>
      <div>
      <h2 className="text-lg mb-2">{movie.Title}</h2>
      <div className="flex">
        <p>
          <span className="mr-3 w-6 h-6 rounded-full bg-purple-900 inline-block text-center">I</span>
          <span>{movie.Year}</span>
        </p>
      </div>
      </div>
      
    </div>
  </li>
  )
}

function WatchedSummary({watched}){
  const avgImbRating= average(watched.map((movie)=>movie.imDbRating));
  const avgUserRating= average(watched.map((movie)=>movie.userRating));
  const avgRunTime= average(watched.map((movie)=>movie.runTime));
  return(
    <div className="summary shadow-xl p-4">
      <h2 className="text-lg mb-2">Movie you watched</h2>
      <div className="flex watch-icons justify-between">
        <p>
        <span className="mr-3 w-6 h-6 rounded-full bg-purple-900 inline-block text-center">I</span>
          <span>{watched.length}</span>
        </p>
        <p>
        <span className="mr-3 w-6 h-6 rounded-full bg-purple-900 inline-block text-center">I</span>
          <span>{avgImbRating}</span>
        </p>
        <p>
        <span className="mr-3 w-6 h-6 rounded-full bg-purple-900 inline-block text-center">I</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
        <span className="mr-3 w-6 h-6 rounded-full bg-purple-900 inline-block text-center">I</span>
          <span>{avgRunTime}</span>
        </p>
      </div>
    </div>
  )
}
function WatchedList({watched}){
  return(
    <ul>
      {watched.map((movie)=>(
        <WatchedMovies movie={movie} key={movie.imDbId}   />
      ))}
      
    </ul>
  )
}
function WatchedMovies({movie}){
  return(
    <li className="border-b border-b-black px-4 py-2">
          <div className="flex items-center w-full">
            <div className="w-[60px] h-[80px] mr-3">
              <img src="https://placehold.co/60x80" alt="" />
            </div>
            <div className="grow">
            <h2 className="mb-2 text-sm">{movie.Title}</h2>
            <div className="flex watch-icons justify-between">
              <p>
                <span>%</span>
                <span>{movie.imDbRating}</span>
              </p>
              <p>
                <span>%</span>
                <span>{movie.userRating}</span>
              </p>
              <p>
                <span>%</span>
                <span>{movie.runTime}</span>
              </p>
            </div>
            </div>        
          </div>
        </li>
  )
}



export default App;

