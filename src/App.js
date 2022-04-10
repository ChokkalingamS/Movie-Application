// Button
import './App.css';
import Button from '@mui/material/Button';



import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';







// Route
import { Switch, Route, Link,Redirect,useHistory } from "react-router-dom";
import { useState,useEffect,createContext} from 'react';

// Validation
import { Auth, ForgotPassword, UpdatePassword } from "./Auth";
import { Movieslist, EditMoviedata, IndividualMoviedata, Movies, WatchList ,Trending,Upcoming} from "./Movies";


// export const URL="https://node-movies-list.herokuapp.com"
// export const user_URL="http://localhost:2000/user"
// export const movie_URL="http://localhost:2000/movie"

export const user_URL="https://movie--application.herokuapp.com/user"
export const movie_URL="https://movie--application.herokuapp.com/movie"





// const mock_URL="https://6166c50413aa1d00170a6723.mockapi.io"
// movies-movieslist


export const context=createContext();
export default  function App() 
{
  
  let [newmovielist, setNewmovielist] = useState([]);
  let [deletedmovielist,setDeletedmovielist]=useState([{}]);
  const [Email]=useState(localStorage.getItem('Email')||'');
  const [Token]=useState(localStorage.getItem('Token'||''));
  let history=useHistory();

  const [showData,setShowData]=useState(false);
  const [query,setQuery]=useState('');
  const [filteredResults,setFilteredResults]=useState('')

  let obj={newmovielist, setNewmovielist,Email,Token}

  const SearchMovie=(searchData)=>{

    setQuery(searchData)
    if(searchData!=="")
    {
      const filterData = newmovielist.filter(({ name }) => {
        return name.toLowerCase().includes(searchData.toLowerCase());
    });
    setFilteredResults(filterData)
        if(!filterData.length)
        {
          setFilteredResults('')
        }
        else
        {
          setShowData(true)
        }

    }

  }

  useEffect(()=>{
    if(query==='')
    {
      setShowData(false);
    }
  },[query])

  return (
                  <div className="Main"> 
                <div className="list">
                <Button color="inherit"><Link className="link" to="/">Home</Link></Button>
                <Button color="inherit"><Link className="link" to="/trending">Trending</Link></Button>
                <Button color="inherit"><Link className="link" to="/Upcoming">Upcoming</Link></Button>
                


                <input type='text' id='search-field'  onChange={(e) => { SearchMovie(e.target.value); }} placeholder='Search Movies...'/>
                {(showData)?<SearchData filteredResults={filteredResults} setFilteredResults={setFilteredResults} setShowData={setShowData}/>:''}
                {(Email || Token)?<div className='avatar-container'><AccountMenu/></div>:
                <div className='sigin-button'>
                <Button color="inherit" onClick={()=>history.push('/Auth')}>
                  <Link className="link" to="/Auth">Login</Link>
                </Button>
                </div>}

  </div>       
                 
                 <context.Provider  value={obj}>
                <Switch>

                <Route path="/Films"> <Redirect to="/Add Movies"/> </Route>                 {/* Redirecting*/}
                
                <Route exact path="/"> <Movieslist deletedmovielist={deletedmovielist} setDeletedmovielist={setDeletedmovielist}/></Route>     {/* OldMovielist */}
                
                <Route exact path="/Movies/Edit/:i"><EditMoviedata/></Route>   {/* Edit Movie*/}

                <Route exact path='/trending'><Trending /></Route>

                <Route exact path='/upcoming'><Upcoming /></Route>

                <Route  path="/Movies/:i"><IndividualMoviedata /></Route>  {/* Individual Moviedata */}

                <Route path="/Add Movies"> <Movies/></Route>  {/*Adding New Movies*/}
                
                <Route exact path="/watchlist"><WatchList/></Route>

                <Route exact path='/Auth'><Auth/></Route>
                
                <Route exact path='/forgotpassword'><ForgotPassword/></Route>
              
                <Route exact path='/updatepassword/:id'><UpdatePassword/></Route>
              
                <Route path="**"><Errorpage/></Route>
                
                </Switch>
                </context.Provider>
          
   </div>          
   )
         
}


function SearchData({filteredResults,setFilteredResults,setShowData})
{
  let history=useHistory();
  if(filteredResults.length>5)
  {
    let filterData=filteredResults.filter((a,i)=>i>4)
    setFilteredResults(filterData)
  }

    return <div className="filterData-container">
          {(filteredResults.length)?<div>

            {filteredResults.map(({name,poster,_id})=>{
              return (<div className='filter-results' key={_id} onClick={()=>{history.push(`/Movies/${_id}`);setShowData(false)}}>
                <img src={poster} alt='poster' title={name}/>
                <div className='filter-result-details'>
                  <p>{name}</p>
                  {/* <div className='filter-more-info'>
                  <span>214m</span>
                  <span>2014</span>
                  </div> */}
                </div>
              </div>)
            })}

          </div>:<div className="no-result" >Result Not Found</div>}
    </div>

}

function AccountMenu() 
{
  
  const user=localStorage.getItem('user');
  const Token=localStorage.getItem('token')
  const Email=localStorage.getItem('Email')
  
  let letter=Email.split('')

  const [anchorEl, setAnchorEl] =useState(null);
  let history=useHistory()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

        <Tooltip title="Account">
          <IconButton
            onClick={handleClick}size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{letter[0].toLocaleUpperCase()}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
    
        {(user==='admin' && Email && Token)?<MenuItem onClick={()=>history.push("/Add Movies")}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add Movies
        </MenuItem>:''}
        
        {(Email && Token)?<><MenuItem onClick={()=>history.push("/watchlist")}><ListItemIcon> <Settings fontSize="small" /></ListItemIcon>
          My Watchlist 
        </MenuItem>
        
        <MenuItem onClick={()=>{localStorage.clear();window.location.reload(false);}}> <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
          Logout
        </MenuItem></>:''}
      </Menu>
    </>
  );
}



// function Deletedmovies({data}) 
// {

// // let history=useHistory();
// if(data.length<2)
// {
//   return <p>No Movies</p>
// }
// else
// {
//   console.log(data);
//   return<div className="movie-main">  {data.filter((x,ind)=>0!==ind).map(({name,poster,rating,summary,id},index)=> {return( <Card  key={index}className="movie-content">
//         <img src={poster} alt={name} title={name} />   
//             <div className="movie-details">        
//             <p>Name: {name}</p>  
//              <p>Rating: {rating}</p>
//              <p>Summary: {summary}</p>
//              {console.log(index)}
//              </div>
//              </Card>
//              )})}</div>
// }


// }


function Errorpage() 
{
  return(<div className='error-page'>
    <img src="https://assets.materialup.com/uploads/c13818e8-9e42-4f4d-b657-38743a81b270/preview.gif" alt="404 NOT FOUND"/>
  </div>)
}

