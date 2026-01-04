import { Avatar, Button, Popover, PopoverContent, PopoverTrigger, User } from '@heroui/react'
import { ChevronDown } from 'lucide-react'

export default function HeaderAdmin() {
  return (
    <section className='mx-auto flex h-16 items-center justify-between bg-primary px-4'>
      <Button
        radius='sm'
        className='flex h-12 items-center bg-transparent'
        startContent={
          <Avatar
            className='bg-transparent'
            size='lg'
            src='/assets/images/logo_truc_xinh.png'
            alt='Logo'
          />
        }
      >
        Trúc Xinh
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
