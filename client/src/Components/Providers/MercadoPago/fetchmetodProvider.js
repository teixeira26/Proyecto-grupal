export const fetchCTokenProvider = async (endpoint, data ) =>{
    const url=`https://proyecto-grupal.herokuapp.com/${endpoint}`;
    const token = localStorage.getItem('token') || '';
    // console.log('token', token)
    // console.log('endpoint',endpoint)
    // console.log('soy la data', data)


        const resp = await fetch(url, {
            method: 'POST',
            headers:{
                'Content-type': 'application/json',
                'x-token': token,
            },
            body: JSON.stringify(data)
        })

        // console.log('resp',resp)
        return await resp.json()
}