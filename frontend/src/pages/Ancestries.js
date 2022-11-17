import { useParams } from "react-router-dom";
import { useEffect } from "react"
import Card from 'react-bootstrap/Card';

export default function Ancestries({ ancestries, getAncestries }){
    let params = useParams();

    useEffect(() => {getAncestries()},[])

    return (
        <>
            <h1 style={{margin: '30px'}}><b>Ancestries</b></h1>
            <div className="classes">
                {ancestries.map((item) => {
                    return(
                        <div key={item._id}>
                            <Card style={{ width: '30vw' }} className='class bg-secondary text-white'>
                                <Card.Header className="header">{item.name}</Card.Header>
                                <Card.Text className='black'>
                                    {item.data.description.value.toUpperCase().split('</P>',1).map((word) => {
                                        word = word.split('<P>').join('')
                                        word = word.split('<EM>').join('')
                                        word = word.split('</EM>').join('')
                                        console.log(word)
                                        return(
                                            word
                                        )
                                    })}
                                </Card.Text>
                            </Card>
                        </div>
                        
                        
                    )
                })}
            </div>
        </>
        
    )
}
