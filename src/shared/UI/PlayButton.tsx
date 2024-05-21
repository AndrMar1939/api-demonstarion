import { FC, ComponentProps } from 'react';

interface PlayButtonProps extends ComponentProps<'button'> {

}

export const PlayButton: FC<PlayButtonProps> = (props) => {
  return (
    <button
      {...props}
      className='mt-3 p-2 rounded-full border-[1px] border-solid border-green flex justify-center items-center hover:bg-green-400 active:bg-green-500 uppercase bg-green-300'
    >
      play
  </button>
  )
}
