import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { XCircleIcon as XCircleIconSolid } from '@heroicons/react/24/solid'
import { XCircleIcon as XCircleIconOutline } from '@heroicons/react/24/outline'
const CloseIcon = (
    {
        className,
        onClick,
    }
) => {
    const [hovered,setHovered] = useState(false);
    return (
        <div 
            id='123'
            className='w-[24px] h-[24px]'
            onMouseOver={()=>{setHovered(true)}}
            onMouseLeave={()=>{setHovered(false)}}    
        >  
          <div>
            {hovered ?
            <XCircleIconSolid className={className} onClick={onClick}/>: <XCircleIconOutline className={className} onClick={onClick}/> 
            }
          </div>
        </div>
    )
    
}
export default CloseIcon