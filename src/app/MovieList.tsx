import { Movie } from '@/lib/types'
import Image from 'next/image'

type MovieListProps = {
  movies: Movie[]
}

export default function MovieList({ movies }: MovieListProps) {
  return (
    <div className='grid w-max grid-flow-col grid-rows-2 gap-4 overflow-x-auto px-8'>
      {movies.map((movie) => (
        <Image
          className='flex items-center justify-center'
          style={{ maxWidth: '150px' }}
          key={movie.id}
          src={movie.image_url}
          alt={movie.title}
          width={200}
          height={300}
        />
      ))}
    </div>
  )
}
