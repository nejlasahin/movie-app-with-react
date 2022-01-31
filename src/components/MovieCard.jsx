import * as React from "react";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { red } from '@mui/material/colors';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorites, deleteFavorites } from '../reducers/favorites';
import { addSeenlist, deleteSeenlist } from '../reducers/seenlist';
import { Link } from 'react-router-dom';

const MovieCard = ({ poster_path, title, release_date, id, genre }) => {

  const favorites = useSelector((state) => state.favorites);
  const seenlist = useSelector((state) => state.seenlist);
  const dispatch = useDispatch();

  return (
    <Card sx={{
      width: {
        md: 250
      },
      margin: 3,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}>
      <Link to={`/detail/${id}`}>
        <CardMedia
          component="img"
          image={poster_path}
          alt={title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {release_date}
          </Typography>
        </CardContent>
      </Link>
      <CardActions sx={{ justifyContent: "space-around" }} disableSpacing>

        {
          favorites.favoriteFilms.some(film => film.id === id) ?
            <IconButton aria-label="share" onClick={() => dispatch(deleteFavorites(id))}>
              <FavoriteIcon sx={{ color: red[600] }} />
            </IconButton>
            :
            <IconButton aria-label="share" onClick={() => dispatch(addFavorites(id, title, genre, release_date))}>
              <FavoriteIcon />
            </IconButton>
        }
        {
          seenlist.seenFilms.some(film => film.id === id) ?
            <IconButton aria-label="share" onClick={() => dispatch(deleteSeenlist(id))}>
              <BookmarkIcon sx={{ color: red[600] }} />
            </IconButton>
            :
            <IconButton aria-label="share" onClick={() => dispatch(addSeenlist(id, title, genre, release_date))}>
              <BookmarkIcon />
            </IconButton>
        }

      </CardActions>
    </Card>
  );
};

export default MovieCard;
