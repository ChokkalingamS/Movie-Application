import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { forwardRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import PlayCircleOutlineTwoToneIcon from '@mui/icons-material/PlayCircleOutlineTwoTone';
import { Tooltip } from '@mui/material';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import {  useFormik } from 'formik';
import CircularProgress from '@mui/material/CircularProgress';
import * as yup from 'yup';
import { movie_URL, context } from "./App";

//  Adding Movies with validation                                                                                                                               
export function Movies() {
  let history = useHistory();


  const Addmovie = (movies) => {
    axios(
      {
        url: `${movie_URL}/addmovie`,
        method: 'POST',
        data: { data: movies },
      }).then(() => history.push("/"));
  };

  let validation = yup.object({
    name: yup.string().required('Required Field'),
    poster: yup.string().required('Required Field'),
    rating: yup.number().required('Required Field'),
    summary: yup.string().required('Required Field'),
    src: yup.string().required('Required Field')
  });


  const { handleChange, handleBlur, handleSubmit, errors, values, touched } = useFormik({
    initialValues: { name: "", poster: "", rating: "", summary: "", src: "" },
    validationSchema: validation,
    onSubmit: (movies) => { Addmovie(movies); console.log(movies); }
  });
  return (<div className="content">
    <p>Add Movie</p>
    <form className="field" onSubmit={handleSubmit}>

      <div className='add-text-field-container'>
        <TextField fullWidth type="text"
          value={values.name}
          id="name" name="name" placeholder="Movie Name"
          onInput={handleChange} onBlur={handleBlur}
          error={errors.name && touched.name}
          helperText={errors.name && touched.name && errors.name}
          label="Name" variant="outlined" />
      </div>

      <div className='add-text-field-container'>
        <TextField fullWidth type="text"
          value={values.poster} id="poster" name="poster" placeholder="Movie Poster URL"
          onInput={handleChange} onBlur={handleBlur}
          error={errors.poster && touched.poster}
          helperText={errors.poster && touched.poster && errors.poster}
          label="Poster" variant="outlined" />
      </div>
      <div className='add-text-field-container'>
        <TextField fullWidth type="text"
          value={values.rating} id="rating" name="rating" placeholder="Movie Rating"
          onInput={handleChange} onBlur={handleBlur}
          error={errors.rating && touched.rating}
          helperText={errors.rating && touched.rating && errors.rating}
          label="Rating" variant="outlined" />
      </div>

      <div className='add-text-field-container'>
        <TextField fullWidth type="text" value={values.summary}
          id="summary" name="summary" placeholder="Movie Summary"
          onInput={handleChange} onBlur={handleBlur}
          error={errors.summary && touched.summary}
          helperText={errors.summary && touched.summary && errors.summary}
          label="Summary" variant="outlined" />
      </div>

      <div className='add-text-field-container'>
        <TextField fullWidth type="text" value={values.src}
          id="src" name="src" placeholder="Movie Trailer src"
          onInput={handleChange} onBlur={handleBlur}
          error={errors.src && touched.src}
          helperText={errors.src && touched.src && errors.src}
          label="Trailer" variant="outlined" />
      </div>
      <br />
      <Button variant="contained" type="submit">Save</Button>
    </form>
  </div>
  );
}
export function Movieslist({ setDeletedmovielist, deletedmovielist }) {

  const { newmovielist, setNewmovielist } = useContext(context);
  let Displaymovies = () => {
    axios(
      {
        url: `${movie_URL}/getmovies`,
        method: 'GET'
      }).then(response => setNewmovielist(response.data)).catch();
  };
  useEffect(Displaymovies, [setNewmovielist]);

  let history = useHistory();
  // let deletemovie = ((id) => fetch(`${URL}/movies/${id}`, { method: "DELETE" })
  //   .then((x) => x.json()).then((x) => setDeletedmovielist([...deletedmovielist, x])).then(() => Displaymovies()));

  return (<div>
    {(newmovielist.length) ? <div className="movie-main">
      {newmovielist.map(({ name, poster, _id }, index) => {
        return (<div key={index} className="movie-content">
          <img src={poster} alt={name} title={name} />

          <div className='overlay-container'>
            <IconButton onClick={() => history.push("/Movies/" + _id)}><PlayCircleOutlineTwoToneIcon className='play-button' color='primary' /></IconButton>
          </div>

        </div>);
      })}
    </div> : ''}
  </div>);
}

export function Trending()
{
  let history=useHistory();
  const { newmovielist, setNewmovielist } = useContext(context);
  let Displaymovies = () => {
    axios(
      {
        url: `${movie_URL}/getmovies`,
        method: 'GET'
      }).then(response => setNewmovielist(response.data)).catch();
  };
  useEffect(Displaymovies, [setNewmovielist]);
  return (<div>
    {(newmovielist.length) ? <div className="movie-main">
      {newmovielist.filter(({type})=>type==="trending").map(({ name, poster, _id }, index) => {
        return (<div key={index} className="movie-content">
          <img src={poster} alt={name} title={name} />

          <div className='overlay-container'>
            <IconButton onClick={() => history.push("/Movies/" + _id)}><PlayCircleOutlineTwoToneIcon className='play-button' color='primary' /></IconButton>
          </div>

        </div>);
      })}
    </div> : ''}
  </div>);

}


export function Upcoming()
{
  let history=useHistory();
  const { newmovielist, setNewmovielist } = useContext(context);
  let Displaymovies = () => {
    axios(
      {
        url: `${movie_URL}/getmovies`,
        method: 'GET'
      }).then(response => setNewmovielist(response.data)).catch();
  };
  useEffect(Displaymovies, [setNewmovielist]);
  return (<div>
    {(newmovielist.length) ? <div className="movie-main">
      {newmovielist.filter(({type})=>type==="upcoming").map(({ name, poster, _id }, index) => {
        return (<div key={index} className="movie-content">
          <img src={poster} alt={name} title={name} />

          <div className='overlay-container'>
            <IconButton onClick={() => history.push("/Movies/" + _id)}><PlayCircleOutlineTwoToneIcon className='play-button' color='primary' /></IconButton>
          </div>

        </div>);
      })}
    </div> : ''}
  </div>);

}

export function IndividualMoviedata() 
{
  let [Movie, setMovie] = useState({});
  const Email=localStorage.getItem('Email')
  const Token=localStorage.getItem('token')
  const user=localStorage.getItem('user');
  let history=useHistory();
  let { i } = useParams();
  const {  setNewmovielist } = useContext(context);

  const [Message, setMessage] = useState('');
  const [watchlist, setWatchlist] = useState('');
  const [removeWatchlist,setRemoveWatchlist]=useState(false)

  // Snack Bar Open/Close Status
  const [open, setOpen] = useState(false);
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  // Snack Bar Open/Close function
  const handleClick = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  let Displaymovies = () => {
    axios(
      {
        url: `${movie_URL}/getmovies`,
        method: 'GET'
      }).then(response => setNewmovielist(response.data)).catch();
  };
  useEffect(Displaymovies, [setNewmovielist]);

  
  useEffect(() => {

    if(Email && Token)
    {
    axios(
      {
        url: `${movie_URL}/getwatchlist`,
        method: 'POST',
        data: { Email },
        headers: { 'x-auth-token': Token }
      }).then(response => response.data).then(({ WatchList }) => { setWatchlist(WatchList); }).catch();
    }
  
  }, [setWatchlist,Email,Token]);

  useEffect(()=>{

    if(watchlist.length && Array.isArray(watchlist))
    {
      let filterData=watchlist.filter(a=>a._id===i)
        setRemoveWatchlist((filterData.length)?true:false)
    }
  },[watchlist,setRemoveWatchlist,i])
 

  useEffect(() => {
    axios(
      {
        url: `${movie_URL}/getmoviebyid`,
        method: 'POST',
        data: { id: i }
      }).then(response => setMovie(response.data));
  }, [i,setMovie]);



  let { name, summary, src, poster, rating,language,country,genre,cast,Released, } = Movie;

  const addtoWatchlist = () => {
    axios(
      {
        url: `${movie_URL}/addwatchlist`,
        method: 'POST',
        data: { Email, id: i },
        headers: { 'x-auth-token': Token }
      }).then(response => response.data).then(data => { setMessage({ msg: data.Message, result: 'success' }); setRemoveWatchlist(true)})
      .catch((error) => setMessage({ msg: error.response.data.Message, result: 'warning' }))
      .then(handleClick);
  };

  const Remove=()=>{
    axios(
      {
        url: `${movie_URL}/removewatchlist`,
        method: 'DELETE',
        data: { Email, id: i },
        headers: { 'x-auth-token': Token }
      }).then(response => response.data).then(data => { setMessage({ msg: data.Message, result: 'success' }); setRemoveWatchlist(false)})
      .catch((error) => setMessage({ msg: error.response.data.Message, result: 'warning' }))
      .then(handleClick);
  }

  const DelMovie=()=>{
      axios(
        {
          url:`${movie_URL}/deletemovie`,
          method:'DELETE',
          data:{Email,id:i},
          headers: { 'x-auth-token': Token }
        }).then(response => response.data).then(data => { setMessage({ msg: data.Message, result: 'success' });history.push('/')})
        .catch((error) => setMessage({ msg: error.response.data.Message, result:'warning' }))
        .then(handleClick);
  }

  const checkUser=()=>{
      if(Email && Token)
      {
        addtoWatchlist()
      }
      else
      {
        setMessage({ msg:'Login To continue', result: 'warning' });
        handleClick();
        
        setTimeout(() => history.push('/Auth'), 2000);
      }
  }


  return (<div className="ind-movie-data">

    <Video src={src} />
    <br />
    <div className="movie-details">

      <div className="watchlist-btn-container">
        <p className='movie-heading'>{name}</p>

        {(!removeWatchlist)?<Button color='warning' onClick={() =>checkUser()} variant="outlined">Add to watchlist</Button>:
        <Button color='error' variant='outlined' onClick={()=>Remove()}>Remove WatchList</Button>}

        {(user==='admin')?<div>
        <Tooltip title='Edit'>
        <IconButton color='success' onClick={()=>history.push(`/Movies/Edit/${i}` )}  variant="outlined"><EditIcon/></IconButton>
        </Tooltip>

        <Tooltip title='Delete'>
        <IconButton color='error' onClick={()=>DelMovie()}  variant="outlined"> <DeleteIcon/></IconButton>
        </Tooltip>
        </div>:''}

      </div>

      {/* startIcon={<SaveIcon />} */}
      <div className='more-info-container'>
        <img src={poster} alt='poster' title={name} />

        <div className='more-info'>
          <div><label>Cast : </label> <p>{cast}</p></div>
          <div><label>Country : </label><p>{country}</p></div>
          <div><label>Genre : </label><p>{genre}</p></div>
          <div><label>Released : </label><p>{Released}</p></div>
          <div><label>Language : </label><p>{language}</p></div>

          <Rating name="half-rating-read"  id='detail' value={+rating} precision={0.5} readOnly /><br />
          <div className='summary'>
          <div><label>Summary</label><br/><p>{summary}</p></div>
          </div>
        </div>

      </div>




    </div>
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity={Message.result} sx={{ width: '100%' }}>
          {Message.msg}
        </Alert>
      </Snackbar>
    </Stack>
  </div>);
}
function Video({ src }) {
  return <div className='youtube-video'>
    <iframe width="1200" id='video' height="520" src={src} title="YouTube video player"
      frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
      picture-in-picture" allowFullScreen></iframe>
  </div>;
}




export function WatchList() {
  let history = useHistory();
  const { Email, Token } = useContext(context);
  const [watchlist, setWatchlist] = useState('');
  useEffect(() => {
    axios(
      {
        url: `${movie_URL}/getwatchlist`,
        method: 'POST',
        data: { Email },
        headers: { 'x-auth-token': Token }
      }).then(response => response.data).then(({ WatchList }) => { setWatchlist(WatchList); }).catch();
  }, [Email,Token]);

  return (
    <div>
      {(!watchlist) ? <p>WatchList Empty</p> : ''}
      {(watchlist.length) ? <div className="movie-main">
        {watchlist.map(({ name, poster, _id }, index) => {
          return (<div key={_id} className="movie-content">
            <img src={poster} alt={name} title={name} />

            <div className='overlay-container'>
              <IconButton onClick={() => history.push("/Movies/" + _id)}><PlayCircleOutlineTwoToneIcon className='play-button' color='primary' /></IconButton>
            </div>

          </div>);
        })}
      </div> : ''}

    </div>);
}

export function EditMoviedata() {
  let [newmovielist, setNewmovielist] = useState(null);
  let { i } = useParams();

  useEffect(()=>{
    axios(
      {
        url:`${movie_URL}/getmoviebyid`,
        method:'POST',
        data:{id:i}
      }).then(response=>response.data).then(data=>setNewmovielist(data))
  },[i])

  return newmovielist === null ? "...Loading" : <Update newmovielist={newmovielist} />;

}


function Update({ newmovielist })
{
  let history = useHistory();
  const Email=localStorage.getItem('Email')
  const Token=localStorage.getItem('token')
  let { name, poster, rating, summary, src, _id } = newmovielist;

  const [Message,setMessage]=useState('')
  const [progress, setProgress] = useState(0); // Progress Bar
  // Snack Bar Open/Close Status
  const [open, setOpen] = useState(false);
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  // Snack Bar Open/Close function
  const handleClick = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };
  let validation = (values) => {
    

    let error = {};
    console.log(error);
    if (values.name === "") {
      error.name = "Field Should not be empty";
      
    }
    if (values.poster === "") {
      error.poster = "Field Should not be empty";
      
    }
    if (values.rating === "") {
      error.rating = "Field Should not be empty";
      
    }
    if (values.summary === "") {
      error.summary = "Field Should not be empty";
      
    }
    if (values.src === "") {
      error.src = "Field Should not be empty";
      
    }

    return error;

  };

  let { handleChange, handleBlur, handleSubmit, values, touched, errors } = useFormik(
    {
      initialValues: { name: name, poster: poster, rating: rating, summary: summary, src: src },
      validate: validation,
      onSubmit: (movie) => { updatemovie({...movie,_id});}
    }
  );

    let updatemovie=(movie)=>{
      axios(
        {
          url:`${movie_URL}/editmovie`,
          method:'PUT',
          data:{Email,movie},
          headers:{'x-auth-token':Token}
        }).then(response => response.data).then(data => { setMessage({ msg: data.Message, result: 'success' }); setTimeout(() => history.push('/'), 2000); })
        .catch((error) => { setMessage({ msg: error.response.data.Message, result: 'warning' }); setProgress(0); }).then(handleClick);
    }

  return (<div className="content">
    <form className="field" onSubmit={handleSubmit}>

      {(progress === 1) && <CircularProgress id='updatemovieprogress' color='primary'></CircularProgress>}

      <TextField fullWidth className='add-text-field-container' value={values.name} onChange={handleChange} onBlur={handleBlur} error={errors.name && touched.name} helperText={errors.name && touched.name && errors.name} label="Name" id="Name" name="name" variant="outlined" />
      <TextField fullWidth  className='add-text-field-container' value={values.poster} onChange={handleChange} onBlur={handleBlur} error={errors.poster && touched.poster} helperText={errors.poster && touched.poster && errors.poster} label="Poster" id="Poster" name="poster" variant="outlined" />
      <TextField fullWidth className='add-text-field-container' value={values.rating} onChange={handleChange} onBlur={handleBlur} error={errors.rating && touched.rating} helperText={errors.rating && touched.rating && errors.rating} label="Rating" id="Rating" name="rating" variant="outlined" />
      <TextField fullWidth className='add-text-field-container' value={values.summary} onChange={handleChange} onBlur={handleBlur} error={errors.summary && touched.summary} helperText={errors.summary && touched.summary && errors.summary} label="Summary" id="Summary" name="summary" variant="outlined" />
      <TextField fullWidth  className='add-text-field-container'value={values.src} onChange={handleChange} onBlur={handleBlur} error={errors.src && touched.src} helperText={errors.src && touched.src && errors.src} label="Trailer" id="src" name="src" variant="outlined" />
      <br/>
      <Button type="submit" variant="contained">Save</Button>
    </form>

    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity={Message.result} sx={{ width: '100%' }}>
          {Message.msg}
        </Alert>
      </Snackbar>
    </Stack>

  </div>
  );

}
