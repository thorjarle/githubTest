import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const ShowGifts = (props) => {
    const [gifts, setGifts] = useState({});
    const {apiCall} = useContext(AuthContext);
    const { selectedValue } = props;
    
    const getGifts = async () => {
        const object = {}
        const response = await apiCall({
            action: 'getGifts',
            ...object
        });
        const data = await response.data;
        return data;
    }

    useEffect(() => {
        getGifts()
            .then(data => data.data)
            .then(data => setGifts(data));
    }, []);

    return (
        <>
            <div>
                {selectedValue &&
                    <div className="showgift-wrapper pb-3">
                        <div className="row">
                            <div className="col pb-2">
                                <h5>Se hva andre har fått til</h5>
                            </div>
                        </div>
                        <div className="row">
                        {
                            Object.keys(gifts).length !== 0 && gifts && gifts.map((item) => {
                                return <ShowGiftItem item={item} key={item.id} />
                            })
                        }
                        </div>
                    </div>
                }    
            </div>
        </>
    );
}
 
export default ShowGifts;

const ShowGiftItem = (props) => {
    const { image, introtext, link, title} = props.item;
    return (
        <>
            <div className="col-xl-4">
                <div className="">
                    <a href={link} className="position-relative kvadrat-bubble d-block" target="_blank">
                        <figure className="m-0 p-0 overlay-hover w-100">
                            <img src={image} className="card-img-top img-responsive mb-0 p-0" alt={title} />
                        </figure>
                        <div className="kvadrat-body">
                            <h6 className="">{title}</h6>
                            <p className="">{introtext}</p>
                        
                        </div>
                    </a>
                        
                    
                </div>
            </div>
        </>
    );
}