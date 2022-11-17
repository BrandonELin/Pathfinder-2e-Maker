import { useParams } from "react-router-dom";
import { useEffect } from "react"
import Card from 'react-bootstrap/Card';

export default function Classes({ classes, getClasses }){
    let params = useParams();

    useEffect(() => {getClasses()},[])

    return (
        <>
            <h1 style={{margin: '30px'}}><b>Classes</b></h1>
            <div className="classes">
                {classes.map((item) => {
                    return(
                        <div key={item._id}>
                            <Card style={{ width: '30vw' }} className='class bg-secondary text-white'>
                                <Card.Header className="header">{item.name}</Card.Header>
                                <Card.Text className='black'>
                                    {item.data.description.value.toUpperCase().split('KEY ABILITY',1).map((word) => {
                                        word = word.split('<P>').join('')
                                        word = word.split('<EM>').join('')
                                        word = word.split('</EM>').join('')
                                        word = word.split('</P>').join('')
                                        word = word.replace('<STRONG>', '')
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
