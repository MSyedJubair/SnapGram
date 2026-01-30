import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignoutAccount } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react'
import { useUserContext } from '@/context/AuthContext'

const TopBar = () => {
  const navigate = useNavigate()

  const { mutateAsync: signOut, isSuccess } = useSignoutAccount()
  const { user } = useUserContext()

  useEffect(() => { if (isSuccess) navigate(0)}, [isSuccess])

  return (
    <section className='sticky top-0 z-50 md:hidden bg-dark-2 w-full'>
      <div className='flex justify-between items-center py-4 px-5'>
        <Link to={'/'} className='flex gap-3 items-center'>
          <img src="./assets/images/logo.svg" alt="Logo" width={130} height={325}/>
        </Link>

        <div className="flex gap-4">
          <Button variant={'ghost'} >
            <img src="./assets/icons/logout.svg" alt="Logout" width={24} onClick={() => { signOut() }}/>
          </Button>

          <Link to={`/profile${user.id}`} className='flex flex-center gap-3'>
            <img src={user.imageUrl || './assets/icons/profile-placeholder.svg'} alt="Profile-Photo" className='h-8 w-8 rounded-full'/>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TopBar