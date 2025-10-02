import React from 'react'

export default function Modal({children, onClose}) {
  return (
    <>
        <div className='backdrop'onClick={onClose}></div>
            <dialog className='modal' open>
                {children}
            </dialog>
        
    </>
  )
}
// this below code is working
// import React from 'react' 

// export default function Modal({ children, onClose }) {
//   return (
//     <>
//       <div className='backdrop' onClick={onClose}>
//         <div 
//           className='modal' 
//           onClick={(e) => e.stopPropagation()}   //  stops backdrop click
//         >
//           {children}
//         </div>
//       </div>
//     </>
//   )
// }
