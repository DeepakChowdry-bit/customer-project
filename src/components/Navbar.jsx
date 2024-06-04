import React from 'react'
import { Button } from './ui/button'
import { ModeToggle } from './Theme'

const Navbar = () => {
    return (
        <div className='flex items-center justify-center h-[72px] shadow bg-background fixed w-full'>
            <div className='flex items-center justify-center w-11/12 h-full'>
                <div className="flex items-center justify-between w-full h-full">
                    <span className="">Mahadev</span>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center gap-5">
                        <ModeToggle />
                        <Button variant='outline' size=''>Login</Button>

                    </nav>
                </div>

            </div>
        </div>
    )
}

export default Navbar