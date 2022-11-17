import { useParams } from "react-router-dom";
import { useEffect } from "react"
import Card from 'react-bootstrap/Card';

export default function Classes({ list, getClasses }){
    let params = useParams();

    useEffect(() => {getClasses('class')},[])

    return (
        <div className="classes">
            {list.map((item) => {
                return(
                    <div key={item._id}>
                        <Card style={{ width: '30vw' }} className='class'>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>
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
    )
}
