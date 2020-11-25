const test = "paper"
 const test1 = test.split(' ');
 test1.push('book')
 const test2 = test1.join(' ')




console.log(test2)
//console.log(b)


 // useEffect(() => {
    //     // if(!userData.user) {
    //     //     console.log(userData.user, '*********uuuu*******')
    //     //     history.push('/login')
    //     // }
    //     //console.log(userData, '------from useeffect....')
    //     const token = localStorage.getItem('token');
    //     if(!token){
    //        return history.push('/login')
    //     }
    //     const checkIfLoggedIn = async () => {
    //         try {
    //             const getUser = await axios.post(`${serverProxy}/auth/getuser`, null, {
    //                 headers: {
    //                     'authorization': 'Bearer ' + token
    //                 }
    //             });

    //             if(!getUser.data.success){
    //                return history.push('/login')
    //             }
    //             console.log(userData.user, '>>>>>>>')
    //         } catch (error) {
    //             history.push('/login')
    //             console.log(error)
    //         }
    //     }
    //     checkIfLoggedIn()
    // });