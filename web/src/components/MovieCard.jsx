export default function MovieCard({ movie }){
    return(
        <article>
            <h2>{ movie.title }</h2>
            <p>{ movie.director }</p>
            <p>{ movie.release_year }</p>
            <p>{ movie.rating }/10</p>
        </article>
    );
}