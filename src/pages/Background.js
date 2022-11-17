import { useParams } from "react-router-dom";
import { useEffect } from "react"
import Card from 'react-bootstrap/Card';

export default function Background({ background, getBackground }){
    let params = useParams();

    useEffect(() => {getBackground()},[])

    return (
        <>
            <h1 style={{margin: '30px'}}><b>Backgrounds</b></h1>
            <div className="classes">
            {background.map((item) => {
                return(
                    <div key={item._id}>
                        <Card style={{ width: '30vw' }} className='class bg-secondary text-white'>
                            <Card.Header className="header">{item.name}</Card.Header>
                            <Card.Text className='black'>
                                {item.data.description.value.toUpperCase().split('CHOOSE',1).map((word) => {
                                    word = word.split('<P>').join('')
                                    word = word.split('</P>').join('')
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
