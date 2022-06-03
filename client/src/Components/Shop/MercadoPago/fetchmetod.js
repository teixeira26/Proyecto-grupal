export const fetchCToken = async (endpoint, data, /* method = "GET", limit = 10 */) =>{
    const url=`http://localhost:3001/products/checkout`;
    const token = localStorage.getItem('token') || '';
    console.log('token', token)
    console.log('endpoint',endpoint)
    console.log('soy la data', data)


    // if(method === 'GET'){
    //     const resp = await fetch(url, {
    //         headers:{
    //             'x-token': token,
    //             'limit': limit
    //         }
    //     });
    //     console.log(resp)
    //     return await resp.json()

    // }else{
        const resp = await fetch(url, {
            method: 'POST',
            headers:{
                'Content-type': 'application/json',
                'x-token': token,
                // 'limit': limit
            },
            body: JSON.stringify(data)
        })
        console.log('resp',resp)
        return await resp.json()
    // }
}