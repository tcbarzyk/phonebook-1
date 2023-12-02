const Notification = ({notification}) => {
    if (notification === null) {
        return null
    }

    if (notification.isError) {
        return (
            <div className='error'>
                {notification.message}
            </div>
        )
    }
    else {
        return (
            <div className='notification'>
                {notification.message}
            </div>
        )
    }
}

export default Notification