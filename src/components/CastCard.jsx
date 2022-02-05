import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function CastCard({img, name, character}) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt={name}
                image={img}
            />
            <CardContent>
                <Typography gutterBottom variant="p" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {character}
                </Typography>
            </CardContent>
        </Card>
    );
}
export default CastCard;