import dynamic from 'next/dynamic'
import React from 'react' 
const NoSSRWrapper = props => ( 
    <React.Fragment>{props.children}</React.Fragment> 
) 

// Wrapping a page or component with this Component will disbale SSR 
export default dynamic(() => Promise.resolve(NoSSRWrapper), { 
    ssr: false 
})
