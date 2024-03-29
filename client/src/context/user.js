import React, { useEffect, useState } from 'react'

const UserContext = React.createContext()

function UserProvider({ children }) {

    const [user, setUser] = useState('')
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('/auth')
        .then(r => {
            if (r.ok) {
                return r.json().then(user => {
                    setUser(user)
                    setIsAuth(true)
                    setIsLoading(false)
                })
            } else {
                return r.json().then(error => {
                    console.log(error)
                    setIsLoading(false)
                })
            }
        })
    }, [])

    // function getUser() {
    //     return fetch('/auth')
    //         .then(r => {
    //             if (r.ok) {
    //                 r.json().then(user => {
    //                     setUser(user)
    //                     setIsAuth(true)
    //                 })
    //             } else {
    //                 r.json().then(error => console.log(error))
    //             }
    //         })
    // }

    return (
        <UserContext.Provider value={{ user, setUser, isAuth, setIsAuth, isLoading }}>{children}</UserContext.Provider>
    )
}

export { UserContext, UserProvider }