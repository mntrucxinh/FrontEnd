import Image from 'next/image'
import { Avatar, Button, Popover, PopoverContent, PopoverTrigger, User } from '@heroui/react'
import { ChevronDown } from 'lucide-react'

export default function HeaderAdmin() {
  return (
    <section className='bg-content2 mx-auto flex h-12 w-screen items-center justify-between px-2'>
      <Button radius='sm' className='flex items-center bg-transparent'>
        <Image
          width={50}
          height={50}
          className='p-0'
          src='/assets/images/logo_truc_xinh.png'
          alt='Logo'
        />
        <p className='text-content1 text-xl font-semibold'>Quản Lý</p>
      </Button>
      <Popover showArrow placement='bottom-end'>
        <PopoverTrigger>
          <Button
            as='button'
            className='flex h-12 items-center justify-center bg-transparent'
            endContent={<ChevronDown size={16} />}
          >
            <User
              avatarProps={{ src: 'https://i.pravatar.cc/150?u=a04258114e29026702d' }}
              description='Product Designer'
              name='Admin'
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Button>Profile</Button>
          <Button>Logout</Button>
        </PopoverContent>
      </Popover>
    </section>
  )
}
