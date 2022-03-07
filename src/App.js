// Button
import Slider from "react-slick";
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '@mui/material/Rating';
import { GoogleLogin } from 'react-google-login';
import PlayCircleOutlineTwoToneIcon from '@mui/icons-material/PlayCircleOutlineTwoTone';
import googlelogo from './googlelogo.svg'


// Dark Theme
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Tooltip} from '@mui/material';
import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

// Appbar
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// Route
import { Switch, Route, Link,Redirect,useHistory,useParams } from "react-router-dom";
import { useState,useEffect,useContext,createContext} from 'react';

// Validation
import {useFormik} from 'formik';
import * as yup from 'yup';


const URL="https://node-movies-list.herokuapp.com"
// const mock_URL="https://6166c50413aa1d00170a6723.mockapi.io"
// movies-movieslist


const context=createContext();
export default  function App() 
{
  
  let [newmovielist, setNewmovielist] = useState([]);
  let [deletedmovielist,setDeletedmovielist]=useState([{}]);

  let obj={newmovielist, setNewmovielist}


  let [mode,setMode]=useState('dark')
  let setTheme=()=>{return (mode==="light")?"dark":"light"}
  var light=<LightModeIcon className="themebutton"></LightModeIcon>
   var dark=<DarkModeIcon className="themebutton"></DarkModeIcon>
  
  let themebutton=()=>{ return (mode==="light")?dark:light}
  // Theme
  const theme = createTheme({
    palette: {mode:mode,},
  });
  // console.log(deletedmovielist);
  return (
    // <ThemeProvider theme={theme} style={{borderStyle:"none",Height:"100vh"}}>
      // <Paper elevation={0} >
                  <div className="Main"> 
                <div className="list">
                {/* <Box sx={{ flexGrow: 1 }}> */}
                {/* <AppBar position="static"> */}
                {/* <Toolbar variant="dense"> */}
                {/* <Typography variant="h6" color="inherit" component="div"> */}
                {/* <Button color="inherit"><Link className="link" to="/">Home</Link></Button> */}
                <Button color="inherit"><Link className="link" to="/">Home</Link></Button>
                <Button color="inherit"><Link className="link" to="/Add Movies">Add Movies</Link></Button>
                <Button color="inherit"><Link className="link" to="/watchlist">WatchList</Link></Button>
                <Button color="inherit"><Link className="link" to="/Auth">Login</Link></Button>

                <IconButton style={{marginLeft:"55rem"}}  onClick={()=>setMode(setTheme)}>{themebutton()}</IconButton>
                {/* </Typography>
                </Toolbar>
                </AppBar>
                </Box> */}
  </div>       
                 {/* <Card> */}
                 {/* <CardContent>  */}
                 <context.Provider  value={obj}>
                <Switch>

                <Route path="/Films"> <Redirect to="/Add Movies"/> </Route>                 {/* Redirecting*/}
                
                <Route exact path="/"> <Movieslist deletedmovielist={deletedmovielist} setDeletedmovielist={setDeletedmovielist}/></Route>     {/* OldMovielist */}
                
                <Route exact path="/Movies/Edit/:i"><EditMoviedata/></Route>   {/* Edit Movie*/}

                {/* <Route exact path="/Deleted Movies"><Deletedmovies  data={deletedmovielist} /></Route> */}

                <Route  path="/Movies/:i"><IndividualMoviedata /></Route>  {/* Individual Moviedata */}

                <Route path="/Add Movies"> <Movies/></Route>  {/*Adding New Movies*/}
                
                <Route exact path="/watchlist"><Search/></Route>

                <Route exact path='/Auth'><Auth/></Route>

                {/* <Route exact path="/login"><Login/></Route> */}
                
                <Route path="**"><Errorpage/></Route>
                
                </Switch>
                </context.Provider>
                {/* </CardContent>   */}
                {/* </Card> */}
   </div> 
  //  </Paper>
  //  </ThemeProvider>             
   )
         
}


function Auth()
{

  const heading=['login','signup'];
  const [value, setValue] = useState(0);
  const arr=heading[value]
  const handleChange = (event, newValue) => setValue(newValue);

    return <div className="auth-container">
      <div className="auth-heading">
    <Box sx={{ width: '100%' }}>
    <Tabs
      value={value}
      onChange={handleChange}
      // variant="scrollable"
      //  scrollButtons="auto"
      aria-label="secondary tabs example"
      TabScrollButtonProps={{style:{color:'rgba(38, 9, 94, 0.5)'}}}
      TabIndicatorProps={{
        style: { background: "rgba(243, 167, 18, 1)" }
      }}    
    >
        {heading.map((data,i)=>{
            return <Tab key={i} id='market-tab-heading' style={{color:(arr===data)?'black':'rgba(38, 9, 94, 0.5)'}}   value={i} label={data} />
        })}

    </Tabs>
  </Box>
  </div>

        {(arr==='signup')?<Signup/>:''}
        {(arr==='login')?<Login/>:''}


  </div>
}











function Signup()
{

  let validation =yup.object({
    // eslint-disable-next-line
    Email:yup.string().required('Required Field').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Must Be a Valid Email'),
    Password: yup.string().min(8, 'Minimum 8 Characters Required').required('Required Field')
  })


  const{handleChange,handleBlur,handleSubmit,errors,values,touched}=useFormik({
    initialValues:{Email:'',Password:''},
    validationSchema:validation,
    onSubmit:(userData)=>{console.log(userData);}
  })
  const GoogleSignUp=(userData)=>{
    // setLoading(true)
    // axios(
    //   {
    //     url:'http://localhost:5000/api/users/googlesignup',
    //     method:'POST',
    //     data:userData,
    //   }).then(response=>{setServerMessage({message:response.data.message,result:'success'});
      
    //   localStorage.setItem('login-info',JSON.stringify(response.data));setAuth(response.data)
    //    setShowToast(true);  setTimeout(() => {history.push('/dashboard')}, 3000); })

    //   .catch(error=>{setServerMessage({message:error.response.data.message,result:'error'});setShowToast(true);})
}

  const Id=process.env.REACT_APP_CLIENT_ID;
  console.log(Id)
  const handleSuccess=(response)=>GoogleSignUp(response);
  const handleFailure=(response)=>console.log(response);


    return <div className="signup">
          <form onSubmit={handleSubmit}>
          <div className="textfield-container">
          <TextField type='text' label='Email' fullWidth className="signup-textfield" variant='outlined'
          error={errors.Email && touched.Email} value={values.Email} onChange={handleChange} onBlur={handleBlur}
          helperText={errors.Email && touched.Email && errors.Email} name='Email' id='Email' />
          </div>
          <br/>

          <div className="textfield-container">
          <TextField type='text'  label='Password' fullWidth className="signup-textfield" variant='outlined'
          onChange={handleChange} onBlur={handleBlur} error={errors.Password && touched.Password} value={values.Password}
          helperText={errors.Password && touched.Password && errors.Password} name='Password' id='Password' />
          </div>
          <br/>

          <Button type='submit' variant='contained' fullWidth color='warning'>Get Started</Button>
          </form>

          <div className='breakline'>
              <div className='line'></div>
              <p >OR</p>
              <div className='line'></div>
            </div>
            <GoogleLogin
                          render={renderProps => (
                            <Button onClick={renderProps.onClick} fullWidth variant="primary" className='register-G'>
                              <img src={googlelogo} alt='logo'/>
                              Signup with Google</Button>
                          )}

                         clientId={Id}
                         buttonText="Sign In"
                         onSuccess={handleSuccess}
                         onFailure={handleFailure}
                         cookiePolicy={'single_host_origin'}
                        //  isSignedIn={true}
                        />

    </div>
}


function Login()
{

  let validation =yup.object({
    // eslint-disable-next-line
    Email:yup.string().required('Required Field').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Must Be a Valid Email'),
    Password: yup.string().min(8, 'Minimum 8 Characters Required').required('Required Field')
  })


  const{handleChange,handleBlur,handleSubmit,errors,values,touched}=useFormik({
    initialValues:{Email:'',Password:''},
    validationSchema:validation,
    onSubmit:(userData)=>{console.log(userData);}
  })

  const GoogleSignUp=(userData)=>{
    console.log(userData)
    // setLoading(true)
    // axios(
    //   {
    //     url:'http://localhost:5000/api/users/googlesignup',
    //     method:'POST',
    //     data:userData,
    //   }).then(response=>{setServerMessage({message:response.data.message,result:'success'});
      
    //   localStorage.setItem('login-info',JSON.stringify(response.data));setAuth(response.data)
    //    setShowToast(true);  setTimeout(() => {history.push('/dashboard')}, 3000); })

    //   .catch(error=>{setServerMessage({message:error.response.data.message,result:'error'});setShowToast(true);})
}


  const Id=process.env.REACT_APP_CLIENT_ID;
  const handleSuccess=(response)=>GoogleSignUp(response);
  const handleFailure=(response)=>console.log(response);

  return<div className="login">
  <form onSubmit={handleSubmit}>
  <div className="textfield-container">
  <TextField type='text' label='Email' fullWidth className="signup-textfield" variant='outlined'
  error={errors.Email && touched.Email} value={values.Email} onChange={handleChange} onBlur={handleBlur}
  helperText={errors.Email && touched.Email && errors.Email} name='Email' id='Email' />
  </div>
  <br/>

  <div className="textfield-container">
  <TextField type='text'  label='Password' fullWidth className="signup-textfield" variant='outlined'
  onChange={handleChange} onBlur={handleBlur} error={errors.Password && touched.Password} value={values.Password}
  helperText={errors.Password && touched.Password && errors.Password} name='Password' id='Password' />
  </div>
  <br/>

  <Button variant='contained' type='submit' fullWidth color='primary'>Log In</Button>
  </form>
  <div className='breakline'>
      <div className='line'></div>
      <p >OR</p>
      <div className='line'></div>
    </div>

    <GoogleLogin
                          render={renderProps => (
                            <Button onClick={renderProps.onClick}  fullWidth   color="primary" className='login-G'>
                              <img src={googlelogo} alt='logo'/>
                              Login In With Google</Button>
                          )}

                         clientId={Id}
                         buttonText="Sign In"
                         onSuccess={handleSuccess}
                         onFailure={handleFailure}
                         cookiePolicy={'single_host_origin'}
                        //  isSignedIn={true}
                        />

</div>
}














                                               
//  Adding Movies with validation                                                                                                                               
function Movies()
 {
  let history=useHistory();
   let Addmovie=(movies)=>{
    fetch(`${URL}/movies`,
    {method:"POST",
    body:JSON.stringify(movies),
    headers:{'Content-Type': 'application/json'} 
    }).then(()=>history.push("/"));
    }

  let validation =yup.object({
    name:yup.string().required('Required Field'),
    poster:yup.string().required('Required Field'),
    rating:yup.number().required('Required Field'),
    summary:yup.string().required('Required Field'),
    src:yup.string().required('Required Field')
  })


  const{handleChange,handleBlur,handleSubmit,errors,values,touched}=useFormik({
    initialValues:{name:"",poster:"",rating:"",summary:"",src:""},
    validationSchema:validation,
    onSubmit:(movies)=>{Addmovie(movies);console.log(movies);}
  })
       return (<div className="content">
         <p>Add Movie</p>
      <form className="field"  onSubmit={handleSubmit}>
        
        <div  className='add-text-field-container'>
      <TextField fullWidth type="text"
       value={values.name}
       id="name" name="name" placeholder="Movie Name"
       onInput={handleChange} onBlur={handleBlur} 
      error={errors.name && touched.name}
      helperText={errors.name && touched.name &&errors.name}
       label="Name"  variant="outlined" />
        </div>
      
    <div className='add-text-field-container'>
      <TextField fullWidth type="text"
       value={values.poster} id="poster" name="poster" placeholder="Movie Poster URL" 
       onInput={handleChange} onBlur={handleBlur}
       error={errors.poster && touched.poster}
       helperText={errors.poster && touched.poster&& errors.poster}
      label="Poster" variant="outlined" />
      </div>
      <div className='add-text-field-container'>
      <TextField fullWidth type="text"
      value={values.rating} id="rating" name="rating" placeholder="Movie Rating"
      onInput={handleChange} onBlur={handleBlur}
      error={errors.rating && touched.rating}
      helperText={errors.rating && touched.rating&& errors.rating}
      label="Rating"  variant="outlined" />
      </div>

      <div className='add-text-field-container'>
      <TextField fullWidth type="text" value={values.summary}
      id="summary" name="summary" placeholder="Movie Summary"
      onInput={handleChange} onBlur={handleBlur}  
      error={errors.summary && touched.summary}
      helperText={errors.summary && touched.summary&&errors.summary}
       label="Summary"  variant="outlined" />
      </div>

      <div className='add-text-field-container'>
      <TextField fullWidth type="text" value={values.src}
       id="src" name="src"placeholder="Movie Trailer src"
       onInput={handleChange} onBlur={handleBlur}
       error={errors.src && touched.src}
       helperText={errors.src && touched.src&&errors.src}
       label="Trailer"  variant="outlined" />
      </div>
      <br/>
      <Button variant="contained" type="submit" >Save</Button>
      </form>
  </div>
  );
}



function Movieslist({setDeletedmovielist,deletedmovielist})   /*Display Movielist,   Deleting Movies*/  
{

  // let [newmovielist, setNewmovielist] = useState([]);
  const {newmovielist, setNewmovielist}=useContext(context);
  let Displaymovies=()=>fetch(`${URL}/movies`).then((x)=>x.json()).then((data)=>setNewmovielist(data));
  useEffect(Displaymovies,[]);
  console.log(newmovielist);
  let history=useHistory();
   let deletemovie=((id)=>fetch(`${URL}/movies/${id}`,{method:"DELETE"})
   .then((x)=>x.json()).then((x)=>setDeletedmovielist([...deletedmovielist,x])).then(()=>Displaymovies()));

  
  return (
  
    <div className="movie-main">
    {newmovielist.map(({name,poster,rating,summary,_id},index)=> {return(<div key={index} className="movie-content">     
    <img src={poster} alt={name} title={name} />   
    
    <div className='overlay-container'>
    <IconButton onClick={()=>history.push("/Movies/"+ _id)}><PlayCircleOutlineTwoToneIcon className='play-button' color='primary'/></IconButton>
    </div>


    <div className="movie-details">        
    {/* <label>{name}</label>   */}
    {/* <p>Rating: {rating}</p> */}
    {/* <Moreinfo summary={summary} history={history} i={_id} data={newmovielist} 
    deletedmovie={
      <Tooltip title='Delete'>
    <IconButton onClick={()=>deletemovie(_id)}>
    <DeleteIcon color="error"></DeleteIcon></IconButton>
    </Tooltip>}
    editmovie= {
      <Tooltip title='Edit'>
    <IconButton onClick={()=>history.push("/Movies/Edit/"+_id)}> <EditIcon color="primary"></EditIcon> </IconButton></Tooltip>} /> */}
    
    </div>    
   </div>)})}
   </div>)
}








function Moreinfo({summary,i,history,data,editmovie,deletedmovie})  /*Movie Details*/ 
{
  
    

  let [description, setDescription] = useState("none");
  let contentvisibility = (() => { console.log("visibility"); return setDescription(() => (description === "block") ? "none" : "block"); });
  let visibility = { display: description };
  let [like, setLike] = useState(0);
  let [dislike, setDislike] = useState(0);
  return (
    <div>
        <Tooltip title='More Info'>
        <IconButton onClick={() => { return contentvisibility(); }}><InfoIcon color="secondary"/></IconButton>
        </Tooltip>
        <IconButton onClick={() => { console.log(i); return   history.push("/Movies/"+ i)}}>
        <InfoIcon color="primary"/></IconButton>  
        {/* <button onClick={() => { return setLike((like) => (like===0)?1:0); }}>Like{like}</button> */}
        {/* <button onClick={() => { return setDislike((dislike) => dislike + 1); }}>Disike{dislike}</button> */}
        {editmovie}{deletedmovie}
        <p className="summary" style={visibility} >Summary: {summary}</p> 
      </div>);
}


     
function IndividualMoviedata()  /*Trailer*/ 
{
  let [newmovielist, setNewmovielist] = useState({});
    let {i}=useParams();
  useEffect((()=>fetch(`${URL}/movies/${i}`).then((data)=>data.json()).then((x)=>setNewmovielist(x))),[i])
   let{name,summary,src,poster,rating} =newmovielist;

  const addtoWatchlist=()=>{
    axios(
      {
        url:'',
        method:'POST',
        data:{i},

      })
  }


  return (<div className="ind-movie-data">

              <Video src={src}/>
    <br/>
    <div className="movie-details">

    <div className="watchlist-btn-container">
    <p className='movie-heading'>{name}</p> 

    <Button  color='warning'  variant="outlined">Add to watchlist</Button>
    </div>

{/* startIcon={<SaveIcon />} */}
    <div className='more-info-container'>
    <img src={poster} alt='poster' title={name}/>

    <div className='more-info'>
    <p><label>Cast : </label>   Johny Depp,Vijay,Ajith,CristianBale</p>
    <p><label>Country : </label>  India</p>
    <p><label>Genre : </label>  Thriller</p>
    <p><label>Released : </label>  18.02.2022</p>
    
    <Rating name="half-rating-read" className='detail' defaultValue={5} precision={0.5} readOnly /><br/>
    
    <label>Summary</label>
    <p>{summary}</p> 
    </div>

    </div>
   
    
   
  
 </div>
  </div>)
}


function Video({src})
{
  return <div className='youtube-video'>
     <iframe width="1200" height="520" src={src} title="YouTube video player"
     frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
      picture-in-picture" allowFullScreen></iframe>
  </div>
}



function Search()
{
  const {newmovielist}=useContext(context);
  
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };
   return <div className='search-page' >
     <Slider {...settings}>
       {newmovielist.map(({poster,name,_id})=>{
         <div key ={_id} className="container">
           <img src="https://encoresky.com/blog/wp-content/uploads/2020/03/1561458_7f3b.jpg" alt='poster' title={name}/>
         </div>
       })}
     </Slider>


     <input type='text' placeholder='Search Movies' className='search-field'/>

      <div className='suggestion'>
            <ul>
                <li>Hello</li>
                <li>Hi</li>
                <li>How</li>
                <li>Hover</li>
            </ul>
      </div>


   </div>
}



















function EditMoviedata()
{
  let[newmovielist,setNewmovielist]=useState(null);
  let {i}=useParams();
  
  useEffect((()=> fetch(`${URL}/movies/${i}`)
  .then((data)=>data.json())
  .then((x)=>setNewmovielist(x))),[i]);
  console.log(newmovielist);
 return newmovielist===null?"...Loading": <Update newmovielist={newmovielist}/>

}

function Update({newmovielist})
{
  let history=useHistory();
  let{name,poster,rating,summary,src,_id}=newmovielist;

//   let validation=yup.object({
//     name:yup.string().required(),
//     poster:yup.string().required(),
//     rating:yup.number().required(),
//     summary:yup.string().required(),
//     url:yup.string().required(),
// })
  let validation=(values)=>{
    console.log("validate",values);
    
    let error={}
    console.log(error);
    if(values.name==="")
    {
      error.name="Field Should not be empty"
      console.log("error message",error);
    }
    if(values.poster==="")
    {
      error.poster="Field Should not be empty"
      console.log("error message",error);
    }
    if(values.rating==="")
    {
      error.rating="Field Should not be empty"
      console.log("error message",error);
    }
    if(values.summary==="")
    {
      error.summary="Field Should not be empty"
      console.log("error message",error);
    }
    if(values.src==="")
    {
      error.src="Field Should not be empty"
      console.log("error message",error);
    }

    return error;
    
  }

  let {handleChange,handleBlur,handleSubmit,values,touched,errors}=useFormik(
    {
      initialValues:{name:name,poster:poster,rating:rating,summary:summary,src:src},
      validate:validation,
      onSubmit:(movies)=>{updatemovie(movies);console.log("submit",movies);}
    }
  );
 
 let updatemovie=(movies)=>fetch(`${URL}/movies/${_id}`,
 {
   method:"PUT",
   body  : JSON.stringify(movies),
   headers:{'Content-Type':'application/json'} 
 }).then(()=>history.push("/"))
 
 
 // console.log(editingdata[i]=movies);
  console.log(name);
  // console.log("after",editingdata);

  return (<div className="content">
    <form className="field" onSubmit={handleSubmit}>
      
      <TextField fullWidth placeholder="Movie Name"        value={values.name}     onChange={handleChange} onBlur={handleBlur} error={errors.name && touched.name}       helperText={errors.name && touched.name && errors.name}          label="Name"     id="Name"    name="name"    variant="filled" />
      <TextField fullWidth placeholder="Movie Poster Url"  value={values.poster}   onChange={handleChange} onBlur={handleBlur} error={errors.poster && touched.poster}   helperText={errors.poster && touched.poster && errors.poster}    label="Poster"   id="Poster"  name="poster"  variant="filled" />
      <TextField fullWidth placeholder="Movie Rating"      value={values.rating}   onChange={handleChange} onBlur={handleBlur} error={errors.rating && touched.rating}   helperText={errors.rating && touched.rating && errors.rating}    label="Rating"   id="Rating"  name="rating"  variant="filled" />
      <TextField fullWidth placeholder="Movie Summary"     value={values.summary}  onChange={handleChange} onBlur={handleBlur} error={errors.summary && touched.summary} helperText={errors.summary && touched.summary && errors.summary} label="Summary"  id="Summary" name="summary" variant="filled" />
      <TextField fullWidth placeholder="Movie Trailer Url" value={values.src}      onChange={handleChange} onBlur={handleBlur} error={errors.src && touched.src}         helperText={errors.src && touched.src && errors.src }            label="Trailer"  id="src"     name="src"     variant="filled" />
      
      <Button type="submit" variant="contained" >Save</Button>
    </form>
   
  </div>
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

