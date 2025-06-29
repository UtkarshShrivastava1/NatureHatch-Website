import React from 'react'
import { assets } from '../assets/admin_assets/assets.js'
import { LogOut } from 'lucide-react'

const Navabr = ({setToken}) => {
  
  
  return (
    <div className='flex items-center  py-2 px-[4%] justify-between '>
      <img src={assets.logo} alt='' className='w-[max(10%,80px)] '/>
      <button className=' items-center flex bg-green-600 text-white gap-1 px-6 py-4 sm:px-7 s,:py-2 rounded-xl text-xs sm:text-sm' onClick={()=>setToken('')} > <LogOut size={20} /> Logout</button>

      
          
    </div>
  )
}

export default Navabr
