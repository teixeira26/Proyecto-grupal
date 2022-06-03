import React from "react";

export default function DetailProviderCard({name, profilePicture}) {
    
    return(
        <>
            <section>
                <img src={profilePicture} alt="" />
                <div>
                    <div>
                        <h1>{name}</h1>
                        <span>Rating</span>
                    </div>
                    <h3>Role</h3>
                    <h4>Location - #Works</h4>
                </div>
                <div>
                    <h2>Sobre Name</h2>
                    <p>Descripcion</p>
                    <button>Contactarme con Name</button>
                </div>
                <div>
                    <h2>Comentarios recibidos por Name</h2>
                    <div>
                        <img src="" alt="ratePhoto" />
                        <div>
                            <h3>Name</h3>
                            <span>Rate</span>
                            <p>Comments</p>
                        </div>
                    </div>
                    <div>
                        <img src="" alt="ratePhoto" />
                        <div>
                            <h3>Name</h3>
                            <span>Rate</span>
                            <p>Comments</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}