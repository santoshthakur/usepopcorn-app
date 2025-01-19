import { useState } from "react";
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
function Search(){
  const [query, setQuery]=useState("");
  return(
    <input className="border-0 p-2 rounded-md bg-purple-500 min-w-80" value={query} onChange={(e)=> setQuery(e.target.value)} placeholder="Search Movie" />

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

function MovieList({movies}){
  return(
    <ul className="movie-list list-none">
      {
        movies.map((movie)=><Movie movie={movie} key={movie.imDbId} />)
      }         
    </ul>
  )
}
function Movie({movie}){
  return(
    <li className="border-b border-b-black px-4 py-2">
    <div className="flex items-center">
      <div className="w-[60px] h-[80px] mr-3">
        <img src="https://placehold.co/60x80" alt="" />
      </div>
      <div>
      <h2 className="text-lg mb-2">{movie.title}</h2>
      <div className="flex">
        <p>
          <span className="mr-3 w-6 h-6 rounded-full bg-purple-900 inline-block text-center">I</span>
          <span>{movie.year}</span>
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
            <h2 className="mb-2 text-sm">{movie.title}</h2>
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

function App() {
  const [movies, setMovies]=useState(tempMovieData);
  const [watched, setWatched]= useState(tempWatchedData);

  return (
    <div className="p-4 flex flex-col w-full">
    <Navbar>
      <Search />
      <NumResults movies={movies}/>
    </Navbar>
    <Main>
    <Box>
      <MovieList movies={movies} />
    </Box>
    <Box>
        <WatchedSummary watched={watched} />
        <WatchedList watched={watched} />
    </Box>
    {/* <WatchedBox /> */}
    </Main>
    </div>
  );
}
export default App;
