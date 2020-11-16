import React from 'react'

const Message = ({className, message}) => {
    return (
        <div className={className}>
            {message}
        </div>
    )
}

export default Message
